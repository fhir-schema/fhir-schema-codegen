import path from 'node:path';

import { Generator, type GeneratorOptions } from '../generator';
import { type ClassField, type NestedTypeSchema, TypeSchema, type TypeRef } from '../../typeschema';
import { groupedByPackage, kebabCase, pascalCase, canonicalToName } from '../../utils/code';
import { assert } from 'node:console';
import * as profile from '../../profile';

// Naming conventions
// directory naming: kebab-case
// file naming: PascalCase for only-class files, kebab-case for other files
// function naming: camelCase
// class naming: PascalCase

interface TypeScriptGeneratorOptions extends GeneratorOptions {
    // tabSize: 2
    typesOnly?: boolean;
}

const primitiveType2tsType = {
    boolean: 'boolean',
    instant: 'string',
    time: 'string',
    date: 'string',
    dateTime: 'string',

    decimal: 'number',
    integer: 'number',
    unsignedInt: 'number',
    positiveInt: 'number',
    integer64: 'number',
    base64Binary: 'string',

    uri: 'string',
    url: 'string',
    canonical: 'string',
    oid: 'string',
    uuid: 'string',

    string: 'string',
    code: 'string',
    markdown: 'string',
    id: 'string',
    xhtml: 'string',
};

// prettier-ignore
const keywords = new Set([
    'abstract',
    'any',
    'as',
    'async',
    'await',
    'boolean',
    'bigint',
    'break',
    'case',
    'catch',
    'class',
    'const',
    'constructor',
    'continue',
    'debugger',
    'declare',
    'default',
    'delete',
    'do',
    'else',
    'enum',
    'export',
    'extends',
    'extern',
    'false',
    'finally',
    'for',
    'function',
    'from',
    'get',
    'goto',
    'if',
    'implements',
    'import',
    'in',
    'infer',
    'instanceof',
    'interface',
    'keyof',
    'let',
    'module',
    'namespace',
    'never',
    'new',
    'null',
    'number',
    'object',
    'of',
    'override',
    'private',
    'protected',
    'public',
    'readonly',
    'return',
    'satisfies',
    'set',
    'static',
    'string',
    'super',
    'switch',
    'this',
    'throw',
    'true',
    'try',
    'type',
    'typeof',
    'unknown',
    'var',
    'void',
    'while',
]);

const fmap =
    <T>(f: (x: T) => T) =>
    (x: T | undefined): T | undefined => {
        return x === undefined ? undefined : f(x);
    };

const normalizeName = (n: string): string => {
    if (n === 'extends') {
        return 'extends_';
    }
    return n.replace(/[- ]/g, '_');
};

const resourceName = (id: TypeRef): string => {
    if (id.kind === 'constraint') return pascalCase(canonicalToName(id.url) ?? '');
    return normalizeName(id.name);
};

const fileNameStem = (id: TypeRef): string => {
    if (id.kind === 'constraint') return `${pascalCase(canonicalToName(id.url) ?? '')}_profile`;
    return pascalCase(id.name);
};

const fileName = (id: TypeRef): string => {
    return `${fileNameStem(id)}.ts`;
};

class TypeScriptGenerator extends Generator {
    constructor(opts: TypeScriptGeneratorOptions) {
        super({
            ...opts,
            typeMap: primitiveType2tsType,
            keywords,
            staticDir: path.resolve(__dirname, 'static'),
        });
    }

    tsImportFrom(tsPackage: string, ...entities: string[]) {
        this.lineSM(`import { ${entities.join(', ')} } from '${tsPackage}'`);
    }

