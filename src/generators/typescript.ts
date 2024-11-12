import { Generator } from "../generator";
import { TypeSchema } from "../typeschema";
import { SchemaLoader  } from "../loader";
import fs from 'fs/promises';

export interface TypeScriptGeneratorOptions {
    packageName: string;
    outputDir: string;
}

export async function generate(options: TypeScriptGeneratorOptions) {
    let loader = new SchemaLoader();
    await loader.loadFromURL("https://storage.googleapis.com/fhir-schema-registry/1.0.0/hl7.fhir.r4.core%234.0.1/package.ndjson.gz");

    let gen = new Generator(options);

    await fs.rm(options.outputDir, { recursive: true, force: true });
    await fs.mkdir(options.outputDir, { recursive: true });
    
    await gen.dir(options.outputDir, async ()=>{
        await gen.file('types.ts', () => {
            for(let schema of loader.complexTypes()) {
                let base = schema.base ?  'extends ' + schema.base.name : '';
                gen.curlyBlock(['export', 'interface', schema.name.name, base], ()=> {
                    if (schema.fields) {
                        for (const [fieldName, field] of Object.entries(schema.fields)) {
                            let type = field.type.name;
                            gen.lineSM(fieldName, ':', type + (field.array ? '[]' : ''));
                        }
                    }
                });
                gen.line();
            }
        });

        for(let schema of loader.resources()) {
            await gen.file(schema.name.name + ".ts", () => {
                if (schema.allDependencies) {
                    for (let dep of schema.allDependencies.filter(d => d.type == 'complex-type')) {
                        gen.lineSM('import', '{', dep.name, '}', 'from', '"./types.ts"');
                    }

                    for (let dep of schema.allDependencies.filter(d => d.type == 'resource')) {
                        gen.lineSM('import', '{', dep.name, '}', 'from', '"./'+ dep.name + '.ts"');
                    }
                }

                gen.line();

                if(schema.nestedTypes) {
                    for(let subtype of schema.nestedTypes ) {
                        let base = subtype.base ? 'extends ' + subtype.base.name : '';
                        gen.curlyBlock(['export', 'interface', subtype.name.name, base], () => {
                            if (subtype.fields) {
                                for (const [fieldName, field] of Object.entries(subtype.fields)) {
                                    let type = field.type.name;
                                    gen.lineSM(fieldName, ':', type + (field.array ? '[]' : ''));
                                }
                            }
                        });
                    }
                }
                gen.line();

                let base = schema.base ?  'extends ' + schema.base.name : '';
                gen.curlyBlock(['export', 'interface', schema.name.name, base], ()=> {
                    if (schema.fields) {
                        for (const [fieldName, field] of Object.entries(schema.fields)) {
                            let type = field.type.name;
                            gen.lineSM(fieldName, ':', type + (field.array ? '[]' : ''));
                        }
                    }
                });
            });
        }
    });
}