# FHIR Schema Generators Registry

The Generators Registry is a central component for managing code generators in the FHIR Schema Codegen tool. It allows the system to use both built-in generators and discover custom generators created by users.

## Overview

The registry maintains a list of available generators, both built-in and custom, and provides functionality to:

1. Load generators dynamically from the filesystem
2. Initialize generators with the appropriate options
3. Discover custom generators in specified directories
4. Create generator instances on demand
5. Validate generator names

## Built-in Generators

The FHIR Schema Codegen tool comes with the following built-in generators:

- **TypeScript** - Generates TypeScript interfaces for FHIR resources
- **C#** - Generates C# classes for FHIR resources
- **Python** - Generates Python classes for FHIR resources

## Custom Generators

Users can create their own custom generators to support additional languages or specialized formats. The FHIR Schema Codegen tool will look for custom generators in the following locations by default:

- `~/.fhirschema/generators/` - Global installation location
- `./fhirschema-generators/` - Local installation in the current directory
- `./.fhirschema/generators/` - Hidden local installation in the current directory

You can also specify additional directories using the `--custom-generator` option when running the `generate` command.

## Creating a Custom Generator

To create a new custom generator, you can use the `create-generator` command:

```bash
fscg create-generator -n java -o ./my-generators
```

This will create a new directory with a template generator implementation that you can customize for your target language.

### Naming Requirements

When creating a custom generator, the name must follow these rules:

1. **Cannot conflict with built-in generators** - The name cannot be the same as any built-in generator (typescript, csharp, python).
2. **Allowed characters** - The name must contain only lowercase letters, numbers, and hyphens.
3. **Reserved words** - The name cannot be a reserved word (node, npm, fhirschema, fhir, schema, codegen).

Examples of valid names:

- `java`
- `swift`
- `kotlin`
- `go-lang`
- `rust-fhir`

Examples of invalid names:

- `typescript` (conflicts with built-in generator)
- `Python` (contains uppercase letters)
- `fhir` (reserved word)
- `my_generator` (contains underscore)

### Generator Template Structure

The `create-generator` command creates a new directory with a template for a custom generator. The template includes:

- A package.json file with the appropriate metadata
- A TypeScript source file with a basic generator implementation
- A README.md file with usage instructions
- A tsconfig.json file for TypeScript compilation

The generated template has the following structure:

```
my-generator/
├── package.json         # Package metadata
├── tsconfig.json        # TypeScript configuration
├── README.md            # Documentation
├── src/
│   └── index.ts         # Generator implementation
└── static/              # Static files to include in generated code (optional)
```

After creating the template, you'll need to:

1. Implement the generator logic in the source file
2. Build the generator with TypeScript
3. Use the generator with the FHIR Schema Codegen tool

## Custom Generator Package Requirements

A custom generator's package.json must include:

1. The keyword `fhirschema-generator` to be recognized by the registry
2. A `name` field - typically starting with `fhirschema-generator-`
3. A `description` field explaining what the generator does
4. A `main` field pointing to the entry point (usually `dist/index.js`)
5. A `displayName` field (optional) for a more user-friendly name in listings

## Using Custom Generators

To use a custom generator, you need to:

1. Build the generator (if written in TypeScript)
2. Run the FHIR Schema Codegen tool with the `--custom-generator` option:

```bash
fscg generate -g my-generator -o ./output -f ./schema.ndjson --custom-generator ./my-generators
```

## Listing Available Generators

You can list all available generators with the `generators` command:

```bash
fscg generators
```

This will show both built-in generators and any custom generators found in the default locations.

## Generator API

Custom generators must implement the `Generator` interface by extending the base `Generator` class. The main method to implement is `generate()`, which is responsible for generating the code.

```typescript
import { Generator, GeneratorOptions, TypeSchema } from '@fhirschema/codegen;
import path from 'node:path';

export interface MyGeneratorOptions extends GeneratorOptions {
    // Add custom options here
}

export class MyGenerator extends Generator {
    constructor(opts: MyGeneratorOptions) {
        super({
            ...opts,
            staticDir: path.resolve(__dirname, '../static'),
        });
    }

    generate() {
        // Implement your generation logic here
        this.dir('src', () => {
            this.file('types.txt', () => {
                this.line(`// Generated types`);

                for (const schema of this.loader.complexTypes()) {
                    this.generateType(schema);
                }
            });
        });
    }

    generateType(schema: TypeSchema) {
        // Implement type generation logic
        this.line(`// Generated type for ${schema.identifier.name}`);
    }
}

export function createGenerator(options: GeneratorOptions): Generator {
    return new MyGenerator(options);
}
```

The generator must export a `createGenerator` function that creates an instance of the generator.

## Helper Methods

The base `Generator` class provides several helper methods for common code generation tasks:

- `dir(path, callback)` - Create a directory and execute code in its context
- `file(path, callback)` - Create a file and execute code to populate it
- `jsonFile(path, content)` - Create a JSON file with the specified content
- `line(...tokens)` - Write a line of text to the current file
- `ident()` and `deident()` - Increase/decrease indentation level
- `curlyBlock(tokens, callback)` - Create a block with curly braces
- `loader.complexTypes()` - Get all complex types from the schema
- `loader.primitiveTypes()` - Get all primitive types from the schema

## Generator Options

The `GeneratorOptions` interface defines common options that all generators should support:

```typescript
interface GeneratorOptions {
    /** Path to the output directory where generated files will be saved */
    outputDir: string;
    /** Array of TypeSchema source files */
    files?: string[];
    /** Optional path to directory containing static files to be copied */
    staticDir?: string;
    /** Map of FHIR primitive types to target language types */
    typeMap?: Record<string, string>;
    /** Set of reserved keywords in the target language */
    keywords?: Set<string>;
    /** Options for the schema loader */
    loaderOptions?: LoaderOptions;
    /** Number of spaces for indentation */
    tabSize?: number;
}
```

Custom generators can extend this interface to add additional options specific to their implementation.
