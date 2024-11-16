import { TypeScriptGenerator } from '../../src/generators/typescript';
import * as path from 'path';
jest.setTimeout(5000);

describe('TypeScript Generator', () => {
    test('should generate class with imports', async () => {
        let gen = new TypeScriptGenerator({
            outputDir: path.join(__dirname, '../../tmp/typescript'),
            loaderOptions: {
                packages: ['hl7.fhir.r4.core:4.0.1']
            }
        });

        await gen.init();
        gen.generate();

        expect(gen.readFile('src/Resource.ts').trim().split("\n").filter(line => line.trim() != '')    ).toEqual([    
            'import { Meta } from "./types.ts";',
            'export interface Resource  {',
            '  id? : string;',
            '  implicitRules? : string;',
            '  language? : string;',
            '  meta? : Meta;',
            '}'
        ])

    });
}); 