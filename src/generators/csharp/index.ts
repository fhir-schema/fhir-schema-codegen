import { Generator, GeneratorOptions } from "../../generator";
import { TypeRef, TypeSchema } from "../../typeschema";

export interface CSharpScriptGeneratorOptions extends GeneratorOptions {
    generateClasses?: boolean;
}

const typeMap :  Record<string, string> = {
    boolean: "bool",
    instant: "string",
    time: "string",
    date: "string",
    dateTime: "string",
        
    decimal: "decimal",
    integer: "int",
    unsignedInt: "long",
    positiveInt: "long",
    integer64: "long",
    base64Binary: "string",
        
    uri: "string",
    url: "string",
    canonical: "string",
    oid: "string",
    uuid: "string",
        
    string: "string",
    code: "string",
    markdown: "string",
    id: "string",
    xhtml: "string",
}

export class CSharpGenerator extends Generator {
    constructor(opts: CSharpScriptGeneratorOptions) {
        super(opts);
    }

    toLangType(fhirType: TypeRef) {
        return typeMap[fhirType.name] ?? fhirType.name;
    }

    lineSM(...tokens: string[]) {
        this.writeIdent();
        this.write(tokens.filter(Boolean).join(' ') + ';\n');
    }

    curlyBlock(tokens: string[], gencontent: () => void) {
        this.write(tokens.join(' '));
        this.write('\n{\n');
        this.ident();
        gencontent();
        this.deident();
        this.write('}\n');
    }

    pascalCase(s: string) {
        // we expect that `s` arg is always in camelCase
        return [s[0].toUpperCase(), ...s.slice(1)].join('');
    }

    generateType(schema: TypeSchema) {
        let base = schema.base ? ': ' + schema.base.name : '';
        this.curlyBlock(['public', 'class', schema.name.name, base], () => {
            if (schema.fields) {
                for (const [fieldName, field] of Object.entries(schema.fields).sort((a, b) => a[0].localeCompare(b[0]))) {
                    // questionable
                    const baseNamespacePrefix = field.type.type == 'complex-type' ? 'Base.' : '';

                    const nullable = field.required ? '' : '?';
                    const required = field.required ? 'required' : '';
                    const arraySpecifier = field.array ? '[]' : '';
                    const accessors = "{ get; set; }";
                    
                    const fieldType = baseNamespacePrefix + this.toLangType(field.type) + arraySpecifier + nullable;
                    const fieldSymbol = this.pascalCase(fieldName);

                    this.lineSM('public', required, fieldType, fieldSymbol, accessors);
                }
            }

            if (schema.nestedTypes) {
                this.line()
                this.ident();
                for (let subtype of schema.nestedTypes) {
                    this.generateType(subtype);
                }
                this.deident();
            }
        });
        this.line();
    }

    generate() {
        this.dir('src', async () => {
            this.file('base.cs', () => {
                this.lineSM('namespace', 'Aidbox.FHIR.BAse');

                for (let schema of this.loader.complexTypes()) {
                    this.generateType(schema);
                }
            });

            for (let schema of this.loader.resources()) {
                this.file(schema.name.name + ".cs", () => {
                    if (schema.allDependencies) {
                        if (schema.allDependencies.filter(d => d.type == 'complex-type').length) {
                            this.lineSM('using', 'Aidbox.FHIR.Base');
                        }
                        
                        if (schema.allDependencies.filter(d => d.type == 'resource').length) {
                            this.lineSM('using', 'Aidbox.FHIR.R4.Core');
                        }
                    }

                    this.line();
                    this.lineSM('namespace', 'Aidbox.FHIR.R4.Core');
                    this.line();

                    this.generateType(schema);
                });
            }
        })
    }
}   

export const createGenerator = (options: CSharpScriptGeneratorOptions) => new CSharpGenerator(options);