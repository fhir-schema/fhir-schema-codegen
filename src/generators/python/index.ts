import * as fs from 'node:fs';
import * as Path from 'node:path';
import { type NestedTypeSchema, type TypeRef, TypeSchema } from '../../typeschema';
import {
    groupedByPackage,
    pascalCase,
    removeConstraints,
    snakeCase,
    sortSchemasByDeps,
} from '../../utils/code';
import { Generator, type GeneratorOptions } from '../generator';

// Naming conventions
// directory naming: snake_case
// file naming: snake_case
// function naming: snake_case
// class naming: PascalCase

export interface PythonGeneratorOptions extends GeneratorOptions {
    /** Root package name for Python SDK (e.g., 'fhirsdk' or 'aidbox.my_package') */
    sdkPackage?: string;
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
    private resourceHierarchy: { parent: TypeRef; child: TypeRef }[] | null = [];

    constructor(opts: PythonGeneratorOptions) {
        super({
            ...opts,
            typeMap,
            staticDir: Path.resolve(__dirname, 'static'),
        });
        this.rootPackage = opts.sdkPackage || 'fhirsdk';
        this.rootPackagePath = this.rootPackage.split('.');
        this.allowExtraFields = opts.allowExtraFields || false;
        this.resourceHierarchy = null;
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
        return `${s} | None`;
    }

    wrapList(s: string) {
        return `PyList[${s}]`;
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
            const extraMode = this.allowExtraFields ? 'allow' : 'forbid';
            this.line(
                `model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="${extraMode}")`,
            );
            this.line();
            if (!schema.fields) {
                this.line('pass');
                return;
            }

            if (schema.identifier.kind === 'resource') {
                this.line('resource_type: str = Field(');
                this.indentBlock(() => {
                    this.line(`default='${schema.identifier.name}',`);
                    this.line(`alias='resourceType',`);
                    this.line(`serialization_alias='resourceType',`);
                    this.line('frozen=True,');
                    this.line(`pattern='${schema.identifier.name}'`);
                });
                this.line(')');
                this.line();
            }

            const fields = Object.entries(schema.fields).sort((a, b) => a[0].localeCompare(b[0]));

            for (const [fieldName, field] of fields) {
                if ('choices' in field) continue;

                let fieldType = field.type.name;
                if (field.type.kind === 'resource' && this.childrenOf(field.type).length > 0) {
                    fieldType = `${fieldType}Family`;
                }

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
                    defaultValue = ` = Field(alias="${fieldName}", serialization_alias="${fieldName}")`;
                }

                const fieldDecl = `${fixReservedWords(snakeCase(fieldName))}: ${fieldType}${defaultValue}`;
                this.line(fieldDecl);
            }

