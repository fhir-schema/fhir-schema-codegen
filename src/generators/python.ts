import { Generator, GeneratorOptions } from "../generator";
import { TypeRef, TypeSchema } from "../typeschema";

// Naming conventions
// directory naming: kebab-case
// file naming: snake_case
// function naming: snake_case
// class naming: PascalCase

export interface PythonGeneratorOptions extends GeneratorOptions {}

const typeMap :  Record<string, string> = {
    boolean: "bool",
    instant: "str",
    time: "str",
    date: "str",
    dateTime: "str",
        
    decimal: "float",
    integer: "int",
    unsignedInt: "int",
    positiveInt: "int",
    integer64: "int",
    base64Binary: "str",
        
    uri: "str",
    url: "str",
    canonical: "str",
    oid: "str",
    uuid: "str",
        
    string: "str",
    code: "str",
    markdown: "str",
    id: "str",
    xhtml: "str",
}

export class PythonGenerator extends Generator {
    constructor(opts: PythonGeneratorOptions) {
        super(opts);
    }

    toLangType(fhirType: TypeRef) {
        return typeMap[fhirType.name] ?? fhirType.name;
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
        let base = schema.base ? '(' + schema.base.name + ')' : '';
        let className = schema.name.name + base;

        this.curlyBlock(['class', className], () => {
            if (schema.fields) {
                for (const [fieldName, field] of Object.entries(schema.fields).sort((a, b) => a[0].localeCompare(b[0]))) {
                    let fieldType = this.toLangType(field.type);
                    let defaultValue = '';

                    if(!field.array) {
                        fieldType = this.wrapList(fieldType);
                    }

                    if (!field.required) {
                        fieldType = this.wrapOptional(fieldType);
                        defaultValue = '= None';
                    }

                    const fieldSymbol = this.snakeCase(fieldName) + ":";

                    this.line(fieldSymbol, fieldType, defaultValue);
                }
            } else {
                this.line('pass')
            }            
        });
    }

    generate() {
        this.dir('src', async () => {
            this.file('base.py', () => {    
                this.line('from', 'pydantic', 'import', '*');
                this.line();

                for (let schema of this.loader.complexTypes()) {
                    this.generateType(schema);
                }
            });

            for (let schema of this.loader.resources()) {
                this.file(this.snakeCase(schema.name.name) + ".py", () => {
                    this.line('from', 'pydantic', 'import', '*');
                    this.line('from', 'typing', 'import', ['Optional', 'List'].join(', '));
                    this.line('from', '.base', 'import', '*');

                    // if (schema.allDependencies) {
                    //     if (schema.allDependencies.filter(d => d.type == 'complex-type').length) {
                    //         this.lineSM('using', 'Aidbox.FHIR.Base');
                    //     }
                        
                    //     if (schema.allDependencies.filter(d => d.type == 'resource').length) {
                    //         this.lineSM('using', 'Aidbox.FHIR.R4.Core');
                    //     }
                    // }

                    this.line();
                    
                    if (schema.nestedTypes) {
                        for (let subtype of schema.nestedTypes) {
                            this.generateType(subtype);
                        }
                    }

                    this.generateType(schema);
                });
            }
        })
    }
}   