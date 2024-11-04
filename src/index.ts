export interface TypeRef {
    name: string;
    package: string;
}

export interface Element {
    type: TypeRef;
    array?: boolean;
}

export interface Schema {
    kind: 'resource' | 'complex-type' | 'primitive';
    name: string;
    package: string;
    base?: TypeRef;
    elements: { [key: string]: Element };
}



export function test(label: string): string {
    return label;
}