            if (schema.identifier.kind === 'resource') {
                this.line();
                this.line('def to_json(self, indent: int | None = None) -> str:');
                this.line(
                    '    return self.model_dump_json(exclude_unset=True, exclude_none=True, indent=indent)',
                );
                this.line();
                this.line('@classmethod');
                this.line(`def from_json(cls, json: str) -> ${name}:`);
                this.line('    return cls.model_validate_json(json)');
            }
        });
    }

    defaultImports() {
        this.pyImportFrom('__future__', 'annotations');
        this.pyImportFrom('pydantic', 'BaseModel', 'ConfigDict', 'Field', 'PositiveInt');
        this.pyImportFrom('typing', 'List as PyList', 'Literal');
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

    pyFhirPackage(identifier: TypeRef) {
        return [this.rootPackage, snakeCase(identifier.package)].join('.');
    }

    pyPackage(identifier: TypeRef) {
        if (identifier.kind === 'complex-type') {
            return `${this.pyFhirPackage(identifier)}.base`;
        }
        if (identifier.kind === 'resource') {
            return [this.pyFhirPackage(identifier), snakeCase(identifier.name)].join('.');
        }
        return this.pyFhirPackage(identifier);
    }

    pyImportType(identifier: TypeRef) {
        this.pyImportFrom(this.pyPackage(identifier), pascalCase(identifier.name));
    }

    generateDependenciesImports(schema: TypeSchema) {
        if (schema.dependencies == null || schema.dependencies.length === 0) return;

        // Import complex types from <package>.base
        const complexTypeDeps = schema.dependencies.filter((deps) => deps.kind === 'complex-type');
        const complexTypeDepsByPackage: Record<string, string[]> = {};
        for (const schema of complexTypeDeps) {
            const pyPackage = this.pyPackage(schema);
            if (!complexTypeDepsByPackage[pyPackage]) {
                complexTypeDepsByPackage[pyPackage] = [];
            }
            complexTypeDepsByPackage[pyPackage].push(schema.name);
        }
        for (const [pyPackage, names] of Object.entries(complexTypeDepsByPackage)) {
            this.pyImportFrom(pyPackage, ...names.sort());
        }

        // Import resource types from <package>.<resource_name>
        const resourceDeps = schema.dependencies.filter((deps) => deps.kind === 'resource');
        for (const dep of resourceDeps) {
            this.pyImportType(dep);
            if (this.childrenOf(dep).length > 0) {
                this.pyImportFrom(
                    `${this.pyFhirPackage(dep)}.resource_families`,
                    `${pascalCase(dep.name)}Family`,
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
        });
    }

    generateResourcePackageInit(
        fullPyPackageName: string,
        packageResources: TypeSchema[],
        packageComplexTypes?: TypeSchema[],
    ) {
        this.file('__init__.py', () => {
            this.generateDisclaimer();
            const resources = packageResources;

            if (packageComplexTypes && packageComplexTypes.length > 0) {
                const baseTypes = packageComplexTypes.map((t) => t.identifier.name).sort();
                this.pyImportFrom(`${fullPyPackageName}.base`, ...baseTypes);
                this.line();
            }

            const allResourceNames: string[] = [];
            for (const resource of resources) {
                const moduleName = `${fullPyPackageName}.${snakeCase(resource.identifier.name)}`;
                const importNames = [resource.identifier.name];
                for (const nested of resource.nested ?? []) {
                    const nestedName = this.deriveNestedSchemaName(nested.identifier.url, true);
                    importNames.push(nestedName);
                }
                this.pyImportFrom(moduleName, ...importNames);
                const names: string[] = [...importNames];
                if (
                    resource.identifier.kind === 'resource' &&
                    this.childrenOf(resource.identifier).length > 0
                ) {
                    const familyName = `${resource.identifier.name}Family`;
                    this.pyImportFrom(`${fullPyPackageName}.resource_families`, familyName);
                    names.push(familyName);
                }
                allResourceNames.push(...names);
            }
            this.line();
            this.squareBlock(['__all__', '='], () => {
                for (const schemaName of [
                    ...(packageComplexTypes || []).map((t) => t.identifier.name),
                    ...allResourceNames,
                ].sort()) {
                    this.line(`'${schemaName}',`);
                }
            });
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
        this.copyStaticFile(srcPath, destPath, 'requirements.txt');
    }

    evaluateResourceHierarchy() {
        const resources = this.loader.resources();
        const pairs: { parent: TypeRef; child: TypeRef }[] = [];
        for (const schema of resources) {
            if (schema.base) {
                pairs.push({ parent: schema.base, child: schema.identifier });
            }
        }
        return pairs;
    }

    childrenOf(schemaRef: TypeRef) {
        if (!this.resourceHierarchy) {
            this.resourceHierarchy = this.evaluateResourceHierarchy();
        }
        const childrens = this.resourceHierarchy
            .filter((pair) => pair.parent.name === schemaRef.name)
            .map((pair) => pair.child);
        const subChildrens = childrens.flatMap((child) => this.childrenOf(child));
        return [...[...childrens].map((child) => child), ...subChildrens];
    }

    generate() {
        // Prepare root package path
        let destPackagePath = '.';
        for (const part of this.rootPackagePath) {
            destPackagePath = Path.join(destPackagePath, part);
            this.inDir(destPackagePath, () => {
                this.file('__init__.py', () => {
                    this.generateDisclaimer();
                    const pydanticModels: string[] = [];

                    const groupedComplexTypes = groupedByPackage(this.loader.complexTypes());
                    for (const [packageName, complexTypes] of Object.entries(groupedComplexTypes)) {
                        const pyPackageName = [this.rootPackage, snakeCase(packageName)].join('.');
                        const complexTypeNames = complexTypes.map((t) => t.identifier.name);
                        this.pyImportFrom(pyPackageName, ...complexTypeNames.sort());
                        pydanticModels.push(...complexTypeNames);
                        this.line();
                    }

                    const groupedResources = groupedByPackage(this.loader.resources());
                    for (const [packageName, resources] of Object.entries(groupedResources)) {
                        const pyPackageName = [this.rootPackage, snakeCase(packageName)].join('.');
                        for (const resource of resources) {
                            const name = resource.identifier.name;
                            const importNames = [name];
                            pydanticModels.push(name);

                            for (const nested of resource.nested ?? []) {
                                const nestedName = this.deriveNestedSchemaName(
                                    nested.identifier.url,
                                    true,
                                );
                                importNames.push(nestedName);
                                pydanticModels.push(nestedName);
                            }

                            this.pyImportFrom(
                                `${pyPackageName}.${snakeCase(name)}`,
                                ...importNames,
                            );

                            if (this.childrenOf(resource.identifier).length > 0) {
                                const familyName = `${resource.identifier.name}Family`;
                                this.pyImportFrom(`${pyPackageName}.resource_families`, familyName);
                            }
                        }
                        this.line();
                    }

                    for (const modelName of pydanticModels.sort()) {
                        this.line(`${modelName}.model_rebuild()`);
                    }
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
                    const packageName =
                        packageResources.length > 0 ? packageResources[0].identifier.package : '';
                    const packageParts = packageName
                        ? [this.rootPackage, snakeCase(packageName)]
                        : [this.rootPackage];
                    const pyPackageName = packageParts.join('.');
                    const packageComplexTypes = groupedComplexTypes[packageName] || [];
                    this.generateResourcePackageInit(
                        pyPackageName,
                        packageResources,
                        packageComplexTypes,
                    );
                    this.generateResourceFamilies(packageResources);
                    for (const schema of packageResources) {
                        this.generateResourceModule(schema);
                    }
                });
            }
        });
    }

    pyImportFrom(pyPackage: string, ...entities: string[]) {
        const maxLine = 100;
        const oneLine = ['from', pyPackage, 'import', entities.join(', ')].join(' ');
        if (oneLine.length <= maxLine || entities.length === 1) {
            this.line(oneLine);
        } else {
            this.line('from', pyPackage, 'import \\');
            this.indentBlock(() => {
                while (entities.length > 0) {
                    let line = '';
                    while (entities.length > 0 && line.length < maxLine) {
                        const entity = entities.shift();
                        if (line.length > 0) {
                            line += ', ';
                        }
                        line += entity;
                    }
                    if (entities.length > 0) line += ', \\';
                    this.line(line);
                }
            });
        }
    }

    includeResourceFamilyValidator() {
        const srcPath = `${this.opts.staticDir}/resource_family_validator.py`;
        if (!srcPath) return;
        const content = fs.readFileSync(srcPath, 'utf-8');
        if (content) this.line(content);
    }

    getPackages(packageResources: TypeSchema[]): string[] {
        const packages: string[] = [];
        for (const resource of packageResources) {
            const resource_name: string = `${this.rootPackage}.${resource.identifier.package.replaceAll('.', '_')}`;
            if (!packages.includes(resource_name)) packages.push(resource_name);
        }
        return packages;
    }

    getFamilies(packageResources: TypeSchema[]) {
        const families: Record<string, string[]> = {};
        for (const resource of packageResources) {
            const resources: string[] = this.childrenOf(resource.identifier).map(
                (c: { name: string }) => c.name,
            );
            if (resources.length > 0) {
                const familyName = `${resource.identifier.name}Family`;
                families[familyName] = resources;
            }
        }
        return families;
    }

    buildResourceFamiliesFile(
        packages: string[],
        families: Record<string, string[]>,
        exportList: string[],
    ) {
        this.file('resource_families.py', () => {
            this.generateDisclaimer();
            this.includeResourceFamilyValidator();
            this.line();

            this.line(`packages = [${packages.map((p) => `'${p}'`).join(', ')}]`);
            this.line();

            for (const [familyName, resources] of Object.entries(families)) {
                const list_name = `${familyName}_resources`;
                this.line(`${list_name} = [${resources.map((r) => `'${r}'`).join(', ')}]`);
                this.line();

                this.line(`def validate_and_downcast_${familyName}(v: Any) -> Any:`);
                this.line(`   return validate_and_downcast(v, packages, ${list_name})`);
                this.line();

                this.line(
                    `type ${familyName} = Annotated[Any, BeforeValidator(validate_and_downcast_${familyName})]`,
                );
                this.line();
            }
            this.line(`__all__ = [${exportList.map((e) => `'${e}'`).join(', ')}]`);
        });
    }

    generateResourceFamilies(packageResources: TypeSchema[]) {
        const packages: string[] = this.getPackages(packageResources);
        const families: Record<string, string[]> = this.getFamilies(packageResources);
        const exportList: string[] = Object.keys(families);

        if (exportList.length === 0) return;
        this.buildResourceFamiliesFile(packages, families, exportList);
    }
}

export const createGenerator = (options: PythonGeneratorOptions) => new PythonGenerator(options);
