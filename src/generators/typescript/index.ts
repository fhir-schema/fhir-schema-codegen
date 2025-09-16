import { assert } from 'node:console';
import path from 'node:path';
import * as profile from '../../profile';
import { type ClassField, type NestedTypeSchema, type TypeRef, TypeSchema } from '../../typeschema';
import { canonicalToName, groupedByPackage, kebabCase, pascalCase } from '../../utils/code';
import { Generator, type GeneratorOptions } from '../generator';
import { type Relative, resourceRelatives, resourceChildren } from '../helper';

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
    resourceRelatives: Relative[] = [];

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

            if (schema.identifier.kind === 'resource') {
                this.lineSM(
                    `resourceType: '${schema.identifier.name}' ${resourceChildren(
                        this.resourceRelatives,
                        schema.identifier,
                    )
                        .map((e) => `| '${e.name}'`)
                        .join(' ')}`,
                );
                this.line();
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
            this.lineSM(`__profileUrl: '${schema.identifier.url}'`);
            this.line();

            for (const [fieldName, field] of Object.entries(schema.fields ?? {})) {
                this.debugComment(JSON.stringify(field, null, 2));

                if ('choices' in field) continue;

                const tsName = this.getFieldName(fieldName);
                let tsType: string;
                if (field.type.kind === 'nested') {
                    tsType = this.deriveNestedSchemaName(field.type.url, true);
                } else if (field.enum) {
                    tsType = field.enum.map((e) => `'${e}'`).join(' | ');
                } else if (field.reference?.length) {
                    const specializationId = profile.findSpecialization(
                        this.loader,
                        schema.identifier,
                    );
                    const sField = this.loader.resolveTypeIdentifier(specializationId)?.fields?.[
                        fieldName
                    ] ?? { reference: [] };
                    const sRefs = (sField.reference ?? []).map((e) => e.name);
                    const references = field.reference
                        .map((ref) => {
                            const resRef = profile.findSpecialization(this.loader, ref);
                            if (resRef.name !== ref.name) {
                                return `'${resRef.name}'/*${ref.name}*/`;
                            }
                            return `'${ref.name}'`;
                        })
                        .join(' | ');
                    if (
                        sRefs.length === 1 &&
                        sRefs[0] === 'Resource' &&
                        references !== "'Resource'"
                    ) {
                        // FIXME: should be generilized to type families
                        tsType = `Reference<'Resource' /* ${references} */ >`;
                    } else {
                        tsType = `Reference<${references}>`;
                    }
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

    generateAttachProfile(flatProfile: TypeSchema) {
        if (flatProfile.base === undefined) {
            throw new Error(
                'Profile must have a base type to generate profile-to-resource mapping:' +
                    JSON.stringify(flatProfile.identifier),
            );
        }
        const resName = resourceName(flatProfile.base);
        const profName = resourceName(flatProfile.identifier);
        const profileFields = Object.entries(flatProfile.fields || {})
            .filter(([_fieldName, field]) => {
                return field && field.type !== undefined;
            })
            .map(([fieldName]) => fieldName);

        this.curlyBlock(
            [
                `export const attach_${profName} =`,
                `(resource: ${resName}, profile: ${profName}): ${resName}`,
                '=>',
            ],
            () => {
                this.curlyBlock(['return'], () => {
                    this.line('...resource,');
                    // FIXME: don't rewrite all profiles
                    this.curlyBlock(['meta:'], () => {
                        this.line(`profile: ['${flatProfile.identifier.url}']`);
                    }, [',']);
                    profileFields.forEach((fieldName) => {
                        this.line(`${fieldName}:`, `profile.${fieldName},`);
                    });
                });
            },
        );
    }

    generateExtractProfile(flatProfile: TypeSchema) {
        if (flatProfile.base === undefined) {
            throw new Error(
                'Profile must have a base type to generate profile-to-resource mapping:' +
                    JSON.stringify(flatProfile.identifier),
            );
        }
        const resName = resourceName(flatProfile.base);
        const profName = resourceName(flatProfile.identifier);
        const profileFields = Object.entries(flatProfile.fields || {})
            .filter(([_fieldName, field]) => {
                return field && field.type !== undefined;
            })
            .map(([fieldName]) => fieldName);
        const specialization = this.loader.resolveTypeIdentifier(
            profile.findSpecialization(this.loader, flatProfile.identifier),
        );
        if (specialization === undefined) {
            throw new Error(`Specialization not found for ${flatProfile.identifier.url}`);
        }
        const shouldCast = {};
        this.curlyBlock(
            [`export const extract_${resName} =`, `(resource: ${resName}): ${profName}`, '=>'],
            () => {
                profileFields.forEach((fieldName) => {
                    const pField = flatProfile.fields?.[fieldName];
                    const rField = specialization.fields?.[fieldName];
                    if (!pField || !rField) {
                        return;
                    }
                    if (pField.required && !rField.required) {
                        this.curlyBlock([`if (resource.${fieldName} === undefined)`], () =>
                            this.lineSM(
                                `throw new Error("'${fieldName}' is required for ${flatProfile.identifier.url}")`,
                            ),
                        );
                        this.line();
                    }

                    const pRefs = pField?.reference?.map((ref) => ref.name);
                    const rRefs = rField?.reference?.map((ref) => ref.name);
                    if (pRefs && rRefs && pRefs.length !== rRefs.length) {
                        const predName = `reference_pred_${fieldName}`;
                        this.curlyBlock(['const', predName, '=', '(ref?: Reference)', '=>'], () => {
                            this.line('return !ref');
                            this.indentBlock(() => {
                                rRefs.forEach((ref) => {
                                    this.line(`|| ref.reference?.startsWith('${ref}/')`);
                                });
                                this.line(';');
                            });
                        });
                        let cond: string = !pField?.required ? `!resource.${fieldName} || ` : '';
                        if (pField.array) {
                            cond += `resource.${fieldName}.every( (ref) => ${predName}(ref) )`;
                        } else {
                            cond += `${predName}(resource.${fieldName})`;
                        }
                        this.curlyBlock(['if (', cond, ')'], () => {
                            this.lineSM(
                                `throw new Error("'${fieldName}' has different references in profile and specialization")`,
                            );
                        });
                        this.line();
                        shouldCast[fieldName] = true;
                    }
                });
                this.curlyBlock(['return'], () => {
                    this.line(`__profileUrl: '${flatProfile.identifier.url}',`);
                    profileFields.forEach((fieldName) => {
                        if (shouldCast[fieldName]) {
                            this.line(
                                `${fieldName}:`,
                                `resource.${fieldName} as ${profName}['${fieldName}'],`,
                            );
                        } else {
                            this.line(`${fieldName}:`, `resource.${fieldName},`);
                        }
                    });
                });
            },
        );
    }

    generateProfile(schema: TypeSchema) {
        assert(schema.identifier.kind === 'constraint');
        const flatProfile = profile.flatProfile(this.loader, schema);
        this.generateDependenciesImports(flatProfile);
        this.line();
        this.generateProfileType(flatProfile);
        this.generateAttachProfile(flatProfile);
        this.line();
        this.generateExtractProfile(flatProfile);
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
        this.resourceRelatives = resourceRelatives(this.loader);

        const typesOnly = (this.opts as TypeScriptGeneratorOptions).typesOnly || false;
        const typePath = typesOnly ? '' : 'types';

        const typesToGenerate = [
            ...this.loader.complexTypes(),
            ...this.loader.resources(),
            ...this.loader.logicalModels(),
            ...(this.opts.profile ? this.loader.profiles() : []),
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
