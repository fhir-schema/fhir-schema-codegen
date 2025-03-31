# FHIR Schema Codegen

[![NPM Version](https://img.shields.io/npm/v/%40fhirschema%2Fcodegen)](https://www.npmjs.com/package/%40fhirschema%2Fcodegen)

[![Tests](https://github.com/fhir-schema/fhir-schema-codegen/actions/workflows/tests.yml/badge.svg)](https://github.com/fhir-schema/fhir-schema-codegen/actions/workflows/tests.yml)

Library to generate SDK from FHIR Schema.
This is a very early stage of the library.
But it will progress quickly. Join the community - [FHIR Chat](https://chat.fhir.org/#narrow/channel/391879-FHIR-Schema)

## Installation

```bash
# Install globally
npm install -g @fhirschema/codegen

# Or use with npx
npx @fhirschema/codegen [command] [options]
```

## Usage

The FHIR Schema Codegen provides several commands to work with FHIR schemas and generate code:

```bash
# Generate code
fscg generate -g typescript -o /tmp/fhir.r4 -f ./hl7.fhir.r4.core@4.0.1.ndjson

# List all available generators
fscg generators

# Create a custom generator template
fscg create-generator -n java -o ./my-generators
```

### Command Reference

#### `generate`

Generates code from FHIR Schema:

```bash
fscg generate -g <generator> -o <output-dir> -f <filepath...>
```

Options:

- `-g, --generator <generator>` - Generator to use (typescript, csharp, python)
- `-o, --output <directory>` - Output directory
- `-f, --files <files...>` - TypeSchema source *.ndjson files
- `--custom-generator-path <path>` - Additional path to look for custom generators

Example:

```bash
fscg generate -g typescript -o ./generated-sdk -f ./data/hl7.fhir.r4.core.ndjson
```

#### `generators`

Lists available generators:

```bash
fscg generators
```

#### `create-generator`

Creates a new custom generator template:

```bash
fscg create-generator -n <name> -o <output-directory>
```

Options:

- `-o, --output <directory>` - Output directory (default: ./fhirschema-generators)

Example:

```bash
fscg create-generator -o ./my-generators
```

> **Note:** Generator names must follow specific requirements. They cannot conflict with built-in generators (typescript, csharp, python), must use only lowercase letters, numbers, and hyphens, and cannot use reserved words. See the [Generators Registry documentation](docs/generators-registry.md) for details.

#### `packages`

Lists available packages:

```bash
fscg packages [search-term]
```

#### `package-summary`

Shows summary information about a package:

```bash
fscg package-summary -p <package>:<version>
```

#### `package dump`

Dumps a package to a directory:

```bash
fscg package dump --output=<directory> <package>:<version>
```

## Supported Generators

Currently, the following generators are supported:

### TypeScript

Generates TypeScript interfaces for FHIR resources.

Example usage:

```bash
fscg generate -g typescript -o ./ts-sdk -f ./data/hl7.fhir.r4.core.ndjson
```

### C #

Generates C# classes for FHIR resources.

Example usage:

```bash
fscg generate -g csharp -o ./csharp-sdk -f ./data/hl7.fhir.r4.core.ndjson
```

### Python

Generates Python classes for FHIR resources.

Example usage:

```bash
fscg generate -g python -o ./python-sdk -f ./data/hl7.fhir.r4.core.ndjson
```

### Custom Generators

You can create and use custom generators to support additional languages or specialized formats.

For more information on creating and using custom generators, see the [Generators Registry documentation](docs/generators-registry.md).

## Working with Generated Code

### TypeScript Example

```typescript
// Import generated models
import { Patient } from './generated-sdk/Patient';

// Create a new patient
const patient: Patient = {
  resourceType: 'Patient',
  id: '123',
  name: [
    {
      family: 'Smith',
      given: ['John']
    }
  ],
  gender: 'male',
  birthDate: '1970-01-01'
};
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
        this.curlyBlock(['export', 'interface', schema.identifier.name, base], () => {
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
                this.file(schema.identifier.name + ".ts", () => {
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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Clone the repository

   ```bash
   git clone https://github.com/fhir-schema/fhir-schema-codegen.git
   cd fhir-schema-codegen
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Build the project

   ```bash
   npm run build
   ```

4. Run tests

   ```bash
   npm test
   ```

### Creating a New Generator

To create a new generator for a language:

1. Create a new directory in `src/generators/` for your language
2. Create an `index.ts` file that exports a `createGenerator` function
3. Implement your generator by extending the base `Generator` class
4. Add your generator to the choices in the CLI in `src/cli.ts`

Alternatively, you can use the `create-generator` command to create a custom generator outside the main codebase.

## License

ISC
