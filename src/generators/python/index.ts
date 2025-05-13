import path from 'node:path';
import * as fs from 'node:fs';
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
    private packageRoot: string;

    constructor(opts: PythonGeneratorOptions) {
        super({
            ...opts,
            typeMap,
            staticDir: path.resolve(__dirname, 'static'),
        });
        this.packageRoot = opts.packageRoot || 'fhirsdk';
    }

    modulePrefix() {
        return this.packageRoot;
    }

    toLangType(fhirType: TypeRef) {
        if (typeMap[fhirType.name]) {
            return typeMap[fhirType.name];
        }
        return this.getFieldName(fhirType.name);
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
            this.line('model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True)');
            this.line();
            if (!schema.fields) {
                this.line('pass');
                return;
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
        this.line('from', 'pydantic', 'import', '*');
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

    generateDependenciesImports(schema: TypeSchema) {
        if (schema.dependencies) {
            const complexTypesDeps = schema.dependencies.filter(
                (deps) => deps.kind === 'complex-type',
            );
            const resourceDeps = schema.dependencies.filter((deps) => deps.kind === 'resource');

            const packageParts = [this.packageRoot];
            if (schema.identifier.package) packageParts.push(snakeCase(schema.identifier.package));
            const pypackage = packageParts.join('.');
            this.line('from', `${pypackage}.base`, 'import', '*');

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
        });
    }

    generateResourcePackageInit(packageResources: TypeSchema[]) {
        this.file('__init__.py', () => {
            this.generateDisclaimer();
            const names = removeConstraints(packageResources);
            const packageName = names.length > 0 ? names[0].identifier.package : '';
            const packageParts = packageName
                ? [this.packageRoot, snakeCase(packageName)]
                : [this.packageRoot];
            const pypackage = packageParts.join('.');

            for (const schemaName of names) {
                this.line(
                    `from ${pypackage}.${snakeCase(schemaName.identifier.name)} import ${schemaName.identifier.name}`,
                );
            }
        });
    }

    commentLine(line: string) {
        this.line(`# ${line}`);
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

    copyStaticFilesWithPackageRoot() {
        if (!this.opts.staticDir) {
            throw new Error('staticDir must be set in subclass.');
        }

        const staticDir = this.opts.staticDir as string;

        // Determine the root package directory path
        const packageRootParts = this.packageRoot.split('.');
        let packagePath = this.opts.outputDir;
        for (const part of packageRootParts) {
            packagePath = path.join(packagePath, part);
        }

        if (!fs.existsSync(packagePath)) {
            fs.mkdirSync(packagePath, { recursive: true });
        }

        // Copy all static files except client.py which needs to be processed
        fs.readdirSync(Path.resolve(staticDir)).forEach((file) => {
            if (file !== 'client.py') {
                fs.copyFileSync(Path.resolve(staticDir, file), Path.resolve(packagePath, file));
            }
        });

        const clientPath = Path.resolve(staticDir, 'client.py');
        if (fs.existsSync(clientPath)) {
            let clientContent = fs.readFileSync(clientPath, 'utf-8');

            // Fix import in Operation part of FHIR SDK
            clientContent = clientContent.replace(
                /from aidbox\.hl7_fhir_r4_core/g,
                `from ${this.packageRoot}.hl7_fhir_r4_core`,
            );
            clientContent = clientContent.replace(
                /from aidbox import/g,
                `from ${this.packageRoot} import`,
            );

            fs.writeFileSync(Path.resolve(packagePath, 'client.py'), clientContent);
        }
    }

    generate() {
        // Start at output directory
        this.dir('.', async () => {
            // Copy static files with proper package root
            this.copyStaticFilesWithPackageRoot();

            const packageRootParts = this.packageRoot.split('.');
            let currentPath = '.';

            for (const part of packageRootParts) {
                currentPath = path.join(currentPath, part);
                this.dir(currentPath, () => {
                    this.file('__init__.py', () => {
                        this.generateDisclaimer();
                    });
                });
            }

            this.dir(currentPath, () => {
                const groupedComplexTypes = groupedByPackage(this.loader.complexTypes());
                for (const [packageName, packageComplexTypes] of Object.entries(
                    groupedComplexTypes,
                )) {
                    this.dir(snakeCase(packageName), () => {
                        this.file('__init__.py', () => {});
                        this.generateBasePy(packageComplexTypes);
                    });
                }

                const groupedResources = groupedByPackage(this.loader.resources());
                for (const [packageName, packageResources] of Object.entries(groupedResources)) {
                    this.dir(snakeCase(packageName), () => {
                        this.generateResourcePackageInit(packageResources);
                        for (const schema of removeConstraints(packageResources)) {
                            this.generateResourceModule(schema);
                        }
                    });
                }
            });
        });

        const externalFhirPath = path.join(this.opts.outputDir, 'hl7_fhir_r4_core');
        if (fs.existsSync(externalFhirPath)) {
            const packageRootParts = this.packageRoot.split('.');
            let packagePath = this.opts.outputDir;
            for (const part of packageRootParts) {
                packagePath = path.join(packagePath, part);
            }

            const targetFhirPath = path.join(packagePath, 'hl7_fhir_r4_core');

            if (!fs.existsSync(targetFhirPath)) {
                fs.mkdirSync(targetFhirPath, { recursive: true });
            }

            fs.readdirSync(externalFhirPath).forEach((file) => {
                const sourcePath = path.join(externalFhirPath, file);
                const targetPath = path.join(targetFhirPath, file);

                if (file.endsWith('.py')) {
                    let content = fs.readFileSync(sourcePath, 'utf-8');
                    content = content.replace(
                        /from fhirsdk\.hl7_fhir_r4_core/g,
                        `from ${this.packageRoot}.hl7_fhir_r4_core`,
                    );
                    fs.writeFileSync(targetPath, content);
                } else {
                    fs.copyFileSync(sourcePath, targetPath);
                }
            });

            fs.rmSync(externalFhirPath, { recursive: true, force: true });
        }
    }
}

export const createGenerator = (options: PythonGeneratorOptions) => new PythonGenerator(options);
