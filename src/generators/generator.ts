import * as fs from 'node:fs';
import * as Path from 'node:path';
import { type LoaderOptions, SchemaLoader } from '../loader';
import type { ClassField } from '../typeschema';

/**
 * Options interface for Generator class.
 * Defines common configuration options for all generators.
 */
export interface GeneratorOptions {
    /** Path to the output directory where generated files will be saved */
    outputDir: string;
    /** Array of TypeSchema source files */
    files?: string[];
    /** Array of TypeSchema JSON */
    jsonDocuments?: string;
    /** Optional path to directory containing static files to be copied */
    staticDir?: string;
    /** Map of FHIR primitive types to target language types */
    typeMap?: Record<string, string>;
    /** Set of reserved keywords in the target language */
    keywords?: Set<string>;
    loaderOptions?: LoaderOptions;
    tabSize?: number;
    /** Generate only type definitions directly in the output directory */
    typesOnly?: boolean;
    /** Enable debug comments in generated code */
    withDebugComment?: boolean;
}

export class Generator {
    private fileDescriptor: number | null = null;
    private currentDir: string | null = null;
    protected opts: GeneratorOptions;
    filePath?: string;
    identLevel = 0;
    loader: SchemaLoader;

    constructor(opts: GeneratorOptions) {
        this.opts = opts;
        this.currentDir = opts.outputDir || null;
        this.loader = new SchemaLoader({ ...opts.loaderOptions, ...opts });
    }

    clear() {
        if (this.opts.outputDir) {
            return fs.rmSync(this.opts.outputDir, { recursive: true, force: true });
        }
    }

    readFile(path: string): string {
        return fs.readFileSync(Path.join(this.opts.outputDir || '', path), 'utf-8');
    }

    async init() {
        await this.loader.load();
    }

    generate() {
        throw Error('Implement this method in target generator type');
    }

    /** Open path related to OUTPUT_PATH, generate content, go back (don't mix with `dir`).*/
    inDir(path: string, gencontent: () => void) {
        const tmp = this.getCurrentDir();
        this.dir(path, gencontent);
        this.currentDir = tmp;
    }

    /** Open path related to currentDir, generate content, go back (don't mix with `dir`).*/
    inRelDir(path: string, gencontent: () => void) {
        const tmp = this.getCurrentDir();

        this.currentDir = Path.join(tmp, path);
        if (!fs.existsSync(this.currentDir)) {
            fs.mkdirSync(this.currentDir, { recursive: true });
        }
        gencontent();

        this.currentDir = tmp;
    }

    /** Open path related to OUTPUT_PATH, generate content. (don't mix with `inDir` and `inRelDir`).*/
    dir(path: string, gencontent: () => void) {
        this.currentDir = Path.join(this.opts.outputDir || '', path);
        if (!fs.existsSync(this.currentDir)) {
            fs.mkdirSync(this.currentDir, { recursive: true });
        }
        gencontent();
    }

    getCurrentDir() {
        return this.currentDir || this.opts.outputDir || '';
    }

    file(path: string, gencontent: () => void) {
        this.filePath = Path.join(this.currentDir || '', path);
        if (!fs.existsSync(Path.dirname(this.filePath))) {
            fs.mkdirSync(Path.dirname(this.filePath), { recursive: true });
        }
        // logger.debug(`Creating file: ${this.filePath}`);
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
        this.write(`${tokens.join(' ')}\n`);
    }

    lineSM(...tokens: string[]) {
        this.writeIdent();
        this.write(`${tokens.join(' ')};\n`);
    }

    commentSymbol() {
        return '//';
    }

    commentLine(text: string) {
        const lines = text.split('\n');
        for (const line of lines) {
            this.line(`${this.commentSymbol()} ${line}`);
        }
    }

    debugComment(text: string) {
        if (this.opts.withDebugComment) {
            this.commentLine(text);
        }
    }

    curlyBlock(tokens: Array<string | undefined>, gencontent: () => void) {
        this.write(tokens.filter(Boolean).join(' '));
        this.write(' {\n');
        this.ident();
        gencontent();
        this.deident();
        this.write('}\n');
    }

    squareBlock(tokens: string[], gencontent: () => void) {
        this.line(`${tokens.join(' ')}[`);
        this.ident();
        gencontent();
        this.deident();
        this.line(']');
    }

    indentBlock(gencontent: () => void) {
        this.ident();
        gencontent();
        this.deident();
    }

    curlBrackets(gencontent: () => void) {
        this.write('{');
        gencontent();
        this.write('}');
    }

    disclaimer() {
        return [
            'WARNING: This file is autogenerated by FHIR Schema Codegen.',
            'https://github.com/fhir-schema/fhir-schema-codegen',
            'Any manual changes made to this file may be overwritten.',
        ];
    }

    generateDisclaimer() {
        this.disclaimer().forEach((e) => this.commentLine(e));
        this.line();
    }

    copyStaticFile(
        srcPath: string,
        destPath: string,
        file: string,
        f?: (content: string) => string,
    ): void {
        let content = fs.readFileSync(Path.join(srcPath, file), 'utf-8');
        if (f && content) {
            content = f(content);
        }
        let disclaimer = this.disclaimer()
            .map((e) => `${this.commentSymbol()} ${e}`)
            .join('\n');
        disclaimer += `\n${this.commentSymbol()}`;
        disclaimer += `\n${this.commentSymbol()} Template file name: ${file}`;
        disclaimer += '\n';
        content = `${disclaimer}\n${content}`;
        fs.mkdirSync(destPath, { recursive: true });
        fs.writeFileSync(Path.join(destPath, file), content);
    }

    ident() {
        this.identLevel++;
    }

    deident() {
        this.identLevel--;
    }

    token(...tokens: string[]) {}

    getFieldName(name: string) {
        return name.replace(/-/g, '_');
    }

    getFieldType(field: ClassField): string {
        if (field.enum) {
            return field.enum.map((e) => `'${e}'`).join(' | ');
        }

        if (field.type.kind === 'nested') {
            return this.deriveNestedSchemaName(field.type.url);
        }

        if (field.type.kind === 'primitive-type') {
            const typeMap = this.opts.typeMap ?? {};
            return typeMap[field.type.name] ?? 'string';
        }

        if (field.reference?.length) {
            const references = field.reference.map((ref) => `'${ref.name}'`).join(' | ');
            return `Reference<${references}>`;
        }

        return this.uppercaseFirstLetter(field.type.name);
    }

    copyStaticFiles() {
        if (!this.opts.staticDir) {
            throw new Error('staticDir must be set in subclass.');
        }

        fs.cpSync(Path.resolve(this.opts.staticDir), this.opts.outputDir, { recursive: true });
    }

    canonicalToName(canonical: string | undefined) {
        if (!canonical) return undefined;
        return canonical.split('/').pop();
    }

    uppercaseFirstLetter(str: string): string {
        if (!str || str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    uppercaseFirstLetterOfEach(strings: string[]): string[] {
        return strings.map((str) => this.uppercaseFirstLetter(str));
    }

    deriveNestedSchemaName(url: string, includeResourceName = false): string {
        const path = this.canonicalToName(url);
        if (!path) {
            return '';
        }

        const [resourceName, rest] = path.split('#');
        const name = this.uppercaseFirstLetterOfEach((rest ?? '').split('.')).join('');
        if (includeResourceName) {
            return [resourceName, name].join('');
        }

        return name;
    }
}
