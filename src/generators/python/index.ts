import path from 'node:path';
import { Generator, type GeneratorOptions } from '../../generator';
import { type INestedTypeSchema, type TypeRef, TypeSchema } from '../../typeschema';
import {
  groupedByPackage,
  pascalCase,
  removeConstraints,
  snakeCase,
  sortSchemasByDeps,
} from '../../utils';

// Naming conventions
// directory naming: snake_case
// file naming: snake_case
// function naming: snake_case
// class naming: PascalCase

export type PythonGeneratorOptions = GeneratorOptions;

const typeMap: Record<string, string> = {
  boolean: 'bool',
  instant: 'str',
  time: 'str',
  date: 'str',
  dateTime: 'str',

  decimal: 'float',
  integer: 'int',
  unsignedInt: 'int',
  positiveInt: 'PositiveInt',
  integer64: 'int',
  base64Binary: 'str',

  uri: 'str',
  url: 'str',
  canonical: 'str',
  oid: 'str',
  uuid: 'str',

  string: 'str',
  code: 'str',
  markdown: 'str',
  id: 'str',
  xhtml: 'str',
};

const injectSuperClasses = (name: string) => {
  if (name === 'Resource' || name === 'Element') {
    return ['BaseModel'];
  }

  return [];
};

const pythonKeywords = new Set([
  'False',
  'None',
  'True',
  'and',
  'as',
  'assert',
  'async',
  'await',
  'break',
  'class',
  'continue',
  'def',
  'del',
  'elif',
  'else',
  'except',
  'finally',
  'for',
  'from',
  'global',
  'if',
  'import',
  'in',
  'is',
  'lambda',
  'nonlocal',
  'not',
  'or',
  'pass',
  'raise',
  'return',
  'try',
  'while',
  'with',
  'yield',
  // typings
  'List',
]);

const fixReservedWords = (name: string) => {
  if (pythonKeywords.has(name)) {
    return `${name}_`;
  }
  return name;
};

export class PythonGenerator extends Generator {
  constructor(opts: PythonGeneratorOptions) {
    super({
      ...opts,
      typeMap,
      staticDir: path.resolve(__dirname, 'static'),
    });
  }

  toLangType(fhirType: TypeRef) {
    if (typeMap[fhirType.name]) {
      return typeMap[fhirType.name];
    }
    return this.getFieldName(fhirType.name);
  }

  curlyBlock(tokens: string[], gencontent: () => void) {
    this.write(tokens.join(' '));
    this.write(':\n');
    this.ident();
    gencontent();
    this.deident();
    this.write('\n');
  }

  wrapOptional(s: string) {
    return `Optional[${s}]`;
  }

  wrapList(s: string) {
    return `L[${s}]`;
  }

  generateType(schema: TypeSchema | INestedTypeSchema) {
    let name = '';

    if (schema instanceof TypeSchema) {
      name = schema.identifier.name;
    } else {
      name = this.deriveNestedSchemaName(schema.identifier.url, true);
    }

    const superClasses = [
      ...(schema.base ? [schema.base.name] : []),
      ...injectSuperClasses(schema.identifier.name),
    ];
    const classDefinition = `class ${name}(${superClasses.join(', ')})`;


    this.curlyBlock([classDefinition], () => {
      if (!schema.fields) {
        this.line('pass');
        return;
      }

      const fields = Object.entries(schema.fields).sort((a, b) => a[0].localeCompare(b[0]));
      // this.line(`resourceType: Literal['${className}'] = '${className}'`);

      for (const [fieldName, field] of fields) {
        if ('choices' in field) continue;

        let fieldType = this.getFieldType(field);
        let defaultValue = '';

        if (field.type.kind === 'nested') {
          fieldType = this.deriveNestedSchemaName(field.type.url, true);
        }

        if (field.type.kind === 'primitive-type') {
          fieldType = typeMap[field.type.name] ?? 'str';
        }

        // return this.uppercaseFirstLetter(field.type.name);

        if (field.array) {
          fieldType = this.wrapList(fieldType);
        }

        if (!field.required) {
          fieldType = this.wrapOptional(fieldType);
          defaultValue = ' = None';
        }

        const fieldDecl = `${fixReservedWords(snakeCase(fieldName))}: ${fieldType}${defaultValue}`;
        this.line(fieldDecl);
      }
    });
  }

  defaultImports() {
    this.line('from __future__ import annotations');
    this.line('from', 'pydantic', 'import', '*');
    this.line('from', 'typing', 'import', ['Optional', 'List as L', 'Literal'].join(', '));
  }

  generateNestedTypes(schema: TypeSchema) {
    if (schema.nested) {
      this.line();
      for (const subtype of schema.nested) {
        this.generateType(subtype);
      }
    }
  }

  generateDependenciesImports(schema: TypeSchema) {
    if (schema.dependencies) {
      const complexTypesDeps = schema.dependencies.filter((deps) => deps.kind === 'complex-type');
      const resourceDeps = schema.dependencies.filter((deps) => deps.kind === 'resource');

      this.line('from', '.base', 'import', '*');

      for (const deps of resourceDeps) {
        this.line('from', `.${snakeCase(deps.name)}`, 'import', `${pascalCase(deps.name)}`);
      }
    }
  }

  // generateBaseModel() {
  //     this.curlyBlock(['class BaseModel_(BaseModel)'], async () => {
  //         this.line('pass');
  //     });
  // }

  generateBasePy(packageComplexTypes: TypeSchema[]) {
    this.file('base.py', () => {
      this.generateDisclaimer();
      this.line();
      this.defaultImports();
      this.line();

      // this.generateBaseModel();

      for (const schema of sortSchemasByDeps(removeConstraints(packageComplexTypes))) {
        this.generateNestedTypes(schema);
        this.line();
        this.generateType(schema);
      }
    });
  }

  generateResourcePackageInit(packageResources: TypeSchema[]) {
    this.file('__init__.py', () => {
      const names = removeConstraints(packageResources);

      for (const schemaName of names) {
        this.line(
          `from .${snakeCase(schemaName.identifier.name)} import ${schemaName.identifier.name}`,
        );
      }
    });
  }

  generateDisclaimer() {
    this.line('# WARNING: This file is autogenerated by FHIR Schema Codegen.');
    this.line('# https://github.com/fhir-schema/fhir-schema-codegen');
    this.line('# Any manual changes made to this file may be overwritten.');
  }

  generateResourceModule(schema: TypeSchema) {
    this.file(`${snakeCase(schema.identifier.name)}.py`, () => {
      this.generateDisclaimer();
      this.line();
      this.defaultImports();
      this.line();

      this.generateDependenciesImports(schema);
      this.line();

      this.generateNestedTypes(schema);

      this.line();
      this.generateType(schema);
    });
  }

  generate() {
    this.dir('.', async () => {
      const groupedComplexTypes = groupedByPackage(this.loader.complexTypes());
      for (const [packageName, packageComplexTypes] of Object.entries(groupedComplexTypes)) {
        this.dir(snakeCase(packageName), () => {
          this.generateBasePy(packageComplexTypes);
        });
      }

      const groupedResources = groupedByPackage(this.loader.resources());
      for (const [packageName, packageResources] of Object.entries(groupedResources)) {
        this.dir(snakeCase(packageName), () => {
          this.generateResourcePackageInit(packageResources);
          for (const schema of removeConstraints(packageResources)) {
            this.generateResourceModule(schema);
          }
        });
      }
    });

    this.copyStaticFiles();
  }
}

export const createGenerator = (options: PythonGeneratorOptions) => new PythonGenerator(options);
