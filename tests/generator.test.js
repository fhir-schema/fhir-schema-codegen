"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = require("../src/generator");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
console.log(__dirname);
class TestGenerator extends generator_1.Generator {
    generate() {
        this.jsonFile("package.json", {
            name: "test",
            version: "0.0.1"
        });
        this.dir("src", async () => {
            this.file("User.ts", () => {
                this.line('import * as fs from "fs";');
                this.line();
                this.curlyBlock(["class", "User"], () => {
                    this.lineSM("name", ":", "string");
                    this.lineSM("age", ":", "string");
                });
            });
        });
    }
}
describe('Generator', () => {
    let g;
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
        expect(fs.existsSync(g.filePath)).toBe(true);
        const content = g.readFile('src/User.ts');
        expect(content.trim().split('\n'))
            .toEqual([
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
