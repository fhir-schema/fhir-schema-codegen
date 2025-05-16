import * as Path from 'node:path';
import { Generator, type GeneratorOptions } from '../generator';
import { type NestedTypeSchema, type TypeRef, TypeSchema } from '../../typeschema';
import {
    groupedByPackage,
    pascalCase,
    removeConstraints,
    snakeCase,
    sortSchemasByDeps,
} from '../../utils/code';

// Naming conventions
// directory naming: snake_case
// file naming: snake_case
// function naming: snake_case
// class naming: PascalCase

export interface PythonGeneratorOptions extends GeneratorOptions {
    /** Root package name for Python package hierarchy (e.g., 'fhirsdk' or 'aidbox.my_package') */
    packageRoot?: string;
    /** Allow extra fields in resource models. Extra fields will be ignored during serialization. Default is false (extra fields are forbidden) */
    allowExtraFields?: boolean;
}

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
    if (name === 'Resource' || name === 'Element') {
        return ['BaseModel'];
    }

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
    // typings
    'List',
]);

const fixReservedWords = (name: string) => {
    if (pythonKeywords.has(name)) {
        return `${name}_`;
    }
    return name;
};

export class PythonGenerator extends Generator {
    private rootPackage: string;
    private rootPackagePath: string[];
    private allowExtraFields: boolean;

    constructor(opts: PythonGeneratorOptions) {
        super({
            ...opts,
            typeMap,
            staticDir: Path.resolve(__dirname, 'static'),
        });
        this.rootPackage = opts.packageRoot || 'fhirsdk';
        this.rootPackagePath = this.rootPackage.split('.');
        this.allowExtraFields = opts.allowExtraFields || false;
    }

    modulePrefix() {
        return this.rootPackage;
    }

    toLangType(fhirType: TypeRef) {
        if (typeMap[fhirType.name]) {
            return typeMap[fhirType.name];
        }
        return this.getFieldName(fhirType.name);
    }

    commentSymbol() {
        return '#';
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
        return `Optional[${s}]`;
    }

    wrapList(s: string) {
        return `L[${s}]`;
    }

    wrapLiteral(s: string) {
        return `Literal[${s}]`;
    }

    generateType(schema: TypeSchema | NestedTypeSchema) {
        let name = '';

        if (schema instanceof TypeSchema) {
            name = schema.identifier.name;
        } else {
            name = this.deriveNestedSchemaName(schema.identifier.url, true);
        }

        const superClasses = [
            ...(schema.base ? [schema.base.name] : []),
            ...injectSuperClasses(schema.identifier.name),
        ];
        const classDefinition = `class ${name}(${superClasses.join(', ')})`;

        this.curlyBlock([classDefinition], () => {
            const extraMode = this.allowExtraFields ? 'ignore' : 'forbid';
            this.line(
                `model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="${extraMode}")`,
            );
            this.line();
            if (!schema.fields) {
                this.line('pass');
                return;
            }

            if (schema.identifier.kind === 'resource') {
                this.line(`resource_type: str = Field(`);
                this.indentBlock(() => {
                    this.line(`default='${schema.identifier.name}',`);
                    this.line(`alias='resourceType',`);
                    this.line(`serialization_alias='resourceType',`);
                    this.line(`frozen=True,`);
                    this.line(`pattern='${schema.identifier.name}'`);
                });
                this.line(`)`);
                this.line();
            }

            const fields = Object.entries(schema.fields).sort((a, b) => a[0].localeCompare(b[0]));

            for (const [fieldName, field] of fields) {
                if ('choices' in field) continue;

                let fieldType = field.type.name;

                if (field.type.kind === 'nested') {
                    fieldType = this.deriveNestedSchemaName(field.type.url, true);
                }

                if (field.type.kind === 'primitive-type') {
                    fieldType = typeMap[field.type.name] ?? 'str';
                }

                if (field.enum) {
                    fieldType = this.wrapLiteral(field.enum.map((e) => `"${e}"`).join(', '));
                }

                if (field.array) {
                    fieldType = this.wrapList(fieldType);
                }

                let defaultValue = '';
                if (!field.required) {
                    fieldType = this.wrapOptional(fieldType);
                    defaultValue = ` = Field(None, alias="${fieldName}", serialization_alias="${fieldName}")`;
                } else {
                    defaultValue =
                        ' = Field(alias="${fieldName}", serialization_alias="${fieldName}")';
                }

                const fieldDecl = `${fixReservedWords(snakeCase(fieldName))}: ${fieldType}${defaultValue}`;
                this.line(fieldDecl);
            }
        });
    }

