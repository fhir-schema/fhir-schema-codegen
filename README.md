# Your Project Name

[![NPM Version](https://img.shields.io/npm/v/%40fhirschema%2Fcodegen)](https://www.npmjs.com/package/%40fhirschema%2Fcodegen)   


[![Tests](https://github.com/fhir-schema/fhir-schema-codegen/actions/workflows/tests.yml/badge.svg)](https://github.com/fhir-schema/fhir-schema-codegen/actions/workflows/tests.yml)



Library to generate SDK from FHIR Schema.
This is a very early stage of the library. 
But it will progress quickly. Join the community - [FHIR Chat](https://chat.fhir.org/#narrow/channel/391879-FHIR-Schema)

## Usage

TBD

```bash
npm install -g @fhirschema/codegen

# List packages and find pakage coordinate <package>:<version>
fscg packages hl7.fhir.r4 | less

# Generate code
fscg generate -g typescript -o /tmp/fhir.r4 -p hl7.fhir.r4.core:4.0.1

# TODO: show ig content
fscg package ls hl7.fhir.r4.core:4.0.1 | less

# TODO: inspect fhir schema (type schemas as well)
fscg package dump --output=tmp hl7.fhir.r4.core:4.0.1

``` 


## How it works

1. Loader loads FHIR Schemas and Canonicals (from urls, files, directories, npm package - TBD)
2. Transform [FHIR Schema](src/fhirschema.ts) to [Type Schema](src/typeschema.ts)
3. Generator inherits from base [Generator](src/generator.ts) class and implements generate() method to produce target language code based on Type Schema (see [typescript.ts](src/generators/typescript.ts))
Generator may define additional options and use conditional generation logic.
4. Generator should be registered in CLI utility to be available in CLI.

### TypeScript Example

```ts
import { Generator, GeneratorOptions } from "../generator";
import { TypeSchema } from "../typeschema";

export interface TypeScriptGeneratorOptions extends GeneratorOptions {
    generateClasses?: boolean;
}

const typeMap :  Record<string, string> = {
    'boolean': 'boolean',
    'integer': 'number',
    'decimal': 'number',
    'positiveInt': 'number',
    'number': 'number'
}

export class TypeScriptGenerator extends Generator {
    constructor(opts: TypeScriptGeneratorOptions) {
        super(opts);
    }
    generateType(schema: TypeSchema) {
        let base = schema.base ? 'extends ' + schema.base.name : '';
        this.curlyBlock(['export', 'interface', schema.name.name, base], () => {
            if (schema.fields) {
                for (const [fieldName, field] of Object.entries(schema.fields)) {
                    let tp = field.type.name;
                    let type = tp;
                    let fieldSymbol = fieldName;
                    if (!field.required) {
                        fieldSymbol += '?';
                    }
                    if (field.type.type == 'primitive-type') {
                        type = typeMap[tp] || 'string'
                    } else {
                        type = field.type.name;
                    }
                    this.lineSM(fieldSymbol, ':', type + (field.array ? '[]' : ''));
                }
            }
        });
        this.line();
    }
    generate() {
        this.dir('src', async () => {
            this.file('types.ts', () => {
                for (let schema of this.loader.complexTypes()) {
                    this.generateType(schema);
                }
            });

            for (let schema of this.loader.resources()) {
                this.file(schema.name.name + ".ts", () => {
                    if (schema.allDependencies) {
                        for (let dep of schema.allDependencies.filter(d => d.type == 'complex-type')) {
                            this.lineSM('import', '{', dep.name, '}', 'from', '"./types.ts"');
                        }

                        for (let dep of schema.allDependencies.filter(d => d.type == 'resource')) {
                            this.lineSM('import', '{', dep.name, '}', 'from', '"./' + dep.name + '.ts"');
                        }
                    }

                    this.line();

                    if (schema.nestedTypes) {
                        for (let subtype of schema.nestedTypes) {
                            this.generateType(subtype);
                        }
                    }
                    this.line();

                    this.generateType(schema);
                });
            }
        })
    }
}   
```

This will produce something like this:

```ts
import { CodeableConcept } from "./types.ts";
import { Reference } from "./types.ts";
import { HumanName } from "./types.ts";
import { Address } from "./types.ts";
import { Identifier } from "./types.ts";
import { Attachment } from "./types.ts";
import { BackboneElement } from "./types.ts";
import { ContactPoint } from "./types.ts";
import { Period } from "./types.ts";
import { DomainResource } from "./DomainResource.ts";

export interface PatientLink extends BackboneElement {
  other : Reference;
  type : string;
}

export interface PatientCommunication extends BackboneElement {
  language : CodeableConcept;
  preferred? : boolean;
}

export interface PatientContact extends BackboneElement {
  address? : Address;
  gender? : string;
  name? : HumanName;
  organization? : Reference;
  period? : Period;
  relationship? : CodeableConcept[];
  telecom? : ContactPoint[];
}


export interface Patient extends DomainResource {
  active? : boolean;
  address? : Address[];
  birthDate? : string;
  communication? : PatientCommunication[];
  contact? : PatientContact[];
  deceasedBoolean? : boolean;
  deceasedDateTime? : string;
  gender? : string;
  generalPractitioner? : Reference[];
  identifier? : Identifier[];
  link? : PatientLink[];
  managingOrganization? : Reference;
  maritalStatus? : CodeableConcept;
  multipleBirthBoolean? : boolean;
  multipleBirthInteger? : number;
  name? : HumanName[];
  photo? : Attachment[];
  telecom? : ContactPoint[];
}


```


## TODO

* [ ] CLI
* [ ] Documentation
