export interface TypeRef {
    name: string;
    package: string;
}

export interface ClassElement {
    type: TypeRef;
    array?: boolean;
}

export interface TypeSchema {
    kind: 'resource' | 'complex-type' | 'primitive';
    name: string;
    package: string;
    base?: TypeRef;
    nestedClasses?: TypeSchema[];
    elements?: { [key: string]: ClassElement };
}
