import exp from "constants";

export interface TypeRef {
    name: string;
    package: string;
}

export interface Element {
    type: TypeRef;
    array?: boolean;
}

export interface ClassSchema {
    kind: 'resource' | 'complex-type' | 'primitive';
    name: string;
    package: string;
    base?: TypeRef;
    elements: { [key: string]: Element };
}

export interface FHIRSchema  {
}

export function schema2classes(schema: FHIRSchema): ClassSchema {
    let res: ClassSchema = {
        kind: 'resource',
        name: '',
        package: '',
        elements: {}
    };
    return res;
}