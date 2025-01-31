import * as fs from 'fs';
import * as Path from 'path';
import { SchemaLoader, type LoaderOptions } from './loader';
import { ClassField } from './typeschema';

export interface GeneratorOptions {
    outputDir: string;
    staticDir?: string;
    loaderOptions?: LoaderOptions;
    tabSize?: number;

    typeMap?: Record<string, string>;
    keywords?: Set<string>;
}

export class Generator {
    private fileDescriptor: number | null = null;
    private currentDir: string | null = null;
    private opts: GeneratorOptions;
    filePath?: string;
    identLevel = 0;
    loader: SchemaLoader;

    constructor(opts: GeneratorOptions) {
        this.opts = opts;
        this.currentDir = opts.outputDir || null;
        this.loader = new SchemaLoader(opts.loaderOptions);
    }

    clear() {
        if (this.opts.outputDir) {
            console.log('rm', this.opts.outputDir);
            return fs.rmSync(this.opts.outputDir, { recursive: true, force: true });
        }
    }

    readFile(path: string): string {
        return fs.readFileSync(Path.join(this.opts.outputDir || '', path), 'utf-8');
    }

    async init() {
        await this.loader.load();
    }

    generate() {}

    dir(path: string, gencontent: () => void) {
        this.currentDir = Path.join(this.opts.outputDir || '', path);
        if (!fs.existsSync(this.currentDir)) {
            fs.mkdirSync(this.currentDir, { recursive: true });
            console.log('mkdir', this.currentDir);
        }
        gencontent();
    }

    file(path: string, gencontent: () => void) {
        this.filePath = Path.join(this.currentDir || '', path);
        if (!fs.existsSync(Path.dirname(this.filePath))) {
            fs.mkdirSync(Path.dirname(this.filePath), { recursive: true });
            console.log('mkdir', Path.dirname(this.filePath));
        }
        console.log('file', this.filePath);
        this.fileDescriptor = fs.openSync(this.filePath, 'w');

        gencontent();

        fs.closeSync(this.fileDescriptor);
    }

    jsonFile(path: string, content: any) {
        this.file(path, () => {
            this.write(JSON.stringify(content, null, 2));
        });
    }

    ensureCurrentFile() {
        if (!this.fileDescriptor) {
            throw new Error('No current file');
        }
    }

    write(str: string) {
        this.ensureCurrentFile();
        fs.writeSync(this.fileDescriptor as number, str);
    }

    writeIdent() {
        this.write(' '.repeat(this.identLevel * (this.opts.tabSize ?? 4)));
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

    squareBlock(tokens: string[], gencontent: () => void) {
        this.line(tokens.join(' ') + '[');
        this.ident();
        gencontent()
        this.deident();
        this.line(`]`);
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

    token(...tokens: string[]) {}

    getFieldName(name: string) {
        const keywords = this.opts.keywords ?? new Set();
        if (keywords.has(name)) {
            return name + '_';
        }
        return name;
    }

    getFieldType(field: ClassField) {
        if (field.type.type === 'primitive-type') {
            const typeMap = this.opts.typeMap ?? {};
            return typeMap[field.type.name] ?? 'string';
        }

        return field.type.name;
    }

    copyStaticFiles() {
        if (!this.opts.staticDir) {
            throw new Error('staticDir must be set in subclass.');
        }

        fs.cpSync(Path.resolve(this.opts.staticDir), this.opts.outputDir, { recursive: true });
    }
}
