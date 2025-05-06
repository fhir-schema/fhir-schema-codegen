import fs from 'node:fs/promises';
import { TypeSchema } from './typeschema';
import { logger } from './logger';

export type { ITypeSchema } from './typeschema';

import { createInterface } from 'node:readline';
import { Readable } from 'node:stream';
import type { ReadableStream } from 'node:stream/web';

export async function read_ndjson_gz(url: string, process: (line: any) => any): Promise<void> {
    const result: any[] = [];
    return new Promise((resolve, reject) => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const webStream = response.body as ReadableStream;
                const stream = Readable.fromWeb(webStream);

                const rl = createInterface({
                    input: stream,
                    crlfDelay: Number.POSITIVE_INFINITY,
                });

                rl.on('line', (line) => {
                    const json = JSON.parse(line);
                    const res = process(json);
                    if (res) {
                        result.push(res);
                    }
                });

                rl.on('error', (e) => {
                    logger.error(
                        `Error reading line: ${e instanceof Error ? e.message : String(e)}`,
                    );
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
    jsonDocuments?: string;
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
            for (const file of this.opts.files) {
                await this.loadFromFile(file);
            }
        }

        if (this.opts.jsonDocuments) {
            this.loadNDJSONContent(this.opts.jsonDocuments);
        }

        if (this.opts.dirs) {
            for (const dir of this.opts.dirs) {
                await this.loadFromDirectory(dir);
            }
        }
    }

    loadNDJSONContent(text: string) {
        const lines = text.split('\n').filter((line) => line.trim().length > 0);
        for (const line of lines) {
            const resource = JSON.parse(line);
            const rt =
                resource.resourceType || (resource['package-meta'] && 'FHIRSchema') || 'package';
            this.canonicalResources[rt] ||= [];
            this.canonicalResources[rt].push(resource);
        }
    }

    async loadFromFile(path: string) {
        let text: string;
        if (path.endsWith('.gz')) {
            const buffer = await fs.readFile(path);
            const decompressed = await new Response(
                new Blob([buffer]).stream().pipeThrough(new DecompressionStream('gzip')),
            ).text();
            text = decompressed;
        } else {
            text = await fs.readFile(path, 'utf-8');
        }
        this.loadNDJSONContent(text);
        return true;
    }

    async loadFromDirectory(path: string) {}

    resources(): TypeSchema[] {
        return this.canonicalResources.package
            .filter((res: TypeSchema) => res.identifier.kind === 'resource')
            .map((item: TypeSchema) => new TypeSchema(item));
    }

    profiles(): TypeSchema[] {
        return this.canonicalResources.package.filter(
            (res: TypeSchema) => res.identifier.kind === 'constraint',
        );
    }

    primitives(): TypeSchema[] {
        return this.canonicalResources.package.filter(
            (res: TypeSchema) => res.identifier.kind === 'primitive-type',
        );
    }

    complexTypes(): TypeSchema[] {
        return this.canonicalResources.package
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
