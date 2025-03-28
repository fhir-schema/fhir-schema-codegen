import path from 'path';

import { Generator, GeneratorOptions } from '../../generator';
import { ClassField, INestedTypeSchema, TypeSchema } from '../../typeschema';
import { groupedByPackage, kebabCase, pascalCase, removeConstraints } from '../../utils';

// Naming conventions
// directory naming: kebab-case
// file naming: PascalCase for only-class files, kebab-case for other files
// function naming: camelCase
// class naming: PascalCase

interface TypeScriptGeneratorOptions extends GeneratorOptions {
    // tabSize: 2
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
    'abstract', 'any', 'as', 'async', 'await', 'boolean', 'bigint', 'break',
    'case', 'catch', 'class', 'const', 'constructor', 'continue', 'debugger',
    'declare', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends',
    'extern', 'false', 'finally', 'for', 'function', 'from', 'get', 'goto', 'if',
    'implements', 'import', 'in', 'infer', 'instanceof', 'interface', 'keyof',
    'let', 'module', 'namespace', 'never', 'new', 'null', 'number', 'object',
    'of', 'override', 'private', 'protected', 'public', 'readonly', 'return',
    'satisfies', 'set', 'static', 'string', 'super', 'switch', 'this', 'throw',
    'true', 'try', 'type', 'typeof', 'unknown', 'var', 'void', 'while',
]);

class TypeScriptGenerator extends Generator {
    constructor(opts: TypeScriptGeneratorOptions) {
        super({
            ...opts,
            typeMap,
            keywords,
            staticDir: path.resolve(__dirname, 'static'),
        });
    }

    generateDependenciesImports(schema: TypeSchema) {
        if (schema.dependencies) {
            const deps = schema.dependencies
                .filter((dep) => ['complex-type', 'resource'].includes(dep.kind))
                .sort((a, b) => a.name.localeCompare(b.name));

            for (const dep of deps) {
                this.lineSM(`import { ${this.uppercaseFirstLetter(dep.name)} } from './${dep.name}'`);
            }
        }
    }

    generateDisclaimer() {
        this.line('// WARNING: This file is autogenerated by FHIR Schema Codegen.');
        this.line('// https://github.com/fhir-schema/fhir-schema-codegen');
        this.line('// Any manual changes made to this file may be overwritten.');
    }

    generateNestedTypes(schema: TypeSchema) {
        if (schema.nested) {
            this.line();
            for (let subtype of schema.nested) {
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

    generateType(schema: TypeSchema | INestedTypeSchema) {
        let name = '';
        if (schema instanceof TypeSchema) {
            if (schema.identifier.name === 'Reference') {
                name = 'Reference<T extends string = string>';
            } else {
                name = schema.identifier.name;
            }
        } else {
            name = this.deriveNestedSchemaName(schema.identifier.url, true);
        }

        const parent = this.canonicalToName(schema.base?.url);
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

                let type = this.getFieldType(field);

                if (field.type.kind === 'nested') {
                    type = this.deriveNestedSchemaName(field.type.url, true);
                }

                if (field.type.kind === 'primitive-type') {
                    type = typeMap[field.type.name as keyof typeof typeMap] ?? 'string';
                }

                if (schema.identifier.name === 'Reference' && fieldNameFixed === 'reference') {
                    type = '`${T}/${string}`';
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
        this.file(pascalCase(schema.identifier.name) + '.ts', () => {
            this.generateDisclaimer();
            this.line();

            this.generateDependenciesImports(schema);
            this.line();

            this.generateNestedTypes(schema);
            this.generateType(schema);
        });
    }

    generateIndexFile(schemas: TypeSchema[]) {
        this.file('index.ts', () => {
            const names = schemas.map((schema) => schema.identifier.name);

            names.forEach((n) => this.lineSM(`import { ${n} } from './${n}'`));
            this.lineSM(`export { ${names.join(', ')} }`);

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
        this.dir('types', async () => {
            const typesToGenerate = removeConstraints([...this.loader.complexTypes(), ...this.loader.resources()]);
            const groupedComplexTypes = groupedByPackage(typesToGenerate);

            for (const [packageName, packageSchemas] of Object.entries(groupedComplexTypes)) {
                this.dir(path.join('types', kebabCase(packageName)), () => {
                    this.generateIndexFile(packageSchemas);

                    for (const schema of packageSchemas) {
                        this.generateResourceModule(schema);
                    }
                });
            }
        });

        this.copyStaticFiles();
    }
}

export { TypeScriptGenerator };
export { type TypeScriptGeneratorOptions };

export function createGenerator(options: TypeScriptGeneratorOptions) {
    return new TypeScriptGenerator(options);
}
