import path from 'node:path';
import { type NestedTypeSchema, type TypeRef, TypeSchema } from '../../typeschema';
import { Generator, type GeneratorOptions } from '../generator';
import * as formatHelper from './format-helper';

export interface CSharpScriptGeneratorOptions extends GeneratorOptions {
    generateClasses?: boolean;
}

const typeMap: Record<string, string> = {
    boolean: 'bool',
    instant: 'string',
    time: 'string',
    date: 'string',
    dateTime: 'string',

    decimal: 'decimal',
    integer: 'int',
    unsignedInt: 'long',
    positiveInt: 'long',
    integer64: 'long',
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

export class CSharpGenerator extends Generator {
    constructor(opts: CSharpScriptGeneratorOptions) {
        super({
            ...opts,
            typeMap,
            staticDir: path.resolve(__dirname, 'static'),
        });
    }

    toLangType(fhirType: TypeRef) {
        return typeMap[fhirType.name] ?? fhirType.name;
    }

    lineSM(...tokens: string[]) {
        this.writeIdent();
        this.write(`${tokens.filter(Boolean).join(' ')}\n`);
    }

    curlyBlock(tokens: string[], gencontent: () => void) {
        this.writeIdent();
        this.write(tokens.join(' '));
        this.write('\n');
        this.writeIdent();
        this.write('{\n');
        this.ident();
        gencontent();
        this.deident();
        this.writeIdent();
        this.write('}\n');
    }

    pascalCase(s: string) {
        // we expect that `s` arg is always in camelCase
        return [s[0].toUpperCase(), ...s.slice(1)].join('');
    }

    includeHelperMethods() {
        this.line('public override string ToString() => ');
        this.line('    JsonSerializer.Serialize(this, Aidbox.Config.JsonSerializerOptions);');
        this.line();
    }

    writeEnum(enums: Record<string, string[]>) {
        for (const name in enums) {
            this.curlyBlock(['public', 'enum', name], () =>
                enums[name].forEach((entry) =>
                    this.lineSM(formatHelper.formatEnumEntry(entry), ','),
                ),
            );
        }
    }

    generateType(schema: TypeSchema | NestedTypeSchema) {
        let name = '';

        if (schema instanceof TypeSchema) {
            name = schema.identifier.name;
        } else {
            name = this.deriveNestedSchemaName(schema.identifier.url, true);
        }

        if (name === 'Reference' || name === 'Expression') {
            name = `Resource${name}`;
        }

        const base = schema.base ? `: ${schema.base.name}` : '';
        this.curlyBlock(['public', 'class', this.uppercaseFirstLetter(name), base], () => {
            const enums: Record<string, string[]> = {};
            if (schema.fields) {
                for (const [fieldName, field] of Object.entries(schema.fields)) {
                    if ('choices' in field) continue;
                    // questionable
                    const baseNamespacePrefix = ''; // field.type.kind == 'complex-type' ? 'Base.' : '';

                    const nullable = field.required ? '' : '?';
                    const required = field.required ? 'required' : '';
                    const arraySpecifier = field.array ? '[]' : '';
                    const accessors = '{ get; set; }';

                    let t = field.type.name;

                    if (field.type.kind === 'nested') {
                        t = this.deriveNestedSchemaName(field.type.url, true);
                    }

                    if (field.type.kind === 'primitive-type') {
                        t = typeMap[field.type.name] ?? 'string';
                    }

                    if (t === 'Reference' || t === 'Expression') {
                        t = `Resource${t}`;
                    }

                    if (field.enum) {
                        const fieldName_ = formatHelper.formatName(fieldName);
                        t = `${fieldName_}Enum`;
                        enums[t] = field.enum;
                    }

                    const fieldType = baseNamespacePrefix + t + arraySpecifier + nullable;
                    const fieldSymbol = this.pascalCase(fieldName);
                    this.lineSM('public', required, fieldType, fieldSymbol, accessors);
                }
            }

            if ('nested' in schema && schema.nested) {
                this.line();
                for (const subtype of schema.nested) {
                    this.generateType(subtype);
                }
            }

            this.line();
            if (Object.keys(enums).length > 0) this.writeEnum(enums);
            this.includeHelperMethods();
        });
        this.line();
    }

    generate() {
        this.dir('hl7_fhir_r4_core', async () => {
            this.file('base.cs', () => {
                this.generateDisclaimer();

                this.lineSM('namespace', 'Aidbox.FHIR.R4.Core;');

                for (const schema of this.loader.complexTypes()) {
                    this.generateType(schema);
                }
            });

            for (const schema of this.loader.resources()) {
                this.file(`${schema.identifier.name}.cs`, () => {
                    this.generateDisclaimer();

                    // if (schema.dependencies) {
                    //     if (schema.dependencies.filter((d) => d.kind === 'complex-type').length) {
                    //         // this.lineSM('using', 'Aidbox.FHIR.R4.Core;');
                    //     }
                    //
                    //     if (schema.dependencies.filter((d) => d.kind === 'resource').length) {
                    //         // this.lineSM('using', 'Aidbox.FHIR.R4.Core;');
                    //     }
                    // }

                    this.lineSM('namespace', 'Aidbox.FHIR.R4.Core;');
                    this.line();

                    this.generateType(schema);
                });
            }
        });

        this.dir('', async () => {
            this.file('ResourceDictionary.cs', () => {
                this.generateDisclaimer();
                this.lineSM('using Aidbox.FHIR.R4.Core;');
                this.lineSM('namespace Aidbox;');
                this.lineSM('public static class ResourceDictionary');
                this.lineSM('{');
                this.lineSM('    public static readonly Dictionary<Type, string> Map = new()');
                this.lineSM('    {');
                for (const schema of this.loader.resources()) {
                    this.lineSM(
                        `        { typeof(FHIR.R4.Core.${schema.identifier.name}), "${schema.identifier.name}" },`,
                    );
                }
                this.lineSM('    };');
                this.lineSM('}');
            });
        });

        this.copyStaticFiles();
    }
}

export const createGenerator = (options: CSharpScriptGeneratorOptions) =>
    new CSharpGenerator(options);
