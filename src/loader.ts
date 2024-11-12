import { assert } from "console";
import type { FHIRSchema, FHIRSchemaElement } from "./fhirschema";
import type { ClassField, TypeRef } from "./typeschema";
import { TypeRefType, TypeSchema } from "./typeschema";
import fs from 'fs/promises';

export { type FHIRSchema } from "./fhirschema";
export { type ITypeSchema } from "./typeschema";


function isUpcased(str: string): boolean {
    return str && str[0] === str[0].toUpperCase() || false;
}   

function convertField(root: FHIRSchema, typeschema: TypeSchema, fieldName: string, field: FHIRSchemaElement): ClassField {
    let typename;
    let parent = null;
    let type: TypeRefType | undefined = undefined;
    if(field.elements) {
        typename = root.name + capCase(fieldName);
        parent = root.name;
        type = 'nested';
    } else {
        typename = field.type;
        if(isUpcased(typename)) { 
            type = 'complex-type';
        } else {
            type = 'primitive-type';
        }
    }
    let typeref: TypeRef = {
        name: typename,
        package: root['package-meta'].name,
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

    if(field.binding) {
        let binding = field.binding;
        let vsref: TypeRef = {
            name: extractBase(binding.valueSet),
            package: root['package-meta'].name,
            url: binding.valueSet,
            type: 'valueset'
        };
        result.binding = {
            valueSet: vsref,
            strength: field.binding.strength    
        }
        typeschema.ensureDep(vsref);
    }

    return result;
}

function extractFields(root: FHIRSchema, typeschema: TypeSchema, elements: { [key: string]: FHIRSchemaElement }): { [key: string]: ClassField } {
    return Object.entries(elements).reduce((acc: { [key: string]: ClassField }, [key, field]) => {
        acc[key] = convertField(root, typeschema, key, field);
        return acc;
    }, {});
}

function capCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function extractNestedTypes(root: FHIRSchema, typeschema: TypeSchema, elements: { [key: string]: FHIRSchemaElement}): TypeSchema[] {
    return Object.entries(elements).flatMap(([key, field]) => {
        if (field.elements) {
            let schema = new TypeSchema({
                kind: 'nested',
                name: {
                    name: root.name + capCase(key),
                    package: root['package-meta'].name,
                    parent: root.name
                },
                base: {
                    name: "BackboneElement",
                    package: root['package-meta'].name
                }
            });
            typeschema.ensureDep({ name: "BackboneElement", package: root['package-meta'].name, type: 'complex-type' });
            schema.fields = extractFields(root, typeschema, field.elements);
            return [schema];
        } else {
            return [];
        }
    }); 
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

    let res: TypeSchema = new TypeSchema({
        kind: kind,
        name: { name: schema.name, package: schema['package-meta'].name }
    });

    if (schema.base) {
        let ref = { name: extractBase(schema.base), package: schema['package-meta'].name }
        res.base = ref;
        res.ensureDep({ name: ref.name, package: ref.package, type: 'resource' });
    }

    if(schema.elements) {   
        res.nestedTypes = extractNestedTypes(schema, res, schema.elements);
        res.fields = extractFields(schema, res, schema.elements);
    }

    return res;
}

export class SchemaLoader {
    private canonicalResources: { [key: string]: any } = {};
    constructor() {}

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