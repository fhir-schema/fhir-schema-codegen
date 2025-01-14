import { assert } from "console";
import type { FHIRSchema, FHIRSchemaBase, FHIRSchemaElement } from "./fhirschema";
import type { ClassField, TypeRef } from "./typeschema";
import { TypeRefType, TypeSchema } from "./typeschema";
import fs from 'fs/promises';

export { type FHIRSchema } from "./fhirschema";
export { type ITypeSchema } from "./typeschema";

import { Readable } from 'stream';
import { createInterface } from 'readline';

export async function read_ndjson_gz(url: string, process: (line: any) => any): Promise<void> {
    let result: any[] = [];
    return new Promise((resolve, reject) => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const stream = Readable.fromWeb(response.body!);

                const rl = createInterface({
                    input: stream,
                    crlfDelay: Infinity
                });

                rl.on('line', (line) => {
                    const json = JSON.parse(line);
                    let res = process(json);
                    if(res) {
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

function isUpcased(str: string): boolean {
    return str && str[0] === str[0].toUpperCase() || false;
}   

function convertField( dest: TypeSchema, root: FHIRSchema, typeschema: TypeSchema, path: string[], fieldName: string, field: FHIRSchemaElement, node: FHIRSchemaBase): void {
    if(field.choices) {
        dest.choices ||= {};
        dest.choices[fieldName] = {
            choices: field.choices
        };
        return;
    }
    let typename;
    let parent = null;
    let type: TypeRefType | undefined = undefined;
    if(field.elements) {
        typename = path.join('')
        parent = root.name;
        type = 'nested';

        let pkgname = root.meta?.package?.url || '';
        let nestedschema = new TypeSchema({
            kind: 'nested',
            name: {
                name: typename,
                package: pkgname,
                parent: root.name
            },
            base: {
                name: "BackboneElement",
                package: pkgname
            }
        });
        typeschema.ensureDep({ name: "BackboneElement", package: pkgname, type: 'complex-type' });
        addFields(nestedschema, root, typeschema, [...path], field);
        typeschema.nestedTypes ||= [];
        typeschema.nestedTypes.push(nestedschema);
    } else if(field.choices) {
        typename = 'choice'
        type = 'choice';
    } else if(field.type) {
        typename = field.type;
        if(isUpcased(typename)) { 
            type = 'complex-type';
        } else {
            type = 'primitive-type';
        }
    } else if(field.elementReference) {
        type = 'nested'
        const path = [...field.elementReference.slice(1)].filter(part => part !== 'elements');
        parent = root.name
        typename = typeschema.name.name + path.map(capCase).join('');
    } else {
        // console.log('Unknown field type: ' + JSON.stringify(field))
        typename = 'unknown';
        type = 'unknown';
    }
    let pkgname = root.meta?.package?.url || '';
    let typeref: TypeRef = {
        name: typename,
        package: pkgname,
        type: type
    };
    let typekey = typeref.package + "/" + typeref.name;

    typeschema.ensureDep(typeref);

    if(parent) {
        typeref.parent = parent;
    }

    let result: ClassField = { type: typeref};

    if(field.array) {
        result.array = true;
    }

    if(field.choiceOf) {
        result.choiceOf = field.choiceOf;
    }


    if(node.required && node.required.some(req => req === fieldName)) {
        result.required = true;
    }

    if(field.binding) {
        let binding = field.binding;
        let vsref: TypeRef = {
            name: extractBase(binding.valueSet),
            package: pkgname,
            url: binding.valueSet,
            type: 'valueset'
        };
        result.binding = {
            valueSet: vsref,
            strength: field.binding.strength    
        }
        typeschema.ensureDep(vsref);
    }

    dest.fields ||= {};
    dest.fields[fieldName] = result;
}

function addFields(dest: TypeSchema, root: FHIRSchema, typeschema: TypeSchema, path: string[], node: FHIRSchemaBase): void {
    Object.entries(node.elements || {}).forEach(([key, field]) => {
        let newPath = [...path, capCase(key)];
        convertField(dest, root, typeschema, newPath, key, field, node);
    });
}

function capCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function extractBase(url: string): string {
    return url.split('/').pop()!;
}

export function convert(schema: FHIRSchema): TypeSchema {
    let kind: TypeRefType = 'unknown';
    if (schema.kind === 'resource' && schema.derivation === 'constraint') {
        kind = 'profile';
    }  else if(schema.kind === 'resource') {
        kind = 'resource';
    } else if (schema.kind === 'complex-type') {
        kind = 'complex-type';
    } else if (schema.kind === 'primitive-type') {
        kind = 'primitive-type';
    } else if (schema.kind === 'logical') {
        kind = 'logical';
    }

    assert(kind !== 'unknown', 'Unknown schema kind: ' + schema.kind + '/' + schema.derivation + ' ' + JSON.stringify(schema));

    let pkgname = schema.meta?.package?.url || '';
    let res: TypeSchema = new TypeSchema({
        kind: kind,
        name: { name: schema.name, package: pkgname},
        derivation: schema.derivation,
    });

    if (schema.base) {
        let ref = { name: extractBase(schema.base), package: pkgname }
        res.base = ref;
        res.ensureDep({ name: ref.name, package: ref.package, type: 'resource' });
    }

    if(schema.elements) {   
        addFields(res, schema, res, [schema.name], schema);
    }

    return res;
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

    constructor(opts: LoaderOptions = { urls: [], files: [], dirs: [] } ) {
        this.opts = opts;
    }

    packageURL(pkgname: string): string {
        return `http://get-ig.org/FHIRSchema?package=${pkgname}`;
    }

    async load() {
        if(this.opts.urls) {
            for(let url of this.opts.urls) {
                await this.loadFromURL(url);
            }
        }
        if(this.opts.packages) {
            for(let pkg of this.opts.packages) {
                await this.loadPackage(pkg);
            }
        }
        if(this.opts.files) {
            for(let file of this.opts.files) {
                await this.loadFromFile(file);
            }
        }
        if(this.opts.dirs) {
            for(let dir of this.opts.dirs) {
                await this.loadFromDirectory(dir);
            }
        }
    }

    async packageLookup(text:string): Promise<void> {
        console.log('Looking up packages:', text.replace(' ', '%'));
        return read_ndjson_gz('http://get-ig.org/Package/$lookup?name=' + text.replace(' ', '%20'), (pkg) => {
            console.log('\x1b[1m* ' + pkg.name + '\x1b[0m');
            for (let version of (pkg.versions || []).reverse()) {
                console.log('  -', pkg.name + ':' + version);
            }
            return pkg;
        });
    }

    async packageSummary(pkg:string): Promise<void> {
        console.log('summary of', pkg);
        let url = 'http://get-ig.org/CanonicalResource/$summary?package=' + pkg;
        console.log('summary url', url);
        let rt = '';
        return read_ndjson_gz(url, (res) => {
            if(rt !== res.resourcetype) {
                rt = res.resourcetype;
                console.log('\x1b[1m* ' + rt + '\x1b[0m');
            }
            console.log('  -', res.url);
        });
    }


    loadNDJSONContent(text: string) {
        let lines = text.split('\n')
            .filter(line => line.trim().length > 0)
        for(let line of lines) {
            let resource = JSON.parse(line);
            let rt = resource.resourceType || ( resource['package-meta'] && 'FHIRSchema') || 'Package';
            this.canonicalResources[rt] ||= []
            this.canonicalResources[rt].push(resource);
        }
    }

    async loadPackage(pkg: string) {
        return read_ndjson_gz(this.packageURL(pkg), (resource) => {
            let rt = resource.resourceType;
            console.log('*', rt);
            this.canonicalResources[rt] ||= []
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
        return new Promise(async (resolve, reject) => {
        });
    }

    resources(): TypeSchema[] {
        return this.canonicalResources['FHIRSchema'].map((res: FHIRSchema)=>{
            return convert(res);
        }).filter((res: TypeSchema)=> res.kind === 'resource' );
    }

    profiles(): TypeSchema[] {
        return this.canonicalResources['FHIRSchema'].map((res: FHIRSchema)=>{
            return convert(res);
        }).filter((res: TypeSchema)=> res.kind === 'profile' );
    }

    primitives(): TypeSchema[] {
        return this.canonicalResources['FHIRSchema'].map((res: FHIRSchema)=>{
            return convert(res);
        }).filter((res: TypeSchema)=> res.kind === 'primitive-type' );
    }

    complexTypes(): TypeSchema[] {
        return this.canonicalResources['FHIRSchema'].map((res: FHIRSchema)=>{
            return convert(res);
        }).filter((res: TypeSchema)=> res.kind === 'complex-type' && res.base?.name !== 'Extension' );
    }

    extensions(): TypeSchema[] {
        return []
    }

    valueSets(): TypeSchema[] {
        return []
    }
}