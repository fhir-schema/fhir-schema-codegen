import { Generator, GeneratorOptions } from "../generator";
import { TypeSchema } from "../typeschema";

export interface TypeScriptGeneratorOptions extends GeneratorOptions {
    generateClasses?: boolean;
}

const typeMap :  Record<string, string> = {
    'boolean': 'boolean',
    'integer': 'number',
    'decimal': 'number',
    'positiveInt': 'number',
    'number': 'number'
    // 'instant': 'date',
    // 'dateTime': 'date',
    // 'date': 'date'
}

export class TypeScriptGenerator extends Generator {
    constructor(opts: TypeScriptGeneratorOptions) {
        super(opts);
    }
    generateType(schema: TypeSchema) {
        let base = schema.base ? 'extends ' + schema.base.name : '';
        this.curlyBlock(['export', 'interface', schema.name.name, base], () => {
            if (schema.fields) {
                for (const [fieldName, field] of Object.entries(schema.fields).sort((a, b) => a[0].localeCompare(b[0]))) {
                    let tp = field.type.name;
                    let type = tp;
                    let fieldSymbol = fieldName;
                    if (!field.required) {
                        fieldSymbol += '?';
                    }
                    if (field.type.type == 'primitive-type') {
                        type = typeMap[tp] || 'string'
                    } else {
                        type = field.type.name;
                    }
                    this.lineSM(fieldSymbol, ':', type + (field.array ? '[]' : ''));
                }
            }
        });
        this.line();
    }
    generate() {
        this.dir('src', async () => {
            this.file('types.ts', () => {
                for (let schema of this.loader.complexTypes()) {
                    this.generateType(schema);
                }
            });

            for (let schema of this.loader.resources()) {
                this.file(schema.name.name + ".ts", () => {
                    if (schema.allDependencies) {
                        for (let dep of schema.allDependencies.filter(d => d.type == 'complex-type')) {
                            this.lineSM('import', '{', dep.name, '}', 'from', '"./types.ts"');
                        }

                        for (let dep of schema.allDependencies.filter(d => d.type == 'resource')) {
                            this.lineSM('import', '{', dep.name, '}', 'from', '"./' + dep.name + '.ts"');
                        }
                    }

                    this.line();

                    if (schema.nestedTypes) {
                        for (let subtype of schema.nestedTypes) {
                            this.generateType(subtype);
                        }
                    }
                    this.line();

                    this.generateType(schema);
                });
            }
        })
    }
}   