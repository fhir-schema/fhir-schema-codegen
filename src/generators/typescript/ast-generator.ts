import path from 'node:path';
import { Project, type SourceFile, IndentationText, QuoteKind } from 'ts-morph';
import { TypeSchema, type ClassField, type NestedTypeSchema, type TypeRef } from '../../typeschema';
import { canonicalToName, groupedByPackage, kebabCase, pascalCase } from '../../utils/code';
import { Generator, type GeneratorOptions } from '../generator';
import { Decl, Expr, Stmt, Type, type PropertyConfig } from './ast';
import * as profile from '../../profile';

interface TypeScriptASTGeneratorOptions extends GeneratorOptions {
    typesOnly?: boolean;
}

const primitiveType2tsType: Record<string, string> = {
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

const fmap =
    <T>(f: (x: T) => T) =>
    (x: T | undefined): T | undefined => {
        return x === undefined ? undefined : f(x);
    };

export class TypeScriptASTGenerator extends Generator {
    private project: Project;

    constructor(opts: TypeScriptASTGeneratorOptions) {
        super({
            ...opts,
            typeMap: primitiveType2tsType,
            staticDir: path.resolve(__dirname, 'static'),
        });

        this.project = new Project({
            manipulationSettings: {
                indentationText: IndentationText.FourSpaces,
                quoteKind: QuoteKind.Single,
                useTrailingCommas: false,
            },
        });
    }

    /**
     * Build TypeNode for a field
     */
    private buildFieldType(field: ClassField, schema?: TypeSchema | NestedTypeSchema): string {
        let type: string;

        if (field.enum) {
            type = Type.union(field.enum.map(e => Type.stringLiteral(e)));
        } else if (field.reference?.length) {
            const references = field.reference.map(ref => Type.stringLiteral(ref.name));
            type = Type.generic('Reference', [Type.union(references)]);
        } else if (field.type.kind === 'primitive-type') {
            type = primitiveType2tsType[field.type.name] ?? 'string';
        } else if (field.type.kind === 'nested') {
            type = this.deriveNestedSchemaName(field.type.url, true);
        } else {
            // Handle special case for Reference.reference field
            if (schema?.identifier.name === 'Reference' && this.getFieldName(field.type.name) === 'reference') {
                type = Type.templateLiteralString('${0}/${1}', ['T', 'string']);
            } else {
                type = normalizeName(field.type.name);
            }
        }

        return field.array ? Type.array(type) : type;
    }

    /**
     * Build properties for an interface from schema fields
     */
    private buildProperties(
        fields: Record<string, ClassField>,
        schema: TypeSchema | NestedTypeSchema,
    ): PropertyConfig[] {
        const properties: PropertyConfig[] = [];
        const sortedFields = Object.entries(fields).sort(([a], [b]) => a.localeCompare(b));

        for (const [fieldName, field] of sortedFields) {
            if ('choices' in field) continue;

            // Main property
            properties.push({
                name: this.getFieldName(fieldName),
                type: this.buildFieldType(field, schema),
                optional: !field.required,
                docs: this.opts.withDebugComment ? JSON.stringify(field) : undefined,
            });

            // Extension property for primitives
            if (
                field.type.kind === 'primitive-type' &&
                ['resource', 'complex-type'].includes(schema.identifier.kind)
            ) {
                properties.push({
                    name: `_${this.getFieldName(fieldName)}`,
                    type: 'Element',
                    optional: true,
                });
            }
        }

        return properties;
    }

    /**
     * Generate dependencies imports
     */
    private generateDependenciesImports(sourceFile: SourceFile, schema: TypeSchema): void {
        if (!schema.dependencies) return;

        const deps = [
            ...schema.dependencies
                .filter(dep => ['complex-type', 'resource', 'logical'].includes(dep.kind))
                .map(dep => ({
                    tsPackage: `../${kebabCase(dep.package)}/${pascalCase(dep.name)}`,
                    name: this.uppercaseFirstLetter(dep.name),
                })),
            ...schema.dependencies
                .filter(dep => ['nested'].includes(dep.kind))
                .map(dep => ({
                    tsPackage: `../${kebabCase(dep.package)}/${pascalCase(canonicalToName(dep.url) ?? '')}`,
                    name: this.deriveNestedSchemaName(dep.url, true),
                })),
        ].sort((a, b) => a.name.localeCompare(b.name));

        for (const dep of deps) {
            Decl.import(sourceFile, dep.tsPackage, [dep.name]);
        }

        // Add Element import for primitive type extensions
        const element = this.loader.complexTypes().find(e => e.identifier.name === 'Element');
        if (
            element &&
            deps.find(e => e.name === 'Element') === undefined &&
            schema.identifier.name !== 'Element'
        ) {
            Decl.import(sourceFile, `../${kebabCase(element.identifier.package)}/Element`, ['Element']);
        }
    }

    /**
     * Generate a single type (interface)
     */
    private generateType(sourceFile: SourceFile, schema: TypeSchema | NestedTypeSchema): void {
        const name =
            schema.identifier.name === 'Reference'
                ? 'Reference<T extends string = string>'
                : schema instanceof TypeSchema
                  ? normalizeName(schema.identifier.name)
                  : normalizeName(this.deriveNestedSchemaName(schema.identifier.url, true));

        const parent = fmap(normalizeName)(canonicalToName(schema.base?.url));

        const docs: string[] = [];
        if (this.opts.withDebugComment) {
            docs.push(JSON.stringify(schema.identifier));
        }

        Decl.interface(sourceFile, {
            name,
            exported: true,
            extends: parent ? [parent] : [],
            properties: schema.fields ? this.buildProperties(schema.fields, schema) : [],
            docs,
        });

        Decl.blankLine(sourceFile);
    }

    /**
     * Generate nested types
     */
    private generateNestedTypes(sourceFile: SourceFile, schema: TypeSchema): void {
        if (schema.nested) {
            Decl.blankLine(sourceFile);
            for (const subtype of schema.nested) {
                this.generateType(sourceFile, subtype);
            }
        }
    }

    /**
     * Generate profile type
     */
    private generateProfileType(sourceFile: SourceFile, schema: TypeSchema): void {
        const name = resourceName(schema.identifier);
        const properties: PropertyConfig[] = [
            {
                name: '__profileUrl',
                type: Type.stringLiteral(schema.identifier.url),
                optional: false,
            },
        ];

        Decl.blankLine(sourceFile);

        for (const [fieldName, field] of Object.entries(schema.fields ?? {})) {
            if ('choices' in field) continue;

            let tsType: string;
            if (field.type.kind === 'nested') {
                tsType = this.deriveNestedSchemaName(field.type.url, true);
            } else if (field.enum) {
                tsType = Type.union(field.enum.map(e => Type.stringLiteral(e)));
            } else if (field.reference?.length) {
                const specializationId = profile.findSpecialization(this.loader, schema.identifier);
                const sField =
                    this.loader.resolveTypeIdentifier(specializationId)?.fields?.[fieldName] ?? {
                        reference: [],
                    };
                const sRefs = (sField.reference ?? []).map(e => e.name);
                const references = field.reference.map(ref => {
                    const resRef = profile.findSpecialization(this.loader, ref);
                    if (resRef.name !== ref.name) {
                        return Type.stringLiteral(resRef.name);
                    }
                    return Type.stringLiteral(ref.name);
                });

                if (
                    sRefs.length === 1 &&
                    sRefs[0] === 'Resource' &&
                    references.join(' | ') !== Type.stringLiteral('Resource')
                ) {
                    tsType = Type.generic('Reference', [Type.stringLiteral('Resource')]);
                } else {
                    tsType = Type.generic('Reference', [Type.union(references)]);
                }
            } else {
                tsType = primitiveType2tsType[field.type.name] ?? field.type.name;
            }

            properties.push({
                name: this.getFieldName(fieldName),
                type: field.array ? Type.array(tsType) : tsType,
                optional: !field.required,
                docs: this.opts.withDebugComment ? JSON.stringify(field, null, 2) : undefined,
            });
        }

        Decl.interface(sourceFile, {
            name,
            exported: true,
            properties,
            docs: this.opts.withDebugComment ? [JSON.stringify(schema.identifier)] : [],
        });

        Decl.blankLine(sourceFile);
    }

    /**
     * Generate attach profile function
     */
    private generateAttachProfile(sourceFile: SourceFile, flatProfile: TypeSchema): void {
        if (!flatProfile.base) {
            throw new Error('Profile must have a base type');
        }

        const resName = resourceName(flatProfile.base);
        const profName = resourceName(flatProfile.identifier);
        const profileFields = Object.entries(flatProfile.fields || {})
            .filter(([_fieldName, field]) => field && field.type !== undefined)
            .map(([fieldName]) => fieldName);

        Decl.arrowFunction(sourceFile, `attach_${profName}`, {
            parameters: [
                { name: 'resource', type: resName },
                { name: 'profile', type: profName },
            ],
            returnType: resName,
            body: [
                Stmt.return(
                    Expr.objWithSpreads([
                        Expr.spread('resource'),
                        [
                            'meta',
                            Expr.object({
                                profile: Expr.array([Expr.string(flatProfile.identifier.url)]),
                            }),
                        ],
                        ...profileFields.map(
                            fieldName =>
                                [fieldName, Expr.prop('profile', fieldName)] as [string, string],
                        ),
                    ]),
                ),
            ],
        });
    }

    /**
     * Generate extract profile function
     */
    private generateExtractProfile(sourceFile: SourceFile, flatProfile: TypeSchema): void {
        if (!flatProfile.base) {
            throw new Error('Profile must have a base type');
        }

        const resName = resourceName(flatProfile.base);
        const profName = resourceName(flatProfile.identifier);
        const profileFields = Object.entries(flatProfile.fields || {})
            .filter(([_fieldName, field]) => field && field.type !== undefined)
            .map(([fieldName]) => fieldName);

        const specialization = this.loader.resolveTypeIdentifier(
            profile.findSpecialization(this.loader, flatProfile.identifier),
        );
        if (!specialization) {
            throw new Error(`Specialization not found for ${flatProfile.identifier.url}`);
        }

        const body: any[] = [];
        const shouldCast: Record<string, boolean> = {};

        // Add validation checks
        for (const fieldName of profileFields) {
            const pField = flatProfile.fields?.[fieldName];
            const rField = specialization.fields?.[fieldName];
            if (!pField || !rField) continue;

            // Required field check
            if (pField.required && !rField.required) {
                body.push(
                    Stmt.if(
                        Expr.binary(Expr.prop('resource', fieldName), '===', Expr.undefined()),
                        [
                            Stmt.throw(
                                `'${fieldName}' is required for ${flatProfile.identifier.url}`,
                            ),
                        ],
                    ),
                );
                body.push(Stmt.blankLine());
            }

            // Reference check
            const pRefs = pField?.reference?.map(ref => ref.name);
            const rRefs = rField?.reference?.map(ref => ref.name);
            if (pRefs && rRefs && pRefs.length !== rRefs.length) {
                shouldCast[fieldName] = true;
                // Simplified validation for now
                body.push(Stmt.comment(`TODO: Add reference validation for ${fieldName}`));
            }
        }

        // Build return object properties
        const returnObjEntries: Record<string, string> = {
            __profileUrl: Expr.string(flatProfile.identifier.url),
        };

        for (const fieldName of profileFields) {
            if (shouldCast[fieldName]) {
                returnObjEntries[fieldName] = Expr.prop('resource', fieldName) + ` as ${profName}['${fieldName}']`;
            } else {
                returnObjEntries[fieldName] = Expr.prop('resource', fieldName);
            }
        }

        body.push(Stmt.return(Expr.object(returnObjEntries)));

        Decl.arrowFunction(sourceFile, `extract_${resName}`, {
            parameters: [{ name: 'resource', type: resName }],
            returnType: profName,
            body,
        });
    }

    /**
     * Generate profile
     */
    private generateProfile(sourceFile: SourceFile, schema: TypeSchema): void {
        const flatProfile = profile.flatProfile(this.loader, schema);
        this.generateDependenciesImports(sourceFile, flatProfile);
        Decl.blankLine(sourceFile);
        this.generateProfileType(sourceFile, flatProfile);
        this.generateAttachProfile(sourceFile, flatProfile);
        Decl.blankLine(sourceFile);
        this.generateExtractProfile(sourceFile, flatProfile);
    }

    /**
     * Generate a resource module (single file)
     */
    generateResourceModule(schema: TypeSchema): void {
        const filePath = path.join(this.getCurrentDir(), fileName(schema.identifier));
        const sourceFile = this.project.createSourceFile(filePath, '', { overwrite: true });

        // Add disclaimer
        this.disclaimer().forEach(line => {
            Decl.comment(sourceFile, line);
        });
        Decl.blankLine(sourceFile);

        if (['complex-type', 'resource', 'logical', 'nested'].includes(schema.identifier.kind)) {
            this.generateDependenciesImports(sourceFile, schema);
            Decl.blankLine(sourceFile);
            this.generateNestedTypes(sourceFile, schema);
            this.generateType(sourceFile, schema);
        } else if (schema.identifier.kind === 'constraint') {
            this.generateProfile(sourceFile, schema);
        }

        sourceFile.saveSync();
    }

    /**
     * Generate index file for a package
     */
    generateIndexFile(schemas: TypeSchema[]): void {
        const filePath = path.join(this.getCurrentDir(), 'index.ts');
        const sourceFile = this.project.createSourceFile(filePath, '', { overwrite: true });

        let exports = schemas
            .map(schema => ({
                identifier: schema.identifier,
                fileName: fileNameStem(schema.identifier),
                name: resourceName(schema.identifier),
            }))
            .sort((a, b) => a.name.localeCompare(b.name));

        // Remove duplicates
        exports = Array.from(
            new Map(exports.map(exp => [exp.name.toLowerCase(), exp])).values(),
        ).sort((a, b) => a.name.localeCompare(b.name));

        // Add imports and exports
        for (const exp of exports) {
            Decl.import(sourceFile, `./${exp.fileName}`, [exp.name]);
        }

        Decl.export(sourceFile, exports.map(e => e.name));
        Decl.blankLine(sourceFile);

        // Add ResourceTypeMap
        const typeMapProperties = [
            { name: 'User', type: 'Record<string, any>' },
            ...exports.map(exp => ({ name: exp.name, type: exp.name })),
        ];

        Decl.typeAlias(
            sourceFile,
            'ResourceTypeMap',
            Type.object(typeMapProperties.map(p => ({ name: p.name, type: p.type }))),
        );

        Decl.typeAlias(sourceFile, 'ResourceType', Type.keyof('ResourceTypeMap'));

        // Add resource list
        const resourceListValues = exports.map(exp => Expr.string(exp.name));
        Decl.const(
            sourceFile,
            'resourceList',
            Expr.array(resourceListValues) + ' as const',
            { type: 'readonly ResourceType[]' },
        );

        sourceFile.saveSync();
    }

    /**
     * Main generate method
     */
    generate(): void {
        const typesOnly = (this.opts as TypeScriptASTGeneratorOptions).typesOnly || false;
        const typePath = typesOnly ? '' : 'types';

        const typesToGenerate = [
            ...this.loader.complexTypes(),
            ...this.loader.resources(),
            ...this.loader.logicalModels(),
            ...(this.opts.profile ? this.loader.profiles() : []),
        ].sort((a, b) => a.identifier.name.localeCompare(b.identifier.name));

        this.dir(typePath, () => {
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

export type { TypeScriptASTGeneratorOptions };

export function createGenerator(options: TypeScriptASTGeneratorOptions) {
    return new TypeScriptASTGenerator(options);
}
