export type TypeRefType =
  | 'resource'
  | 'nested'
  | 'constraint'
  | 'logical'
  | 'complex-type'
  | 'primitive-type'
  | 'valueset'
  | 'choice'
  | 'unknown';

export interface TypeRef {
  name: string;
  package: string;
  kind: TypeRefType;
  version: string;
  url: string;
}

export interface ClassField {
  required: boolean;
  array: boolean;
  type: TypeRef;
  enum?: string[];
  choiceOf?: string;
  choices?: string[];
  reference?: TypeRef[];
  // binding?: {
  //     valueSet?: TypeRef;
  //     strength?: 'required' | 'extensible' | 'preferred' | 'example';
  // };
}

export interface ChoiceField {
  required?: boolean;
  choices?: string[];
}

export interface ITypeSchema {
  identifier: TypeRef;
  base?: TypeRef;
  fields?: { [key: string]: ClassField };
  choices?: { [key: string]: ChoiceField };
  dependencies?: TypeRef[];
  nested?: INestedTypeSchema[];
}

export interface INestedTypeSchema {
  fields: { [key: string]: ClassField };
  identifier: TypeRef;
  base: TypeRef;
}

export class TypeSchema {
  private depsIdx: { [key: string]: boolean };
  identifier: TypeRef;
  base?: TypeRef;
  dependencies?: TypeRef[];
  nested?: INestedTypeSchema[];
  fields?: { [key: string]: ClassField };
  choices?: { [key: string]: ChoiceField };

  constructor(schema: ITypeSchema) {
    this.depsIdx = {};
    this.base = schema.base;
    this.identifier = schema.identifier;
    this.dependencies = schema.dependencies;
    this.nested = schema.nested;
    this.fields = schema.fields;
    this.choices = schema.choices;
  }

  ensureDep(typeref: TypeRef) {
    const typekey = `${typeref.package}/${typeref.name}`;
    if (!this.depsIdx[typekey]) {
      this.dependencies = this.dependencies || [];
      this.dependencies.push(typeref);
      this.depsIdx[typekey] = true;
    }
  }
}
