import { assert } from "console";
import type { FHIRSchema, FHIRSchemaBase, FHIRSchemaElement } from "./fhirschema";
import type { ClassField, TypeRef } from "./typeschema";
import { TypeRefType, TypeSchema } from "./typeschema";
import fs from 'fs/promises';

export { type FHIRSchema } from "./fhirschema";
export { type ITypeSchema } from "./typeschema";


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

        let nestedschema = new TypeSchema({
            kind: 'nested',
            name: {
                name: typename,
                package: root['package-meta'].name,
                parent: root.name
            },
            base: {
                name: "BackboneElement",
                package: root['package-meta'].name
            }
        });
        typeschema.ensureDep({ name: "BackboneElement", package: root['package-meta'].name, type: 'complex-type' });
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
        typename = typeschema.name.name + path.map(capCase).join('');
        // console.log('elementReference', typename);
    } else {
        // console.log('Unknown field type: ' + JSON.stringify(field))
        typename = 'unknown';
        type = 'unknown';
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
        addFields(res, schema, res, [schema.name], schema);
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