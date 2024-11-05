export interface TypeRef {
    name: string;
    package: string;
    parent?: string;
}

export interface ClassField {
    type: TypeRef;
    array?: boolean;
}

export interface TypeSchema {
    kind: 'resource' | 'complex-type' | 'primitive' | 'nested';
    name: TypeRef;
    base?: TypeRef;
    nestedTypes?: TypeSchema[];
    fields?: { [key: string]: ClassField };
}
