import { Generator } from '../src/generator';
import * as fs from 'fs';
import * as path from 'path';

console.log(__dirname);

describe('Generator', () => {
    let g: Generator;
    const testOutputDir = path.join(__dirname, '../tmp/test-output');

    beforeEach(() => {
        if (fs.existsSync(testOutputDir)) {
            fs.rmSync(testOutputDir, { recursive: true });
        }
        fs.mkdirSync(testOutputDir, { recursive: true });
        g = new Generator({ outputDir: testOutputDir });
    });

    afterEach(() => {
    });

    test('should generate a simple file', async () => {
        await g.file("test.ts", () => {
            g.line('import * as fs from "fs";')
            g.line()
            g.curlyBlock(["class", "User"], () => {
                g.line("name", ":", "string");
                g.line("age", ":", "string");

            })
        });

        expect(fs.existsSync(g.filePath!)).toBe(true);

        const content = fs.readFileSync(g.filePath!, 'utf-8');
        console.log(content.trim().split('\n'));

        expect(content.trim().split('\n'))
        .toEqual(
            [
                'import * as fs from "fs";',
                '',
                'class User {',
                '  name : string',
                '  age : string',
                '}'
            ]);
    });

}); 