    generateDependenciesImports(schema: TypeSchema) {
        if (schema.dependencies) {
            const deps = [
                ...schema.dependencies
                    .filter((dep) => ['complex-type', 'resource', 'logical'].includes(dep.kind))
                    .map((dep) => ({
                        tsPackage: `../${kebabCase(dep.package)}/${pascalCase(dep.name)}`,
                        name: this.uppercaseFirstLetter(dep.name),
                    })),
                ...schema.dependencies
                    .filter((dep) => ['nested'].includes(dep.kind))
                    .map((dep) => ({
                        tsPackage: `../${kebabCase(dep.package)}/${pascalCase(canonicalToName(dep.url) ?? '')}`,
                        name: this.deriveNestedSchemaName(dep.url, true),
                    })),
            ].sort((a, b) => a.name.localeCompare(b.name));
            for (const dep of deps) {
                this.tsImportFrom(dep.tsPackage, dep.name);
            }

            // NOTE: for primitive type extensions
            const element = this.loader.complexTypes().find((e) => e.identifier.name === 'Element');
            if (
                element &&
                deps.find((e) => e.name === 'Element') === undefined &&
                // FIXME: don't import if fields and nested fields don't have primitive types
                schema.identifier.name !== 'Element'
            ) {
                this.tsImportFrom(`../${kebabCase(element.identifier.package)}/Element`, 'Element');
            }
        }
    }

    generateNestedTypes(schema: TypeSchema) {
        if (schema.nested) {
            this.line();
            for (const subtype of schema.nested) {
                this.generateType(subtype);
            }
        }
    }

    addFieldExtension(fieldName: string, field: ClassField): void {
        if (field.type.kind === 'primitive-type') {
            this.lineSM(`_${this.getFieldName(fieldName)}?: Element`);
        }
    }

    addResourceTypeField(schema: TypeSchema): void {
        this.lineSM(`resourceType: '${schema.identifier.name}'`);
    }

    generateType(schema: TypeSchema | NestedTypeSchema) {
        const name =
            schema.identifier.name === 'Reference'
                ? 'Reference<T extends string = string>'
                : schema instanceof TypeSchema
                  ? normalizeName(schema.identifier.name)
                  : // NestedTypeSchema
                    normalizeName(this.deriveNestedSchemaName(schema.identifier.url, true));

        const parent = fmap(normalizeName)(canonicalToName(schema.base?.url));
        const extendsClause = parent && `extends ${parent}`;

        this.debugComment(JSON.stringify(schema.identifier));
        this.curlyBlock(['export', 'interface', name, extendsClause], () => {
            if (!schema.fields) {
                return;
            }

            // we have to provide utility field name called resourceType
            if (schema.identifier.kind === 'resource') {
                // this.addResourceTypeField(schema);
            }

            const fields = Object.entries(schema.fields).sort((a, b) => a[0].localeCompare(b[0]));

            for (const [fieldName, field] of fields) {
                if ('choices' in field) continue;

                this.debugComment(`${fieldName} ${JSON.stringify(field)}`);

                const fieldNameFixed = this.getFieldName(fieldName);
                const optionalSymbol = field.required ? '' : '?';
                const arraySymbol = field.array ? '[]' : '';

                if (field.type === undefined) {
                    continue;
                }
                let type = field.type.name;

                if (field.type.kind === 'nested') {
                    type = this.deriveNestedSchemaName(field.type.url, true);
                }

                if (field.type.kind === 'primitive-type') {
                    type =
                        primitiveType2tsType[
                            field.type.name as keyof typeof primitiveType2tsType
                        ] ?? 'string';
                }

                if (schema.identifier.name === 'Reference' && fieldNameFixed === 'reference') {
                    type = '`${T}/${string}`';
                }

                if (field.reference?.length) {
                    const references = field.reference.map((ref) => `'${ref.name}'`).join(' | ');
                    type = `Reference<${references}>`;
                }

                if (field.enum) {
                    type = field.enum.map((e) => `'${e}'`).join(' | ');
                }

                this.lineSM(`${fieldNameFixed}${optionalSymbol}:`, `${type}${arraySymbol}`);

                if (['resource', 'complex-type'].includes(schema.identifier.kind)) {
                    this.addFieldExtension(fieldName, field);
                }
            }
        });

        this.line();
    }

