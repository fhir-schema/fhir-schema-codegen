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
        for(let schema of loader.resources()) {
            await gen.file(schema.name.name + ".ts", () => {
                gen.curlyBlock(['export', 'interface', schema.name.name], ()=> {
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