    defaultImports() {
        this.line('from __future__ import annotations');
        this.line(
            'from',
            'pydantic',
            'import',
            ['BaseModel', 'ConfigDict', 'Field', 'PositiveInt'].join(', '),
        );
        this.line('from', 'typing', 'import', ['Optional', 'List as L', 'Literal'].join(', '));
    }

    generateNestedTypes(schema: TypeSchema) {
        if (schema.nested) {
            this.line();
            for (const subtype of schema.nested) {
                this.generateType(subtype);
            }
        }
    }

    listBaseImports(schema: TypeSchema) {
        const typesFromBase = new Set<string>();

        if (schema.base && schema.base.kind === 'complex-type') {
            typesFromBase.add(pascalCase(schema.base.name));
        }

        const complexTypesDeps = schema.dependencies
            ? schema.dependencies.filter((deps) => deps.kind === 'complex-type')
            : [];

        complexTypesDeps.forEach((dep) => {
            typesFromBase.add(pascalCase(dep.name));
        });

        if (schema.fields) {
            Object.values(schema.fields).forEach((field) => {
                if (field.type && field.type.kind === 'complex-type') {
                    typesFromBase.add(pascalCase(field.type.name));
                }
            });
        }

        if (schema.nested) {
            schema.nested.forEach((nestedSchema) => {
                if (nestedSchema.base && nestedSchema.base.kind === 'complex-type') {
                    typesFromBase.add(pascalCase(nestedSchema.base.name));
                }

                if (nestedSchema.fields) {
                    Object.values(nestedSchema.fields).forEach((field) => {
                        if (field.type && field.type.kind === 'complex-type') {
                            typesFromBase.add(pascalCase(field.type.name));
                        }
                    });
                }
            });
        }
        return typesFromBase;
    }

    generateDependenciesImports(schema: TypeSchema) {
        if (schema.dependencies) {
            const resourceDeps = schema.dependencies.filter((deps) => deps.kind === 'resource');

            const packageParts = [this.rootPackage];
            if (schema.identifier.package) packageParts.push(snakeCase(schema.identifier.package));
            const pypackage = packageParts.join('.');

            const typesFromBase = this.listBaseImports(schema);
            if (typesFromBase.size > 0) {
                const imports = Array.from(typesFromBase).sort().join(', ');
                this.line('from', `${pypackage}.base`, 'import', imports);
            }

            for (const deps of resourceDeps) {
                this.line(
                    'from',
                    `${pypackage}.${snakeCase(deps.name)}`,
                    'import',
                    `${pascalCase(deps.name)}`,
                );
            }
        }
    }

    generateBasePy(packageComplexTypes: TypeSchema[]) {
        this.file('base.py', () => {
            this.generateDisclaimer();
            this.defaultImports();
            this.line();

            for (const schema of sortSchemasByDeps(removeConstraints(packageComplexTypes))) {
                this.generateNestedTypes(schema);
                this.line();
                this.generateType(schema);
            }

            this.line();
            this.line('# Rebuild models to resolve circular dependencies');
            for (const schema of sortSchemasByDeps(removeConstraints(packageComplexTypes))) {
                this.line(`${schema.identifier.name}.model_rebuild()`);
                if (schema.nested) {
                    for (const nestedSchema of schema.nested) {
                        const nestedName = this.deriveNestedSchemaName(
                            nestedSchema.identifier.url,
                            true,
                        );
                        this.line(`${nestedName}.model_rebuild()`);
                    }
                }
            }
        });
    }

