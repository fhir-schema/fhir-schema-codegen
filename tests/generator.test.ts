import * as fs from 'node:fs';
import * as path from 'node:path';
import { Generator } from '../src/generators/generator';

class TestGenerator extends Generator {
    generate() {
        this.jsonFile('package.json', {
            name: 'test',
            version: '0.0.1',
        });

        this.dir('src', async () => {
            this.file('User.ts', () => {
                this.line('import * as fs from "fs";');
                this.line();
                this.curlyBlock(['class', 'User'], () => {
                    this.lineSM('name', ':', 'string');
                    this.lineSM('age', ':', 'string');
                });
            });
        });
    }
}

describe('Generator', () => {
    let g: Generator;
    const testOutputDir = path.join(__dirname, '../tmp/test-output');

    beforeEach(() => {
        g = new TestGenerator({ outputDir: testOutputDir });
    });

    afterEach(() => {});

    test('should generate a simple file', async () => {
        await g.init();
        g.clear();
        g.generate();

        expect(fs.existsSync(g.filePath ?? '')).toBe(true);

        const content = g.readFile('src/User.ts');

        expect(content.trim().split('\n')).toEqual([
            'import * as fs from "fs";',
            '',
            'class User {',
            '    name : string;',
            '    age : string;',
            '}',
        ]);

        expect(g.readFile('package.json')).toEqual(
            JSON.stringify({ name: 'test', version: '0.0.1' }, null, 2),
        );
    });
});
