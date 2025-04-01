# FHIR Schema Codegen

[![NPM Version](https://img.shields.io/npm/v/%40fhirschema%2Fcodegen)](https://www.npmjs.com/package/%40fhirschema%2Fcodegen)

[![Tests](https://github.com/fhir-schema/fhir-schema-codegen/actions/workflows/tests.yml/badge.svg)](https://github.com/fhir-schema/fhir-schema-codegen/actions/workflows/tests.yml)

**Generate type-safe SDKs for TypeScript, C#, and Python directly from official FHIR specification `.ndjson` files.**

`fhir-schema-codegen` streamlines your development process, ensuring your application stays compliant with FHIR standards without the hassle of manual model maintenance.

This project is in its early stages but progressing quickly. Join the community and help shape its future! - [FHIR Chat](https://chat.fhir.org/#narrow/channel/391879-FHIR-Schema)

## Key Features

* **Multi-Language Support:** Generate code for TypeScript, C#, and Python out-of-the-box.
* **Extensible:** Easily create custom generators for other languages or specific use cases.
* **FHIR Standard Input:** Uses standard FHIR `.ndjson` schema definitions.
* **Simple CLI:** Command-line interface for generating code and managing generators.
* **Type Safety:** Produces typed models/interfaces for a better developer experience and fewer runtime errors.

## Getting Started

### Installation

```bash
# Install globally
npm install -g @fhirschema/codegen

# Or use with npx without global installation
npx @fhirschema/codegen [command] [options]
```

### Basic Usage: Generating an SDK

Use the `generate` command to create your SDK from FHIR schema files.

```bash
# Example: Generate TypeScript SDK for FHIR R4 core definitions
fscg generate \
  -g typescript \
  -o ./generated-ts-sdk \
  -f ./path/to/hl7.fhir.r4.core@4.0.1.ndjson

# You can specify multiple input files
fscg generate \
  -g csharp \
  -o ./generated-csharp-sdk \
  -f ./fhir-schemas/fhir.types.ndjson ./fhir-schemas/fhir.resources.ndjson
```

**Common Options:**

* `-g, --generator <generator>`: Generator to use (`typescript`, `csharp`, `python`, or custom).
* `-o, --output <directory>`: Output directory for generated code.
* `-f, --files <files...>`: One or more FHIR `.ndjson` schema source files.
* `--custom-generator-path <path>`: Additional path to look for custom generators (see Extending Codegen).

## Supported Languages & Usage Examples

### TypeScript

Generates TypeScript interfaces.

**Generation:**

```bash
fscg generate -g typescript -o ./ts-sdk -f ./fhir-defs.ndjson
```

**Usage Example:**

```typescript
// Import generated models (adjust path as needed)
import { Patient } from './ts-sdk/Patient'; // Resource interface
import { HumanName } from './ts-sdk/types'; // Complex type interface

// Create a new patient instance
const name: HumanName = { family: 'Smith', given: ['John'] };
const patient: Patient = {
  resourceType: 'Patient',
  id: '123',
  name: [name],
  gender: 'male',
  birthDate: '1970-01-01'
};
console.log(`Created Patient: ${patient.name?.[0]?.given?.[0]} ${patient.name?.[0]?.family}`);

// For a brief example of generated output, see:
// examples/typescript-output-example.md
```

### C\#

Generates C# classes.

**Generation:**

```bash
fscg generate -g csharp -o ./csharp-sdk -f ./fhir-defs.ndjson
```

**Usage Example:**

```csharp
// Assumes generated classes are in a namespace like 'CSharpSdk'
using CSharpSdk; // Adjust namespace based on your project setup
using System.Collections.Generic;
using System.Linq;

// Create a new patient instance
var patient = new Patient
{
    ResourceType = "Patient",
    Id = "456",
    Name = new List<HumanName>
    {
        new HumanName { Family = "Doe", Given = new List<string> { "Jane" } }
    },
    Gender = AdministrativeGender.Female, // Assumes enum generation
    BirthDate = "1985-07-22"
};
Console.WriteLine($"Created Patient: {patient.Name.FirstOrDefault()?.Given.FirstOrDefault()} {patient.Name.FirstOrDefault()?.Family}");
```

*(Note: Actual C# class/enum structure and namespaces depend on the generator implementation.)*

### Python

Generates Python classes (e.g., using Pydantic or dataclasses).

**Generation:**

```bash
fscg generate -g python -o ./python-sdk -f ./fhir-defs.ndjson
```

**Usage Example:**

```python
# Assumes generated classes are in modules like 'patient.py'
from python_sdk.patient import Patient # Adjust import path
from python_sdk.humanname import HumanName
from typing import List

# Create a new patient instance
patient_name = HumanName(family="Public", given=["John"])
patient = Patient(
    resourceType="Patient",
    id="789",
    name=[patient_name],
    gender="other",
    birthDate="1992-11-11"
)
print(f"Created Patient: {patient.name[0].given[0]} {patient.name[0].family}")

# Example: Convert to dict (if using Pydantic)
# patient_dict = patient.dict()
# print(patient_dict)
```

*(Note: Actual Python class structure, imports, and base classes depend on the generator implementation.)*

## Extending Codegen: Custom Generators

Need support for another language or a specific output format? You can create your own generator!

### Creating an External Generator

Use the `create-generator` command to scaffold a new **external** generator project. This is the recommended way for most custom generators, as it doesn't require modifying this library's codebase.

```bash
# Create template in ./my-fhir-generator
fscg create-generator -o ./my-fhir-generator
```

Follow the instructions within the generated template project to implement your logic.

**Options:**

* `-o, --output <directory>`: Output directory for the template (default: `./fhirschema-generators`).

> **Note:** Generator names must use only lowercase letters, numbers, and hyphens; cannot conflict with built-in names (`typescript`, `csharp`, `python`); and cannot use reserved words. See the [Generators Registry documentation](docs/generators-registry.md) for more details on naming and structure.

### Using an External Generator

Once your custom generator is built (typically as an NPM package), you can use it with the `generate` command by specifying its path:

```bash
# Make sure your generator is installed or linked
npm link ./my-fhir-generator

# Use it via the custom generator path
fscg generate \
  -g my-lang \
  -o ./generated-custom-sdk \
  -f ./fhir-defs.ndjson \
  --custom-generator-path ./node_modules
  # Or point directly to the generator's package root if not in node_modules
  # --custom-generator-path ./my-fhir-generator
```

### Listing Available Generators

See all registered built-in and detected external generators:

```bash
fscg generators
```

### Development Guide

For detailed instructions on implementing the logic within a custom generator (using the `Generator` base class, `TypeSchema`, etc.), please refer to:

* **[Custom Generator Development Guide](docs/creating-custom-generators.md)** (Contains detailed examples, including the TypeScript example previously shown here).

## Contributing

Contributions are welcome! Please feel free to submit bug reports, feature requests, or pull requests.

* **Issues:** [GitHub Issues](https://github.com/fhir-schema/fhir-schema-codegen/issues)
* **Community:** [FHIR Chat](https://chat.fhir.org/#narrow/channel/391879-FHIR-Schema)

### Development Setup (for contributing to this library)

1. Clone the repository:

    ```bash
    git clone https://github.com/fhir-schema/fhir-schema-codegen.git
    cd fhir-schema-codegen
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Build the project:

    ```bash
    npm run build
    ```

4. Run tests:

    ```bash
    npm test
    ```

### Adding a New *Internal* Generator

If you want to add a new generator directly to *this* library:

1. Create a new directory in `src/generators/` (e.g., `src/generators/java/`).
2. Add an `index.ts` file exporting a `createGenerator` function.
3. Implement your generator extending the base `Generator` class (see `docs/creating-custom-generators.md` for principles).
4. Register your generator's name and `createGenerator` function in `src/cli.ts`.

(For most use cases, creating an *external* generator is preferred.)

## How it Works (Overview)

1. **Load:** The tool loads FHIR Schemas (`.ndjson`).
2. **Transform:** It converts the raw [FHIR Schema](src/fhirschema.ts) into an intermediate [Type Schema](src/typeschema.ts) representation.
3. **Generate:** The selected [Generator](src/generator.ts) (e.g., [typescript.ts](src/generators/typescript.ts)) uses the Type Schema to produce code files for the target language.

## License

ISC
