import * as fs from 'fs';
import * as path from 'path';
import { Generator } from '../src/generator';

class TestGenerator extends Generator {
    generate() {
        this.jsonFile("package.json", {
            name: "test",
            version: "0.0.1"
        });


        this.dir("src", async () => {
            this.file("User.ts", () => {
                this.line('import * as fs from "fs";')
                this.line()
                this.curlyBlock(["class", "User"], () => {
                    this.lineSM("name", ":", "string");
                    this.lineSM("age", ":", "string");
                })
            });
        });
    }
}

describe('Generator helpers', () => {
    let g: Generator;
    const testOutputDir = path.join(__dirname, '../tmp/test-output');

    beforeEach(() => {
        g = new TestGenerator({ outputDir: testOutputDir });
    });

    afterEach(() => {
    });

    test('words', async () => {
        expect(g.words('kebab-case')).toEqual(['kebab', 'case']);
        expect(g.words('snake-case')).toEqual(['snake', 'case']);
        expect(g.words('camelCase')).toEqual(['camel', 'Case']);
        expect(g.words('PascalCase')).toEqual(['Pascal', 'Case']);

        expect(g.words('Pas_cal-CaSe')).toEqual(['Pas', 'cal', 'Ca', 'Se']);
    });

    test('to camelCase', async () => {
        expect(g.camelCase('kebab-case')).toEqual('kebabCase');
        expect(g.camelCase('snake-case')).toEqual('snakeCase');
        expect(g.camelCase('camelCase')).toEqual('camelCase');
        expect(g.camelCase('PascalCase')).toEqual('pascalCase');

        expect(g.camelCase('Pas_cal-CaSe')).toEqual('pasCalCaSe');
    })

    test('to kebab-case', async () => {
        expect(g.kebabCase('kebab-case')).toEqual('kebab-case');
        expect(g.kebabCase('snake-case')).toEqual('snake-case');
        expect(g.kebabCase('camelCase')).toEqual('camel-case');
        expect(g.kebabCase('PascalCase')).toEqual('pascal-case');

        expect(g.kebabCase('Pas_cal-CaSe')).toEqual('pas-cal-ca-se');
    })

    test('to snake_case', async () => {
        expect(g.snakeCase('kebab-case')).toEqual('kebab_case');
        expect(g.snakeCase('snake-case')).toEqual('snake_case');
        expect(g.snakeCase('camelCase')).toEqual('camel_case');
        expect(g.snakeCase('PascalCase')).toEqual('pascal_case');

        expect(g.snakeCase('Pas_cal-CaSe')).toEqual('pas_cal_ca_se');
    })

    test('to PascalCase', async () => {
        expect(g.pascalCase('kebab-case')).toEqual('KebabCase');
        expect(g.pascalCase('snake-case')).toEqual('SnakeCase');
        expect(g.pascalCase('camelCase')).toEqual('CamelCase');
        expect(g.pascalCase('PascalCase')).toEqual('PascalCase');

        expect(g.pascalCase('Pas_cal-CaSe')).toEqual('PasCalCaSe');
    })

})

describe('Generator', () => {
    let g: Generator;
    const testOutputDir = path.join(__dirname, '../tmp/test-output');

    beforeEach(() => {
        g = new TestGenerator({ outputDir: testOutputDir });
    });

    afterEach(() => {
    });

    test('should generate a simple file', async () => {
        await g.init();
        g.clear();  
        g.generate();

        expect(fs.existsSync(g.filePath!)).toBe(true);

        const content = g.readFile('src/User.ts');

        expect(content.trim().split('\n'))
        .toEqual(
            [
                'import * as fs from "fs";',
                '',
                'class User {',
                '  name : string;',
                '  age : string;',
                '}'

            ]);
        
        expect(g.readFile("package.json")).toEqual(JSON.stringify({ name: "test", version: "0.0.1" }, null, 2));
    });

}); 