    generateProfileType(schema: TypeSchema) {
        const name = resourceName(schema.identifier);
        this.debugComment(schema.identifier);
        this.curlyBlock(['export', 'interface', name], () => {
            this.lineSM(`profileType: '${schema.identifier.name}'`);
            this.line();

            for (const [fieldName, field] of Object.entries(schema.fields ?? {})) {
                this.debugComment(JSON.stringify(field, null, 2));

                if ('choices' in field) continue;

                const tsName = this.getFieldName(fieldName);
                let tsType: string;
                if (field.type.kind === 'nested') {
                    tsType = this.deriveNestedSchemaName(field.type.url, true);
                } else {
                    tsType = primitiveType2tsType[field.type.name] ?? field.type.name;
                }

                this.lineSM(
                    `${tsName}${!field.required ? '?' : ''}: ${tsType}${field.array ? '[]' : ''}`,
                );
            }
        });

        this.line();
    }

    generateProfile(schema: TypeSchema) {
        assert(schema.identifier.kind === 'constraint');
        const flatProfile = profile.flatProfile(this.loader, schema);
        this.generateDependenciesImports(flatProfile);
        this.line();
        this.generateProfileType(flatProfile);
    }

    generateResourceModule(schema: TypeSchema) {
        this.file(`${fileName(schema.identifier)}`, () => {
            this.generateDisclaimer();

            if (
                ['complex-type', 'resource', 'logical', 'nested'].includes(schema.identifier.kind)
            ) {
                this.generateDependenciesImports(schema);
                this.line();
                this.generateNestedTypes(schema);
                this.generateType(schema);
            } else if (schema.identifier.kind === 'constraint') {
                this.generateProfile(schema);
            } else {
                throw new Error(
                    `Profile generation not implemented for kind: ${schema.identifier.kind}`,
                );
            }
        });
    }

    generateIndexFile(schemas: TypeSchema[]) {
        this.file('index.ts', () => {
            let exports = schemas
                .map((schema) => ({
                    identifier: schema.identifier,
                    fileName: fileNameStem(schema.identifier),
                    name: resourceName(schema.identifier),
                }))
                .sort((a, b) => a.name.localeCompare(b.name));

            // FIXME: actually, duplication means internal error...
            exports = Array.from(
                new Map(exports.map((exp) => [exp.name.toLowerCase(), exp])).values(),
            ).sort((a, b) => a.name.localeCompare(b.name));

            for (const exp of exports) {
                this.debugComment(exp.identifier);
                this.tsImportFrom(`./${exp.fileName}`, exp.name);
            }
            this.lineSM(`export { ${exports.map((e) => e.name).join(', ')} }`);

            this.line('');

            this.curlyBlock(['export type ResourceTypeMap = '], () => {
                this.lineSM('User: Record<string, any>');
                exports.forEach((exp) => {
                    this.debugComment(exp.identifier);
                    this.lineSM(`${exp.name}: ${exp.name}`);
                });
            });
            this.lineSM('export type ResourceType = keyof ResourceTypeMap');

            this.squareBlock(['export const resourceList: readonly ResourceType[] = '], () => {
                exports.forEach((exp) => {
                    this.debugComment(exp.identifier);
                    this.line(`'${exp.name}', `);
                });
            });
        });
    }

    generate() {
        const typesOnly = (this.opts as TypeScriptGeneratorOptions).typesOnly || false;
        const typePath = typesOnly ? '' : 'types';

        const typesToGenerate = [
            ...this.loader.complexTypes(),
            ...this.loader.resources(),
            ...this.loader.logicalModels(),
            ...this.loader.profiles(),
        ].sort((a, b) => a.identifier.name.localeCompare(b.identifier.name));

        this.dir(typePath, async () => {
            const groupedComplexTypes = groupedByPackage(typesToGenerate);
            for (const [packageName, packageSchemas] of Object.entries(groupedComplexTypes)) {
                const packagePath = path.join(typePath, kebabCase(packageName));

                this.dir(packagePath, () => {
                    for (const schema of packageSchemas) {
                        this.generateResourceModule(schema);
                    }
                    this.generateIndexFile(packageSchemas);
                });
            }
        });
        if (!typesOnly) {
            this.copyStaticFiles();
        }
    }
}

export { TypeScriptGenerator };
export type { TypeScriptGeneratorOptions };

export function createGenerator(options: TypeScriptGeneratorOptions) {
    return new TypeScriptGenerator(options);
}
