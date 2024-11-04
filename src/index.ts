import exp from "constants";

export interface TypeRef {
    name: string;
    package: string;
}

export interface ClassElement {
    type: TypeRef;
    array?: boolean;
}

export interface Element {
    type: string;
    array?: boolean;
    elements?: { [key: string]: Element };
}

export interface ClassSchema {
    kind: 'resource' | 'complex-type' | 'primitive';
    name: string;
    package: string;
    base?: TypeRef;
    nestedClasses?: ClassSchema[];
    elements?: { [key: string]: ClassElement };
}

export interface FHIRSchema {
    kind: 'resource' | 'complex-type' | 'primitive';
    name: string;
    package: string;
    elements: { [key: string]: Element };
}

function nestedClasses(schema: FHIRSchema): ClassSchema[] {
    return [];
}

export function schema2classes(schema: FHIRSchema): ClassSchema {
    let res: ClassSchema = {
        kind: schema.kind,
        name: schema.name,
        package: schema.package,
        nestedClasses: nestedClasses(schema),
        elements: {}
    };
    return res;
}