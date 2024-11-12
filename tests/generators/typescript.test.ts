import { generate } from '../../src/generators/typescript';
import * as fs from 'fs';
import * as path from 'path';
jest.setTimeout(5000);

describe('TypeScript Generator', () => {
    test('should generate class with imports', async () => {
        await generate({
            packageName: 'fhir.r4',
            outputDir: path.join(__dirname, '../../tmp/typescript')
        });
    });
}); 