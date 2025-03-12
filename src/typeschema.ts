export type TypeRefType =
    | 'resource'
    | 'profile'
    | 'logical'
    | 'complex-type'
    | 'primitive-type'
    | 'nested'
    | 'valueset'
    | 'choice'
    | 'unknown';

export type DerivationType = 'constraint' | 'specialization';

export interface NestedSchema {
    path: string[];
    schema: ITypeSchema;
}

export interface ReferenceToNestedSchema {}

export interface TypeRef {
    name: string;
    package: string;
    base?: string;
    kind?: TypeRefType;
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
    type: TypeRef;
    base?: TypeRef;
    path?: string[];
    fields?: { [key: string]: ClassField };
    choices?: { [key: string]: ChoiceField };
    dependencies?: TypeRef[];
    nestedTypes?: ITypeSchema[];
    derivation?: DerivationType;
}

export class TypeSchema {
    private depsIdx: { [key: string]: boolean };
    type: TypeRef;
    base?: TypeRef;
    path?: string[];
    dependencies?: TypeRef[];
    nestedTypes?: TypeSchema[];
    fields?: { [key: string]: ClassField };
    choices?: { [key: string]: ChoiceField };
    derivation?: DerivationType;

    constructor(schema: ITypeSchema) {
        this.depsIdx = {};
        this.type = schema.type;
        this.base = schema.base;
        this.path = schema.path;
        this.derivation = schema.derivation;
    }

    ensureDep(typeref: TypeRef) {
        let typekey = typeref.package + '/' + typeref.name;
        if (!this.depsIdx[typekey]) {
            this.dependencies = this.dependencies || [];
            this.dependencies.push(typeref);
            this.depsIdx[typekey] = true;
        }
    }
}
