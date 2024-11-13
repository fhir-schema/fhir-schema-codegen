export type TypeRefType = 'resource' | 'profile' | 'logical' | 'complex-type' | 'primitive-type' | 'nested' | 'valueset' | 'choice' | 'unknown';

export interface TypeRef {
    name: string;
    package: string;
    parent?: string;
    type?: TypeRefType;
    url?: string;
}

export interface ClassField {
    required?: boolean;
    type: TypeRef;
    array?: boolean;
    choiceOf?: string;
    choices?: string[];
    binding?: {
        valueSet?: TypeRef;
        strength?: 'required' | 'extensible' | 'preferred' | 'example';
    };
}

export interface ChoiceField {
    required?: boolean;
    choices?: string[];
}


export interface ITypeSchema {
    kind: TypeRefType;
    name: TypeRef;
    base?: TypeRef;
    fields?:  { [key: string]: ClassField };
    choices?: { [key: string]: ChoiceField };
    allDependencies?: TypeRef[];
    nestedTypes?: ITypeSchema[];
}

export class TypeSchema  {
    private depsIdx: { [key: string]: boolean };

    kind: TypeRefType;
    name: TypeRef;
    base?: TypeRef;
    allDependencies?: TypeRef[];
    nestedTypes?: TypeSchema[];
    fields?: { [key: string]: ClassField };
    choices?: { [key: string]: ChoiceField };

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

