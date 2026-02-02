import { assert } from 'node:console';
import path from 'node:path';
import * as profile from '../../profile';
import { type ClassField, type NestedTypeSchema, type TypeRef, TypeSchema } from '../../typeschema';
import { canonicalToName, groupedByPackage, kebabCase, pascalCase } from '../../utils/code';
import { Generator, type GeneratorOptions } from '../generator';

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
                    .filter((dep) => ['constraint', 'complex-type-constraint'].includes(dep.kind))
                    .map((dep) => ({
                        tsPackage: `../${kebabCase(dep.package)}/${fileNameStem(dep)}`,
                        name: resourceName(dep),
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

    wrapText(text: string, maxWidth = 80, prefix = ' *'): string[] {
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = prefix;

        words.forEach((word) => {
            if ((currentLine + ' ' + word).length > maxWidth) {
                if (currentLine.length > prefix.length) {
                    lines.push(currentLine);
                    currentLine = `${prefix} ${word}`;
                } else {
                    currentLine += ` ${word}`;
                }
            } else {
                currentLine += currentLine === prefix ? ` ${word}` : ` ${word}`;
            }
        });
        if (currentLine.length > prefix.length) {
            lines.push(currentLine);
        }
        return lines;
    }

    generateFieldJsDoc(field: ClassField): void {
        const hasDoc =
            field.short ||
            field.definition ||
            field.comment ||
            field.requirements ||
            field.isModifier ||
            field.alias ||
            field.example ||
            field.meaningWhenMissing ||
            field.mustSupport === false;

        if (!hasDoc) return;

        this.line('/**');

        // 1. Summary (short)
        if (field.short) {
            this.line(' * @summary');
            this.line(` * ${field.short}`);
        }

        // 2. Description (detailed definition)
        if (field.definition) {
            this.line(' *');
            this.line(' * @description');
            const defLines = field.definition.split(/\r?\n/).filter((l) => l.trim());
            defLines.forEach((line) => {
                this.wrapText(line.trim()).forEach((wrappedLine) => {
                    this.line(wrappedLine);
                });
            });
        }

        // 3. Multiple Remarks (comment, requirements, modifier, meaningWhenMissing, mustSupport)
        if (field.comment) {
            this.line(' *');
            this.line(' * @remarks');
            this.wrapText(field.comment).forEach((line) => this.line(line));
        }

        if (field.requirements) {
            this.line(' *');
            this.line(' * @remarks Business requirement');
            this.wrapText(field.requirements).forEach((line) => this.line(line));
        }

        if (field.isModifier) {
            const reason = field.isModifierReason || 'Changes resource interpretation';
            this.line(' *');
            this.line(' * @remarks ⚠️ MODIFIER ELEMENT');
            this.wrapText(reason).forEach((line) => this.line(line));
        }

        if (field.meaningWhenMissing) {
            this.line(' *');
            this.line(' * @remarks When missing');
            this.wrapText(field.meaningWhenMissing).forEach((line) => this.line(line));
        }

        if (field.mustSupport === false) {
            this.line(' *');
            this.line(' * @remarks Limited support');
            this.line(' * This field has limited support in this profile (mustSupport: false)');
        }

        // 4. Example (show valid values)
        if (field.example) {
            this.line(' *');
            this.line(' * @example');
            if (field.example.label) {
                this.line(` * ${field.example.label}`);
            }
            this.line(' * ```typescript');
            const exampleValue =
                typeof field.example.value === 'string'
                    ? `"${field.example.value}"`
                    : JSON.stringify(field.example.value);
            this.line(` * ${exampleValue}`);
            this.line(' * ```');
        }

        // 5. Binding information (based on strength)
        if (field.bindingInfo) {
            const { strength, description, valueSet } = field.bindingInfo;

            if (strength === 'preferred' && (description || valueSet)) {
                this.line(' *');
                const text = description || '';
                const full = valueSet ? `"${text}" (${valueSet})` : `"${text}"`;
                this.line(` * @remarks Preferred: ${full}`);
            } else if (strength === 'example' && (description || valueSet)) {
                this.line(' *');
                const text = description || '';
                const full = valueSet ? `"${text}" (${valueSet})` : `"${text}"`;
                this.line(` * @example ${full}`);
            }
            // Skip 'required' (already shown via enum) and 'extensible' (can add later if needed)
        }

        // 6. Alias (localized names)
        if (field.alias && field.alias.length > 0) {
            this.line(' *');
            field.alias.forEach((alias) => {
                this.line(` * @alias ${alias}`);
            });
        }

        this.line(' */');
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

            // FIXME: comment out because require type family processing.
            // if (schema.identifier.kind === 'resource') {
            //     this.lineSM(`resourceType: '${schema.identifier.name}'`);
            //     this.line()
            // }

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

    /**
     * Detect if a schema is an Extension profile
     */
    private isExtensionProfile(schema: TypeSchema): boolean {
        return schema.base?.url === 'http://hl7.org/fhir/StructureDefinition/Extension';
    }

    /**
     * Extract constrained value[x] types from an Extension profile
     * Returns array of [fieldName, typeName] tuples for constrained value types
     *
     * Strategy: For extensions, ALL value[x] fields in the flattened profile come from
     * the base Extension type. The differential only contains the CONSTRAINED type(s).
     * We need to look at the "choices" metadata to identify which value[x] was constrained.
     *
     * Extension types:
     * 1. Simple extension with constrained value: choices array has 1-5 specific types
     * 2. Complex extension with sub-extensions: choices array has ALL 52 types (or has extension field)
     */
    private extractValueXConstraints(schema: TypeSchema): Array<[string, string]> {
        const constraints: Array<[string, string]> = [];

        if (!schema.fields) {
            return constraints;
        }

        // Check if this extension has nested sub-extensions
        const hasNestedExtensions = schema.fields['extension'] !== undefined;

        // Look for the choice field first - this tells us which types are constrained
        const valueChoice = Object.entries(schema.fields).find(
            ([fieldName, field]) => fieldName === 'value' && 'choices' in field
        );

        if (!valueChoice) {
            // No value choice field means no value constraints (nested extensions only)
            return constraints;
        }

        const [, choiceField] = valueChoice;
        if (!('choices' in choiceField) || !choiceField.choices) {
            return constraints;
        }

        // Complex extensions have nested sub-extensions and typically have ALL value[x] types
        // If choices array is very large (>10 types), it's likely a complex extension
        // In this case, return empty to use extension[] instead
        if (hasNestedExtensions && choiceField.choices.length > 10) {
            return constraints;
        }

        // The choices array contains field names (strings) of constrained value[x] variants
        for (const fieldName of choiceField.choices) {
            const field = schema.fields[fieldName];

            if (!field || 'choices' in field) {
                continue;
            }

            // Extract type name
            const typeName = field.type.kind === 'primitive-type'
                ? (primitiveType2tsType[field.type.name as keyof typeof primitiveType2tsType] ?? 'string')
                : field.type.name;

            constraints.push([fieldName, typeName]);
        }

        return constraints;
    }

    /**
     * Extract fixed URL value from an Extension profile
     * Returns the fixed URL string if present, null otherwise
     */
    private extractFixedUrl(schema: TypeSchema): string | null {
        const urlField = schema.fields?.['url'];

        if (!urlField) {
            return null;
        }

        // Fixed URL is represented as an enum with a single value
        if (urlField.enum && urlField.enum.length === 1) {
            return urlField.enum[0];
        }

        return null;
    }

    generateProfileType(schema: TypeSchema) {
        const name = resourceName(schema.identifier);

        // Generate extends clause for base type
        const parent = fmap(normalizeName)(canonicalToName(schema.base?.url));
        const extendsClause = parent && `extends ${parent}`;

        this.debugComment(schema.identifier);
        this.curlyBlock(['export', 'interface', name, extendsClause], () => {
            this.lineSM(`__profileUrl: '${schema.identifier.url}'`);
            this.line();

            for (const [fieldName, field] of Object.entries(schema.fields ?? {})) {
                this.debugComment(JSON.stringify(field, null, 2));

                if ('choices' in field) continue;

                // Generate JSDoc comment if documentation exists
                this.generateFieldJsDoc(field);

                const tsName = this.getFieldName(fieldName);
                let tsType: string;

                // Check for profile constraints first (from type-schema profileConstraints field)
                if (field.profileConstraints && field.profileConstraints.length > 0) {
                    const constraint = field.profileConstraints[0];
                    tsType = resourceName(constraint);
                } else if (field.type.kind === 'nested') {
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

    /**
     * Generate Extension profile type
     * Extensions have special handling per FHIR extensibility spec:
     * - Must extend Element (not Extension) to avoid inheriting all 55+ value[x] types
     * - value[x] uses shared ExtractExtensionValue helper from extension-values.ts
     * - Fixed URL should be typed as literal string
     * - Can have nested extensions OR value, but not both
     */
    generateExtensionProfile(schema: TypeSchema) {
        const name = resourceName(schema.identifier);
        const valueConstraints = this.extractValueXConstraints(schema);
        const fixedUrl = this.extractFixedUrl(schema);

        this.debugComment(schema.identifier);

        // Generate type alias using shared ExtractExtensionValue if there are constraints
        if (valueConstraints.length > 0) {
            const valueTypeName = `${name}Value`;
            const fieldNames = valueConstraints.map(([fieldName]) => `'${this.getFieldName(fieldName)}'`);
            const extractType = fieldNames.length === 1
                ? fieldNames[0]
                : fieldNames.join(' | ');

            this.lineSM(`export type ${valueTypeName} = ExtractExtensionValue<${extractType}>`);
            this.line();
        }

        // Generate the interface
        this.curlyBlock(['export', 'interface', name, 'extends Element'], () => {
            // Generate URL field - fixed literal type if constrained, string otherwise
            if (fixedUrl) {
                this.lineSM(`url: '${fixedUrl}'`);
            } else {
                this.lineSM(`url: string`);
            }

            // Generate value field using type alias OR extension array
            if (valueConstraints.length > 0) {
                const valueTypeName = `${name}Value`;
                this.lineSM(`value?: ${valueTypeName}`);
            } else {
                // No value constraints means this extension uses nested extensions
                // Add extension[] field to support sub-extensions
                this.lineSM(`extension?: Extension[]`);
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

        // Check if base type is a resource (has meta property)
        const isResourceProfile = flatProfile.base.kind === 'resource';

        this.curlyBlock(
            [
                `export const attach_${profName} =`,
                `(resource: ${resName}, profile: ${profName}): ${resName}`,
                '=>',
            ],
            () => {
                this.curlyBlock(['return'], () => {
                    this.line('...resource,');
                    // Only add meta for resource profiles (not complex-type profiles)
                    if (isResourceProfile) {
                        // FIXME: don't rewrite all profiles
                        this.curlyBlock(['meta:'], () => {
                            this.line(`profile: ['${flatProfile.identifier.url}']`);
                        }, [',']);
                    }
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

    /**
     * Generate imports for extension profiles
     * Uses shared ExtractExtensionValue helper from extension-values.ts
     */
    generateExtensionImports(schema: TypeSchema) {
        const valueConstraints = this.extractValueXConstraints(schema);

        // Always need Element
        const elementDep = this.loader.complexTypes().find((e) => e.identifier.name === 'Element');
        if (elementDep) {
            this.tsImportFrom(`../${kebabCase(elementDep.identifier.package)}/Element`, 'Element');
        }

        // Import Extension if this is a complex extension with nested extensions
        if (valueConstraints.length === 0) {
            const extensionDep = this.loader.complexTypes().find((e) => e.identifier.name === 'Extension');
            if (extensionDep) {
                this.tsImportFrom(`../${kebabCase(extensionDep.identifier.package)}/Extension`, 'Extension');
            }
        }

        // Import ExtractExtensionValue helper for value constraints
        if (valueConstraints.length > 0) {
            this.tsImportFrom('../../extension-values', 'ExtractExtensionValue');
        }
    }

    generateProfile(schema: TypeSchema) {
        assert(schema.identifier.kind === 'constraint' || schema.identifier.kind === 'complex-type-constraint');
        const flatProfile = profile.flatProfile(this.loader, schema);

        // Extensions have specialized generation per FHIR extensibility spec
        if (this.isExtensionProfile(flatProfile)) {
            this.generateExtensionImports(flatProfile);
            this.line();
            this.generateExtensionProfile(flatProfile);
            // Extensions don't use attach/extract helpers - they're used directly
        } else {
            this.generateDependenciesImports(flatProfile);
            this.line();
            this.generateProfileType(flatProfile);
            this.generateAttachProfile(flatProfile);
            this.line();
            this.generateExtractProfile(flatProfile);
        }
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
            } else if (
                schema.identifier.kind === 'constraint' ||
                schema.identifier.kind === 'complex-type-constraint'
            ) {
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
            this.lineSM(`export type { ${exports.map((e) => e.name).join(', ')} }`);

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
