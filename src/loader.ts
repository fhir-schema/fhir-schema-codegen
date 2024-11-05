import type { FHIRSchema, FHIRSchemaElement } from "./fhirschema";
import type { ClassField, TypeRef, TypeSchema } from "./typeschema";

export { type FHIRSchema } from "./fhirschema";
export { type TypeSchema } from "./typeschema";


function convertField(root: FHIRSchema, fieldName: string, field: FHIRSchemaElement): ClassField {
    let typename;
    let parent = null;
    if(field.elements) {
        typename = root.name + capCase(fieldName);
        parent = root.name;
    } else {
        typename = field.type;
    }
    let typeref: TypeRef = {
        name: typename,
        package: root['package-meta'].name
    };

    if(parent) {
        typeref.parent = parent;
    }

    let result: ClassField = { type: typeref};

    if(field.array) {
        result.array = true;
    }

    return result;
}

function extractFields(root: FHIRSchema, elements: { [key: string]: FHIRSchemaElement }): { [key: string]: ClassField } {
    return Object.entries(elements).reduce((acc: { [key: string]: ClassField }, [key, field]) => {
        acc[key] = convertField(root, key, field);
        return acc;
    }, {});
}

function capCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function extractNestedTypes(root: FHIRSchema, elements: { [key: string]: FHIRSchemaElement}): TypeSchema[] {
    return Object.entries(elements).flatMap(([key, field]) => {
        if (field.elements) {
            return [{
                kind: 'nested',
                name: { 
                    name: root.name + capCase(key), 
                    package: root['package-meta'].name,
                    parent: root.name
                },
                base: {
                    name: "BackboneElement",
                    package: root['package-meta'].name
                },
                fields: extractFields(root, field.elements)
            }];
        } else {
            return [];
        }
    }); 
}


export function convert(schema: FHIRSchema): TypeSchema {
    let res: TypeSchema = {
        kind: schema.kind,
        name: { name: schema.name, package: schema['package-meta'].name },
        nestedTypes: extractNestedTypes(schema, schema.elements),
        fields: extractFields(schema, schema.elements)
    };
    return res;
}

export class SchemaLoader {
    constructor(private path: string) {}

    resources(): TypeSchema[] {
        return []
    }
    profiles(): TypeSchema[] {
        return []
    }
    primitives(): TypeSchema[] {
        return []
    }
    complexTypes(): TypeSchema[] {
        return []
    }
    extensions(): TypeSchema[] {
        return []
    }
    valueSets(): TypeSchema[] {
        return []
    }
}

let loader = new SchemaLoader('./tmp/schemas');

for(let schema of loader.complexTypes()) {
    console.log(schema.name);
}

for(let schema of loader.resources()) {
    console.log(schema.name);
}

for(let schema of loader.profiles()) {
    console.log(schema.name);
}
