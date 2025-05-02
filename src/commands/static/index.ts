import { Generator, type GeneratorOptions, TypeSchema } from '@fhirschema/codegen';
import path from 'node:path';

export interface CustomGeneratorOptions extends GeneratorOptions {
    // Add custom options here
}

export class CustomGenerator extends Generator {
    constructor(opts: CustomGeneratorOptions) {
        super({
            ...opts,
            staticDir: path.resolve(__dirname, '../static'),
        });
    }

    generateType(schema: TypeSchema) {
        this.line(`// Generated type for ${schema.identifier.name}`);
    }

    generate() {
        this.dir('src', async () => {
            this.file('types.txt', () => {
                this.line(`// Custom Generator`);
                this.line(`// Generated on ${new Date().toISOString()}`);
                this.line('');

                for (const schema of this.loader.complexTypes()) {
                    this.generateType(schema);
                }
            });
        });
    }
}

export function createGenerator(options: GeneratorOptions): Generator {
    return new CustomGenerator(options);
}
