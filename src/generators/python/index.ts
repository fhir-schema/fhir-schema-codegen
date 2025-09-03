import * as Path from 'node:path';
import { Generator, type GeneratorOptions } from '../generator';
import { ClassField, type NestedTypeSchema, type TypeRef, TypeSchema } from '../../typeschema';
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

    genericAnnotation() {
        this.line('from typing import TypeVar, Generic, Type');
        this.line("T = TypeVar('T', bound='Resource')");
        this.line();
    }

    genType_deriveClassName(schema: TypeSchema | NestedTypeSchema): string {
        return schema instanceof TypeSchema
            ? schema.identifier.name
            : this.deriveNestedSchemaName(schema.identifier.url, true);
    }

    genType_produceClassDefinition(
        name: string,
        schema: TypeSchema | NestedTypeSchema,
        containsResourceRef: boolean,
    ): string {
        const superClasses = [
            ...(schema.base ? [schema.base.name] : []),
            ...injectSuperClasses(schema.identifier.name),
        ];
        return containsResourceRef
            ? `class ${name}(${superClasses.join(', ')}, Generic[T])`
            : `class ${name}(${superClasses.join(', ')})`;
    }

    genType_modelConfigGeneration(isFamily: boolean): void {
        const extraMode = this.allowExtraFields ? 'allow' : 'forbid';
        this.line(
            `model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="${isFamily ? 'allow' : extraMode}")`,
        );
        this.line();
    }

    genType_resourceFamilyClassGeneration(
        schema: TypeSchema | NestedTypeSchema,
        family: TypeRef[] | null,
    ): void {
        this.line('resource_type: str = Field(');
        this.indentBlock(() => {
            this.line(`default='${schema.identifier.name}',`);
            this.line(`alias='resourceType',`);
            this.line(`serialization_alias='resourceType',`);
            this.line('frozen=True,');
            if (!!family) this.line(`pattern='${family.map((e) => `(${e.name})`).join('|')}'`);
            else this.line(`pattern='${schema.identifier.name}'`);
        });
        this.line(')');
        this.line();
    }

    genType_handleFields(fields: [string, ClassField][]): void {
        for (const [fieldName, field] of fields) {
            if ('choices' in field) continue;

            let fieldType = field.type.name;
            switch (field.type.kind) {
                case 'resource':
                    fieldType = this.childrenOf(field.type).length > 0 ? 'T' : field.type.name;
                    break;
                case 'nested':
                    fieldType = this.deriveNestedSchemaName(field.type.url, true);
                    break;
                case 'primitive-type':
                    fieldType = typeMap[field.type.name] ?? 'str';
                    break;
            }
            if (field.enum)
                fieldType = this.wrapLiteral(field.enum.map((e) => `"${e}"`).join(', '));
            if (field.array) fieldType = this.wrapList(fieldType);
            if (!field.required) fieldType = this.wrapOptional(fieldType);

            const defaultValue = !field.required
                ? ` = Field(None, alias="${fieldName}", serialization_alias="${fieldName}")`
                : ` = Field(alias="${fieldName}", serialization_alias="${fieldName}")`;

            const fieldDecl = `${fixReservedWords(snakeCase(fieldName))}: ${fieldType}${defaultValue}`;
            this.line(fieldDecl);
        }
    }

    genType_onResourceRef(name: string, includeDowncast: boolean): void {
        if (includeDowncast) {
            this.line();
            this.line('def downcast_to(self, cls: Type[T]) -> T | None:');
            this.line('    try:');
            this.line('        return cls(**self.model_extra)');
            this.line('    except:');
            this.line('        return None');
        }

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

    generateType(
        schema: TypeSchema | NestedTypeSchema,
        resourceFamilies: Record<string, TypeRef[]> | null,
        containsResourceRef: boolean,
    ) {
        const name = this.genType_deriveClassName(schema);
        const resourceFamiliesExist = !!resourceFamilies;
        const family = // the associated resource family if there is one
            resourceFamiliesExist ? resourceFamilies[schema.identifier.name] : null;
        const classDefinition = this.genType_produceClassDefinition(
            name,
            schema,
            containsResourceRef,
        );

        this.curlyBlock([classDefinition], () => {
            this.genType_modelConfigGeneration(!!family);

            if (!schema.fields) {
                this.line('pass');
                return;
            }

            if (resourceFamiliesExist && schema.identifier.kind === 'resource')
                this.genType_resourceFamilyClassGeneration(schema, family);

            const fields = Object.entries(schema.fields).sort((a, b) => a[0].localeCompare(b[0]));

            this.genType_handleFields(fields);

            if (schema.identifier.kind === 'resource') this.genType_onResourceRef(name, !!family);
        });
    }

    defaultImports() {
        this.pyImportFrom('__future__', 'annotations');
        this.pyImportFrom('pydantic', 'BaseModel', 'ConfigDict', 'Field', 'PositiveInt');
        this.pyImportFrom('typing', 'List as PyList', 'Literal');
    }

    generateNestedTypes(
        schema: TypeSchema,
        resourceFamilies: Record<string, TypeRef[]> | null,
        containsResourceRefParent: boolean,
    ) {
        if (schema.nested) {
            this.line();
            for (const subtype of schema.nested) {
                this.generateType(subtype, resourceFamilies, containsResourceRefParent);
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
        }
    }

    generateBasePy(packageComplexTypes: TypeSchema[]) {
        this.file('base.py', () => {
            this.generateDisclaimer();
            this.defaultImports();
            this.line();

            for (const schema of sortSchemasByDeps(removeConstraints(packageComplexTypes))) {
                this.generateNestedTypes(schema, null, false);
                this.line();
                this.generateType(schema, null, false);
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
                // if (
                //     resource.identifier.kind === 'resource' &&
                //     this.childrenOf(resource.identifier).length > 0
                // )
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

    findAllResources(packageResources: TypeSchema[]) {
        const resourceFamilies: Record<string, TypeRef[]> = {};
        packageResources.forEach((resource) => {
            const children = this.childrenOf(resource.identifier);
            if (children.length > 0) {
                const familyName = `${resource.identifier.name}`;
                resourceFamilies[familyName] = [resource.identifier, ...children];
            }
        });
        return resourceFamilies;
    }

    containsResourceRef(schema: TypeSchema): boolean {
        const nested = schema.nested;
        if (!nested)
            return (
                !!schema.fields &&
                Object.values(schema.fields).some(
                    (item, _) => !!item.type && item.type.kind === 'resource',
                )
            );
        return nested.some(
            (nestedSchema) =>
                !!nestedSchema.fields &&
                Object.values(nestedSchema.fields).some(
                    (item, _) => !!item.type && item.type.kind === 'resource',
                ),
        );
    }

    generateResourceModule(schema: TypeSchema, packageResources: TypeSchema[]) {
        const containsResourceRef = this.containsResourceRef(schema);
        const families = this.findAllResources(packageResources);
        this.file(`${snakeCase(schema.identifier.name)}.py`, () => {
            this.generateDisclaimer();
            this.defaultImports();
            this.line();

            this.generateDependenciesImports(schema);
            this.line();

            if (containsResourceRef || schema.identifier.name in families) this.genericAnnotation();

            this.generateNestedTypes(schema, families, containsResourceRef);

            this.line();
            this.generateType(schema, families, containsResourceRef);
        });
    }

    copyStaticFiles() {
        if (!this.opts.staticDir) {
            return;
        }
        const srcPath = this.opts.staticDir;
        const destPath = this.getCurrentDir();

        this.copyStaticFile(srcPath, destPath, 'client.py', (content: string) => {
            return content.replace(
                /from DOMAIN_RESOURCE_PACKAGE/g,
                `from ${this.rootPackage}.hl7_fhir_r4_core`,
            );
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

                            // if (this.childrenOf(resource.identifier).length > 0) {
                            //     const familyName = `${resource.identifier.name}Family`;
                            //     this.pyImportFrom(`${pyPackageName}.resource_families`, familyName);
                            // }
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
                    // this.generateResourceFamilies(packageResources);
                    for (const schema of packageResources) {
                        this.generateResourceModule(schema, packageResources);
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
}

export const createGenerator = (options: PythonGeneratorOptions) => new PythonGenerator(options);
