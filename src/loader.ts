import { assert } from 'console';
import type { FHIRSchema, FHIRSchemaBase, FHIRSchemaElement } from './fhirschema';
import type { ClassField, TypeRef } from './typeschema';
import { TypeRefType, TypeSchema } from './typeschema';
import fs from 'fs/promises';

export { type FHIRSchema } from './fhirschema';
export { type ITypeSchema } from './typeschema';

import { Readable, ReadableOptions } from 'stream';
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
    urls?: string[];
    files?: string[];
    dirs?: string[];
    packages?: string[];
}

export class SchemaLoader {
    private opts: LoaderOptions;
    private canonicalResources: { [key: string]: any } = {};

    constructor(opts: LoaderOptions = { urls: [], files: [], dirs: [] }) {
        this.opts = opts;
    }

    packageURL(pkgname: string): string {
        return `http://get-ig.org/FHIRSchema?package=${pkgname}`;
    }

    async load() {
        if (this.opts.urls) {
            for (let url of this.opts.urls) {
                await this.loadFromURL(url);
            }
        }
        if (this.opts.packages) {
            for (let pkg of this.opts.packages) {
                await this.loadPackage(pkg);
            }
        }
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

    async packageLookup(text: string): Promise<void> {
        console.log('Looking up packages:', text.replace(' ', '%'));
        return read_ndjson_gz('http://get-ig.org/Package/$lookup?name=' + text.replace(' ', '%20'), (pkg) => {
            // console.log('\x1b[1m* ' + pkg.name + '\x1b[0m');
            for (let version of (pkg.versions || []).reverse()) {
                // console.log('  -', pkg.name + ':' + version);
            }
            return pkg;
        });
    }

    async packageSummary(pkg: string): Promise<void> {
        console.log('summary of', pkg);
        let url = 'http://get-ig.org/CanonicalResource/$summary?package=' + pkg;
        console.log('summary url', url);
        let rt = '';
        return read_ndjson_gz(url, (res) => {
            if (rt !== res.resourcetype) {
                rt = res.resourcetype;
                console.log('\x1b[1m* ' + rt + '\x1b[0m');
            }
            console.log('  -', res.url);
        });
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

    async loadPackage(pkg: string) {
        return read_ndjson_gz(this.packageURL(pkg), (resource) => {
            let rt = resource.resourceType;
            // console.log('*', rt);
            this.canonicalResources[rt] ||= [];
            this.canonicalResources[rt].push(resource);
        });
    }

    async loadFromURL(url: string) {
        return new Promise(async (resolve, reject) => {
            let response = await fetch(url);

            let text: string;
            if (url.endsWith('.gz')) {
                const buffer = await response.arrayBuffer();
                const decompressed = await new Response(
                    new Blob([buffer]).stream().pipeThrough(new DecompressionStream('gzip'))
                ).text();
                text = decompressed;
            } else {
                text = await response.text();
            }
            this.loadNDJSONContent(text);
            resolve(true);
        });
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
