# fhir-schema codegen

[![NPM Version](https://img.shields.io/npm/v/%40fhirschema%2Fcodegen)](https://www.npmjs.com/package/%40fhirschema%2Fcodegen)

[![Tests](https://github.com/fhir-schema/fhir-schema-codegen/actions/workflows/tests.yml/badge.svg)](https://github.com/fhir-schema/fhir-schema-codegen/actions/workflows/tests.yml)

Library to generate language specific models out of structure-definition, type-schema or fhir-schema. This is a very early stage of the library.
But it will progress quickly. Join the community - [FHIR Chat](https://chat.fhir.org/#narrow/channel/391879-FHIR-Schema)

## Installation

```bash
# Install globally
npm install -g @fhirschema/codegen

# Or use with npx
npx @fhirschema/codegen [command] [options]
```

## Usage

The fhir-schema codegen provides several commands to work with FHIR definitions and generate code:

```bash
# Generate code
fscg generate -g typescript -o /fhir.r4.sdk -p hl7.fhir.r4.core@4.0.1

# List all available (built in) generators
fscg generators
```

### Command Reference

#### `generate`

Generates code from core FHIR Implementation Guide:

```bash
fscg generate -g <generator> -o <output-dir> -p <fhir.package@version>
```

Options:

- `-g, --generator <generator>` - Generator to use (typescript, csharp, python)
- `-o, --output <directory>` - Output directory
- `-p, --packages <packages...>` - Available published FHIR IGs 
- `-f, --files <files...>` - TypeSchema source *.ndjson files
- `--custom-generator <path>` - Path to your custom generator template

Example:

```bash
fscg generate -g typescript -o ./fhir.r4.sdk -p hl7.fhir.r4.core@4.0.1
```

# Create a custom generator template

#### `generators`

Lists of the available generators:

```bash
fscg generators
```

#### `create-generator`

Creates a new custom generator template:

```bash
fscg create-generator -o <output-directory>
```

Options:

- `-o, --output <directory>` - Output directory (default: ./fhirschema-generators)

Example:

```bash
fscg create-generator -o ./my-generator
```

<!-- > **Note:** Generator names must follow specific requirements. They cannot conflict with built-in generators (typescript, csharp, python), must use only lowercase letters, numbers, and hyphens, and cannot use reserved words. See the [Generators Registry documentation](docs/generators-registry.md) for details.-->

## Supported Generators

The fhir-schema codegen supports multiple language generators, each providing type-safe FHIR resource handling. Below are the currently supported generators with examples and implementation details:

### TypeScript Generator

The TypeScript generator creates a fully typed SDK with interfaces for all FHIR resources. It includes:

- Type definitions for all FHIR resources and data types
- Type-safe client implementation for FHIR operations
- Proper TypeScript module structure with exports

Example implementation in [./example/typescript/](example/typescript/):
```typescript
import { Patient } from './aidbox/types/hl7-fhir-r4-core';

const patient: Patient = {
  identifier: [{ system: 'http://org.io/id', value: '0000-0000' }],
  name: [{ given: ['John'], family: 'Doe' }],
  gender: 'male',
  birthDate: '1990-01-01',
};
```

Generate TypeScript SDK:
```bash
fscg generate -g typescript -o ./ts-sdk -p hl7.fhir.r4.core@4.0.1
```

### C# Generator

The C# generator produces strongly-typed C# classes for FHIR resources with:

- C# classes for all FHIR resources and data types
- Proper namespace organization
- Serialization attributes for JSON handling

Example implementation in [./example/csharp/](example/csharp/):
```csharp
using Aidbox.FHIR.R4.Core;

var patient = new Patient
{
    Identifier = [new Identifier { System = "http://hl7.org/fhir/us/CodeSystem/identity", Value = "0000-0000" }],
    Name = [new HumanName { Given = ["John"], Family = "Doe" }],
    Gender = "male",
    BirthDate = "1990-01-01",
};
```

Generate C# SDK:
```bash
fscg generate -g csharp -o ./csharp-sdk -p hl7.fhir.r4.core@4.0.1
```

### Python Generator

The Python generator creates Python classes with:

- Python classes for FHIR resources and data types
- Type hints for better IDE support
- JSON serialization/deserialization support
- Structured authentication handling

Example implementation in [./example/python/](example/python/):
```python
from aidbox.hl7_fhir_r4_core.base import HumanName, Identifier
from aidbox.hl7_fhir_r4_core import Patient

patient = Patient(
    identifier=[Identifier(system="http://org.io/id", value="0000-0000")],
    name=[HumanName(given=["John"], family="Doe")],
    gender="male",
    birth_date="1990-01-01",
)
```

Generate Python SDK:
```bash
fscg generate -g python -o ./python-sdk -p hl7.fhir.r4.core@4.0.1
```

### Custom Generators

You can create custom generators to support additional languages or specialized formats. The generator system is extensible and allows you to:

- Create generators for new languages
- Customize the output format
- Add language-specific features

For more information on creating and using custom generators, see the [Generators Registry documentation](docs/generators-registry.md).

## How it works

1. Loader loads source package and canonicals (file or fhir package)
2. Transform it to [type-schema](https://github.com/fhir-clj/type-schema)
3. Generator inherits from base [Generator](src/generator.ts) class and implements generate() method to produce target language code based on type-schema (see [typescript.ts](https://github.com/fhir-clj/type-schema))
Generator may define additional options and use conditional generation logic.
4. Generator should be registered in CLI utility to be available in CLI.

### TypeScript Example

```ts
import { Generator, type GeneratorOptions, NestedTypeSchema, TypeSchema } from '@fhirschema/codegen';
import path from 'node:path';

export interface CustomGeneratorOptions extends GeneratorOptions {
    // Add custom options here
}

const typeMap :  Record<string, string> = {
    'boolean': 'boolean',
    'integer': 'number',
    'decimal': 'number',
    'positiveInt': 'number',
    'number': 'number'
}

export class CustomGenerator extends Generator {
    constructor(opts: CustomGeneratorOptions) {
        super({
            ...opts,
            staticDir: path.resolve(__dirname, '../static'),
        });
    }

    generateType(schema: TypeSchema | NestedTypeSchema) {
        let base = schema.base ? 'extends ' + schema.base.name : '';
        this.curlyBlock(['export', 'interface', schema.identifier.name, base], () => {
            if (schema.fields) {
                for (const [fieldName, field] of Object.entries(schema.fields)) {
                    if ('choices' in field) continue;
                    let tp = field.type.name;
                    let type = tp;
                    let fieldSymbol = fieldName;
                    if (!field.required) {
                        fieldSymbol += '?';
                    }
                    if (field.type.kind == 'primitive-type') {
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
                    if (schema.dependencies) {
                        for (let dep of schema.dependencies.filter(d => d.kind == 'complex-type')) {
                            this.lineSM('import', '{', dep.name, '}', 'from', '"./types.ts"');
                        }

                        for (let dep of schema.dependencies.filter(d => d.kind == 'resource')) {
                            this.lineSM('import', '{', dep.name, '}', 'from', '"./' + dep.name + '.ts"');
                        }
                    }

                    this.line();

                    if (schema.nested) {
                        for (let subtype of schema.nested) {
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

export function createGenerator(options: GeneratorOptions): Generator {
    return new CustomGenerator(options);
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

### Regenerating the SDK

If you need to regenerate the SDK with updated FHIR definitions:

1. Update the FHIR definitions in the source
2. Build the generator
3. Run the generation command:

```bash
cd fhir-schema-codegen

npm run build

node dist/cli.js generate --generator typescript --output ./example/typescript/aidbox  --packages hl7.fhir.r4.core@4.0.1
```