    generateResourcePackageInit(
        packageResources: TypeSchema[],
        packageComplexTypes?: TypeSchema[],
    ) {
        this.file('__init__.py', () => {
            this.generateDisclaimer();
            const names = removeConstraints(packageResources);
            const packageName = names.length > 0 ? names[0].identifier.package : '';
            const packageParts = packageName
                ? [this.rootPackage, snakeCase(packageName)]
                : [this.rootPackage];
            const pypackage = packageParts.join('.');

            if (packageComplexTypes && packageComplexTypes.length > 0) {
                const baseTypes = packageComplexTypes.map((t) => t.identifier.name).sort();

                // Format with backslash at first line and types on new indented lines
                this.line(`from ${pypackage}.base import \\`);

                const maxLineLength = 120;
                let currentLine = '';
                const indentation = '    '; // 4 spaces for indentation

                for (let i = 0; i < baseTypes.length; i++) {
                    const typeName = baseTypes[i];
                    const isLast = i === baseTypes.length - 1;

                    // Check if adding this type would exceed line length
                    if (
                        currentLine.length + typeName.length + (currentLine ? 2 : 0) >
                        maxLineLength - indentation.length
                    ) {
                        // Output the current line with trailing comma and backslash if not the last type
                        this.line(`${indentation}${currentLine}${isLast ? '' : ','} \\`);
                        currentLine = '';
                    }

                    // Add the type to the current line
                    if (currentLine) {
                        currentLine += `, ${typeName}`;
                    } else {
                        currentLine = typeName;
                    }

                    // If this is the last type or we've filled the line, output it
                    if (isLast) {
                        this.line(`${indentation}${currentLine}`);
                    }
                }

                this.line();
            }

            for (const schemaName of names) {
                this.line(
                    `from ${pypackage}.${snakeCase(schemaName.identifier.name)} import ${schemaName.identifier.name}`,
                );
            }
        });
    }

    generateResourceModule(schema: TypeSchema) {
        this.file(`${snakeCase(schema.identifier.name)}.py`, () => {
            this.generateDisclaimer();
            this.defaultImports();
            this.line();

            this.generateDependenciesImports(schema);
            this.line();

            this.generateNestedTypes(schema);

            this.line();
            this.generateType(schema);
        });
    }

    copyStaticFiles() {
        if (!this.opts.staticDir) {
            return;
        }
        const srcPath = this.opts.staticDir;
        const destPath = this.getCurrentDir();

        this.copyStaticFile(srcPath, destPath, 'client.py', (content: string) => {
            const updatedContent = content.replace(
                /from DOMAIN_RESOURCE_PACKAGE/g,
                `from ${this.rootPackage}.hl7_fhir_r4_core`,
            );
            return updatedContent;
        });
    }

    generate() {
        // Prepare root package path
        let destPackagePath = '.';
        for (const part of this.rootPackagePath) {
            destPackagePath = Path.join(destPackagePath, part);
            this.inDir(destPackagePath, () => {
                this.file('__init__.py', () => {
                    this.generateDisclaimer();
                });
            });
        }

        // Generate SDK
        this.inRelDir(destPackagePath, () => {
            this.copyStaticFiles();

            const groupedComplexTypes = groupedByPackage(this.loader.complexTypes());
            for (const [packageName, packageComplexTypes] of Object.entries(groupedComplexTypes)) {
                this.inRelDir(snakeCase(packageName), () => {
                    this.file('__init__.py', () => {});
                    this.generateBasePy(packageComplexTypes);
                });
            }

            const groupedResources = groupedByPackage(this.loader.resources());
            for (const [packageName, packageResources] of Object.entries(groupedResources)) {
                this.inRelDir(snakeCase(packageName), () => {
                    const packageComplexTypes = groupedComplexTypes[packageName] || [];
                    this.generateResourcePackageInit(packageResources, packageComplexTypes);
                    for (const schema of removeConstraints(packageResources)) {
                        this.generateResourceModule(schema);
                    }
                });
            }
        });
    }
}

export const createGenerator = (options: PythonGeneratorOptions) => new PythonGenerator(options);
