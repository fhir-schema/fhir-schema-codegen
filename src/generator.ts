import * as fs from 'fs';
import * as Path from 'path';
import { SchemaLoader } from './loader';

interface GeneratorOptions {
    outputDir?: string;
}

export class Generator {

    private opts: GeneratorOptions;
    private writer: fs.WriteStream | null = null;
    private currentDir: string | null = null;
    filePath?: string;
    identLevel = 0;
    loader: SchemaLoader;

    constructor(opts: GeneratorOptions) {
        this.opts = opts;
        this.currentDir = opts.outputDir || null;
        this.loader = new SchemaLoader();
    }

    async dir(path: string, gencontent: () => void) {
        this.currentDir = Path.join(this.opts.outputDir || '', path);
        if (!fs.existsSync(this.currentDir)) {
            fs.mkdirSync(this.currentDir, { recursive: true });
        }
        await gencontent();
    }   

    async file(path: string, gencontent: () => void) {
        this.filePath = Path.join(this.currentDir || '', path);
        // console.log("writing to", this.filePath);
        this.writer = fs.createWriteStream(this.filePath);
        await gencontent();
        this.writer.end();
        await new Promise(resolve => this.writer!.end(resolve));
        // console.log("file written", fs.existsSync(this.filePath));
    }

    ensureCurrentFile() {
        if (!this.writer) {
            throw new Error("No current file");
        }
    }

    write(string: string) {
        this.ensureCurrentFile();
        this.writer?.write(string);
    }

    writeIdent() {
        this.write(' '.repeat(this.identLevel * 2));
    }

    line(...tokens: string[]) {
        this.writeIdent();
        this.write(tokens.join(' ') + '\n');
    }

    lineSM(...tokens: string[]) {
        this.writeIdent();
        this.write(tokens.join(' ') + ';\n');
    }


    curlyBlock(tokens: string[], gencontent: () => void) {
        this.write(tokens.join(' '));
        this.write(' {\n');
        this.ident();
        gencontent();
        this.deident();
        this.write('}\n');
    }

    curlBrackets(gencontent: () => void) {
        this.write('{');
        gencontent();
        this.write('}');
    }

    ident() {
        this.identLevel++;
    }

    deident() {
        this.identLevel--;
    }

    token(...tokens: string[]) {
        
    }

}