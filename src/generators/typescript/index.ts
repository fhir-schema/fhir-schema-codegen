import path from 'node:path';

import { Generator, type GeneratorOptions } from '../generator';
import { type ClassField, type NestedTypeSchema, TypeSchema } from '../../typeschema';
import { groupedByPackage, kebabCase, pascalCase, canonicalToName } from '../../utils/code';

// Naming conventions
// directory naming: kebab-case
// file naming: PascalCase for only-class files, kebab-case for other files
// function naming: camelCase
// class naming: PascalCase

interface TypeScriptGeneratorOptions extends GeneratorOptions {
    // tabSize: 2
    typesOnly?: boolean;
}

const typeMap = {
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
    return n.replace(/-/g, '_');
};

class TypeScriptGenerator extends Generator {
    constructor(opts: TypeScriptGeneratorOptions) {
        super({
            ...opts,
            typeMap,
            keywords,
            staticDir: path.resolve(__dirname, 'static'),
        });
    }

    tsImportFrom(tsPackage: string, ...entities: string[]) {
        this.lineSM(`import { ${entities.join(', ')} } from '${tsPackage}'`);
    }

    generateDependenciesImports(schema: TypeSchema) {
        if (schema.dependencies) {
            const deps = schema.dependencies
                .filter((dep) => ['complex-type', 'resource', 'logical'].includes(dep.kind))
                .sort((a, b) => a.name.localeCompare(b.name));

            for (const dep of deps) {
                this.tsImportFrom(`./${pascalCase(dep.name)}`, this.uppercaseFirstLetter(dep.name));
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
            this.lineSM(`_${fieldName}?: Element`);
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

        let parent = fmap(normalizeName)(canonicalToName(schema.base?.url));
        const extendsClause = parent && `extends ${parent}`;

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
                    type = typeMap[field.type.name as keyof typeof typeMap] ?? 'string';
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

    generateResourceModule(schema: TypeSchema) {
        this.file(`${pascalCase(schema.identifier.name)}.ts`, () => {
            this.generateDisclaimer();

            this.generateDependenciesImports(schema);
            this.line();

            this.generateNestedTypes(schema);
            this.generateType(schema);
        });
    }

    generateIndexFile(schemas: TypeSchema[]) {
        this.file('index.ts', () => {
            const names = schemas.map((schema) => schema.identifier.name);

            for (const name of names) {
                this.tsImportFrom('./' + pascalCase(name), name);
            }
            this.lineSM(`export { ${names.join(', ')} }`);

            this.line('');

            this.curlyBlock(['export type ResourceTypeMap = '], () => {
                this.lineSM('User: Record<string, any>');
                names.forEach((name) => this.lineSM(`${name}: ${name}`));
            });
            this.lineSM('export type ResourceType = keyof ResourceTypeMap');

            this.squareBlock(['export const resourceList: readonly ResourceType[] = '], () => {
                names.forEach((n) => this.line(`'${n}', `));
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
