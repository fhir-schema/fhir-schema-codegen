import { Generator, GeneratorOptions } from '@fscg/generator';
import { TypeRef, TypeSchema } from '@fscg/typeschema';
import { pascalCase, snakeCase, sortSchemasByDeps, removeConstraints } from '@fscg/utils';

// Naming conventions
// directory naming: kebab-case
// file naming: snake_case
// function naming: snake_case
// class naming: PascalCase

export interface PythonGeneratorOptions extends GeneratorOptions {}

const typeMap: Record<string, string> = {
    boolean: 'bool',
    instant: 'str',
    time: 'str',
    date: 'str',
    dateTime: 'str',

    decimal: 'float',
    integer: 'int',
    unsignedInt: 'int',
    positiveInt: 'PositiveInt',
    integer64: 'int',
    base64Binary: 'str',

    uri: 'str',
    url: 'str',
    canonical: 'str',
    oid: 'str',
    uuid: 'str',

    string: 'str',
    code: 'str',
    markdown: 'str',
    id: 'str',
    xhtml: 'str',
};

const injectSuperClasses = (name: string) => {
    if (name === 'Resource') return ['API'];
    return [];
};

const pythonKeywords = new Set([
    'False',
    'None',
    'True',
    'and',
    'as',
    'assert',
    'async',
    'await',
    'break',
    'class',
    'continue',
    'def',
    'del',
    'elif',
    'else',
    'except',
    'finally',
    'for',
    'from',
    'global',
    'if',
    'import',
    'in',
    'is',
    'lambda',
    'nonlocal',
    'not',
    'or',
    'pass',
    'raise',
    'return',
    'try',
    'while',
    'with',
    'yield',
]);

const fixReservedWords = (name: string) => {
    if (pythonKeywords.has(name)) {
        return name + '_';
    }
    return name;
};

const makeClassName = (fhirType: TypeRef): string => {
    const name = fhirType.name;
    const parent = fhirType.parent;
    if (parent) {
        return pascalCase(parent) + '_' + pascalCase(name.substring(parent.length));
    }
    return fixReservedWords(pascalCase(name));
};

export class PythonGenerator extends Generator {
    constructor(opts: PythonGeneratorOptions) {
        super({ ...opts, tabSize: 4 });
    }

    toLangType(fhirType: TypeRef) {
        if (typeMap[fhirType.name]) {
            return typeMap[fhirType.name];
        }
        return makeClassName(fhirType);
    }

    curlyBlock(tokens: string[], gencontent: () => void) {
        this.write(tokens.join(' '));
        this.write(':\n');
        this.ident();
        gencontent();
        this.deident();
        this.write('\n');
    }

    wrapOptional(s: string) {
        return 'Optional[' + s + ']';
    }

    wrapList(s: string) {
        return 'List[' + s + ']';
    }

    generateType(schema: TypeSchema) {
        const className = makeClassName(schema.name);
        const superClasses = [...(schema.base ? [schema.base.name] : []), ...injectSuperClasses(schema.name.name)];
        const classDefinition = `class ${className}(${superClasses.join(", ")})`;

        this.curlyBlock([classDefinition], () => {
            if (!schema.fields) {
                this.line('pass');
                return;
            }

            let fields = Object.entries(schema.fields).sort((a, b) => a[0].localeCompare(b[0]));
            for (const [fieldName, field] of fields) {
                let fieldType = this.toLangType(field.type);
                let defaultValue = '';

                if (field.array) {
                    fieldType = this.wrapList(fieldType);
                }

                if (!field.required) {
                    fieldType = this.wrapOptional(fieldType);
                    defaultValue = ' = None';
                }

                const fieldDecl = `${fixReservedWords(snakeCase(fieldName))}: ${fieldType}${defaultValue}`;
                this.line(fieldDecl);
            }
        });
    }

    default_imports() {
        this.line('from __future__ import annotations');
        this.line('from', 'pydantic', 'import', '*');
        this.line('from', 'typing', 'import', ['Optional', 'List'].join(', '));
    }

    generateNestedTypes(schema: TypeSchema) {
        if (schema.nestedTypes) {
            this.line('# Nested Types');
            this.line();
            for (let subtype of schema.nestedTypes) {
                this.generateType(subtype);
            }
        }
    }

    generateDependenciesImports(schema: TypeSchema) {
        if (schema.allDependencies) {
            for (const deps of schema.allDependencies) {
                if (deps.type === 'resource') {
                    this.line('from', snakeCase(deps.name), 'import', '*');
                }
            }
        }
    }

    generate() {
        this.dir('src', async () => {
            this.file('__init__.py', () => {});
            this.file('complex_types.py', () => {
                // TODO: add comment about auto-generated file
                this.default_imports();
                this.line();

                for (let schema of sortSchemasByDeps(removeConstraints(this.loader.complexTypes()))) {
                    this.generateNestedTypes(schema);
                    this.line();
                    this.generateType(schema);
                }
            });

            for (let schema of removeConstraints(this.loader.resources())) {
                this.file(snakeCase(schema.name.name) + '.py', () => {
                    this.default_imports();
                    this.line();

                    this.line('from', 'complex_types', 'import', '*');
                    this.generateDependenciesImports(schema);
                    this.line();

                    this.generateNestedTypes(schema);

                    this.line('# Resource Type');
                    this.line();
                    this.generateType(schema);
                });
            }
        });
    }
}
