import { TypeSchema } from './typeschema';
import fs from 'fs/promises';

export { type ITypeSchema } from './typeschema';

import { Readable } from 'stream';
import { createInterface } from 'readline';
import { ReadableStream } from 'stream/web';

export async function read_ndjson_gz(url: string, process: (line: any) => any): Promise<void> {
    let result: any[] = [];
    return new Promise((resolve, reject) => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const webStream = response.body as ReadableStream;
                const stream = Readable.fromWeb(webStream);

                const rl = createInterface({
                    input: stream,
                    crlfDelay: Infinity,
                });

                rl.on('line', (line) => {
                    const json = JSON.parse(line);
                    let res = process(json);
                    if (res) {
                        result.push(res);
                    }
                });

                rl.on('error', (e) => {
                    console.error('Error reading line:', e);
                    reject(e);
                });

                rl.on('close', () => {
                    resolve();
                });
            } catch (err) {
                reject(err);
            }
        };

        fetchData();
    });
}

export interface LoaderOptions {
    files?: string[];
    dirs?: string[];
    packages?: string[];
}

export class SchemaLoader {
    private opts: LoaderOptions;
    private canonicalResources: { [key: string]: any } = {};

    constructor(opts: LoaderOptions = { files: [], dirs: [] }) {
        this.opts = opts;
    }

    packageURL(pkgname: string): string {
        return `http://get-ig.org/FHIRSchema?package=${pkgname}`;
    }

    async load() {
        if (this.opts.files) {
            for (let file of this.opts.files) {
                await this.loadFromFile(file);
            }
        }
        if (this.opts.dirs) {
            for (let dir of this.opts.dirs) {
                await this.loadFromDirectory(dir);
            }
        }
    }

    loadNDJSONContent(text: string) {
        let lines = text.split('\n').filter((line) => line.trim().length > 0);
        for (let line of lines) {
            let resource = JSON.parse(line);
            let rt = resource.resourceType || (resource['package-meta'] && 'FHIRSchema') || 'package';
            this.canonicalResources[rt] ||= [];
            this.canonicalResources[rt].push(resource);
        }
    }

    async loadFromFile(path: string) {
        return new Promise(async (resolve, reject) => {
            let text: string;
            if (path.endsWith('.gz')) {
                const buffer = await fs.readFile(path);
                const decompressed = await new Response(
                    new Blob([buffer]).stream().pipeThrough(new DecompressionStream('gzip'))
                ).text();
                text = decompressed;
            } else {
                text = await fs.readFile(path, 'utf-8');
            }
            this.loadNDJSONContent(text);
            resolve(true);
        });
    }

    async loadFromDirectory(path: string) {
        return new Promise(async (resolve, reject) => {});
    }

    resources(): TypeSchema[] {
        return this.canonicalResources['package']
            .filter((res: TypeSchema) => res.identifier.kind === 'resource')
            .map((item: TypeSchema) => new TypeSchema(item));
    }

    profiles(): TypeSchema[] {
        return this.canonicalResources['package'].filter((res: TypeSchema) => res.identifier.kind === 'constraint');
    }

    primitives(): TypeSchema[] {
        return this.canonicalResources['package'].filter((res: TypeSchema) => res.identifier.kind === 'primitive-type');
    }

    complexTypes(): TypeSchema[] {
        return this.canonicalResources['package']
            .filter(({ identifier }: TypeSchema) => identifier.kind === 'complex-type')
            .map((item: TypeSchema) => new TypeSchema(item));
    }

    extensions(): TypeSchema[] {
        return [];
    }

    valueSets(): TypeSchema[] {
        return [];
    }
}
