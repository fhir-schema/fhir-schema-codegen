export interface TypeRef {
    name: string;
    package: string;
    parent?: string;
}

export interface ClassField {
    type: TypeRef;
    array?: boolean;
}

export interface ITypeSchema {
    kind: 'resource' | 'complex-type' | 'primitive' | 'nested';
    name: TypeRef;
    base?: TypeRef;
    fields?: { [key: string]: ClassField };
    allDependencies?: TypeRef[];
    nestedTypes?: ITypeSchema[];
}

export class TypeSchema  {
    private depsIdx: { [key: string]: boolean };

    kind: 'resource' | 'complex-type' | 'primitive' | 'nested';
    name: TypeRef;
    base?: TypeRef;
    allDependencies?: TypeRef[];
    nestedTypes?: TypeSchema[];
    fields?: { [key: string]: ClassField };

    constructor(schema: ITypeSchema) {
        this.depsIdx = {};
        this.kind = schema.kind;
        this.name = schema.name;
        this.base = schema.base;
    }

    ensureDep(typeref: TypeRef) {
        let typekey = typeref.package + "/" + typeref.name;
        if(!this.depsIdx[typekey]) {
            this.allDependencies = this.allDependencies || [];
            this.allDependencies.push(typeref);
            this.depsIdx[typekey] = true;
        }
    }
}   

