# TypeScript AST Builders

A clean, type-safe abstraction layer for generating TypeScript code without manual string concatenation.

## Overview

This library provides composable builders for generating TypeScript code through Abstract Syntax Tree (AST) manipulation using `ts-morph`. Instead of concatenating strings, you build structured representations of code that are:

- **Type-safe** - Impossible to generate invalid TypeScript
- **Auto-formatted** - Proper indentation, spacing, and semicolons
- **Composable** - Reusable building blocks
- **Testable** - Assert on structure, not strings

## Quick Start

```typescript
import { Project } from 'ts-morph';
import { Decl, Type, Expr, Stmt } from './ast';

// Create a project and source file
const project = new Project();
const sourceFile = project.createSourceFile('example.ts');

// Add imports
Decl.import(sourceFile, './types', ['Patient', 'Observation']);

// Add interface
Decl.interface(sourceFile, {
    name: 'ContactPoint',
    extends: ['Element'],
    properties: [
        { name: 'system', type: Type.stringLiteral('phone'), optional: true },
        { name: 'value', type: 'string', optional: true },
    ]
});

// Save the file
sourceFile.saveSync();
```

## Core Modules

### 1. `Expr` - Expression Builders

Build TypeScript expressions in a composable way.

#### Literals

```typescript
Expr.string('hello')          // 'hello'
Expr.number(42)               // 42
Expr.boolean(true)            // true
Expr.undefined()              // undefined
Expr.null()                   // null
```

#### Collections

```typescript
// Arrays
Expr.array([
    Expr.string('a'),
    Expr.string('b'),
    Expr.number(3)
])
// Result: ['a', 'b', 3]

// Objects
Expr.object({
    name: Expr.string('John'),
    age: Expr.number(30)
})
// Result: { name: 'John', age: 30 }

// Objects with spread
Expr.objWithSpreads([
    Expr.spread('resource'),
    ['meta', Expr.object({
        profile: Expr.array([Expr.string('url')])
    })]
])
// Result: { ...resource, meta: { profile: ['url'] } }
```

#### Property Access & Calls

```typescript
Expr.prop('obj', 'field')               // obj.field
Expr.element('arr', Expr.number(0))     // arr[0]
Expr.call('foo', [Expr.string('arg')])  // foo('arg')
Expr.method('obj', 'fn', [])            // obj.fn()
```

#### Operations

```typescript
Expr.binary('x', '===', Expr.undefined())  // x === undefined
Expr.unary('!', 'flag')                    // !flag
Expr.ternary('x', Expr.number(1), Expr.number(2))  // x ? 1 : 2
```

#### Functions

```typescript
// Arrow function
Expr.arrow(['x', 'y'], 'x + y')
// Result: (x, y) => x + y

// Arrow with block body
Expr.arrow(['x'], ['return x * 2;'])
// Result: (x) => {
//     return x * 2;
// }
```

#### Templates

```typescript
Expr.templateString('Hello ${0}!', [Expr.id('name')])
// Result: `Hello ${name}!`

Expr.templateString('${0}/${1}', ['T', 'string'])
// Result: `${T}/${string}`
```

### 2. `Type` - Type Builders

Build TypeScript type annotations.

#### Basic Types

```typescript
Type.ref('string')              // string
Type.ref('Patient')             // Patient
Type.array('string')            // string[]
Type.array('Patient')           // Patient[]
```

#### Literal Types

```typescript
Type.stringLiteral('phone')     // 'phone'
Type.numberLiteral(42)          // 42
Type.booleanLiteral(true)       // true
```

#### Union & Intersection Types

```typescript
Type.union(['string', 'number', 'boolean'])
// Result: string | number | boolean

Type.union([
    Type.stringLiteral('phone'),
    Type.stringLiteral('email'),
    Type.stringLiteral('fax')
])
// Result: 'phone' | 'email' | 'fax'

Type.intersection(['A', 'B', 'C'])
// Result: A & B & C
```

#### Generic Types

```typescript
Type.generic('Reference', [Type.stringLiteral('Patient')])
// Result: Reference<'Patient'>

Type.generic('Array', ['string'])
// Result: Array<string>
```

#### Object Types

```typescript
Type.object([
    { name: 'id', type: 'string', optional: false },
    { name: 'name', type: 'string', optional: true },
    { name: 'count', type: 'number', readonly: true }
])
// Result: { id: string; name?: string; readonly count: number }
```

#### Template Literal Types

```typescript
Type.templateLiteralString('${0}/${1}', ['T', 'string'])
// Result: `${T}/${string}`

Type.templateLiteralString('hello-${0}', ['string'])
// Result: `hello-${string}`
```

#### Utility Types

```typescript
Type.optional('string')          // string | undefined
Type.nullable('number')          // number | null
Type.keyof('ResourceTypeMap')    // keyof ResourceTypeMap
Type.typeof('myConst')           // typeof myConst
```

### 3. `Stmt` - Statement Builders

Build TypeScript statements. These return functions that write to a CodeBlockWriter.

#### Variable Declarations

```typescript
Stmt.const('x', Expr.number(42), 'number')
// Result: const x: number = 42;

Stmt.let('y', Expr.string('hello'))
// Result: let y = 'hello';
```

#### Control Flow

```typescript
// If statement
Stmt.if(
    Expr.binary('x', '===', Expr.undefined()),
    [Stmt.throw('x is required')],
    [Stmt.const('y', 'x')]
)
// Result:
// if (x === undefined) {
//     throw new Error('x is required');
// } else {
//     const y = x;
// }
```

#### Loops

```typescript
// For loop
Stmt.for(
    'let i = 0',
    'i < 10',
    'i++',
    [Stmt.expr(Expr.call('console.log', [Expr.id('i')]))]
)

// For-of loop
Stmt.forOf('item', 'items', [
    Stmt.expr(Expr.call('process', [Expr.id('item')]))
])

// While loop
Stmt.while('condition', [
    Stmt.expr(Expr.call('work', []))
])
```

#### Try-Catch

```typescript
Stmt.tryCatch(
    [Stmt.expr(Expr.call('riskyOperation', []))],
    'error',
    [Stmt.expr(Expr.call('handleError', [Expr.id('error')]))]
)
```

#### Other Statements

```typescript
Stmt.return(Expr.boolean(true))     // return true;
Stmt.throw('Something went wrong')  // throw new Error('Something went wrong');
Stmt.expr(Expr.call('fn', []))     // fn();
Stmt.comment('TODO: implement')     // // TODO: implement
Stmt.blankLine()                    // (blank line)
```

### 4. `Decl` - Declaration Builders

Build top-level TypeScript declarations. These directly modify a SourceFile.

#### Imports

```typescript
// Named imports
Decl.import(sourceFile, './types', ['Patient', 'Observation']);
// Result: import { Patient, Observation } from './types';

// Default import
Decl.importDefault(sourceFile, 'react', 'React');
// Result: import React from 'react';

// Namespace import
Decl.importNamespace(sourceFile, 'fs', 'fs');
// Result: import * as fs from 'fs';
```

#### Interfaces

```typescript
Decl.interface(sourceFile, {
    name: 'ContactPoint',
    exported: true,
    extends: ['Element'],
    typeParameters: ['T'],
    properties: [
        {
            name: 'system',
            type: Type.union([
                Type.stringLiteral('phone'),
                Type.stringLiteral('email')
            ]),
            optional: true,
            docs: 'Communication system type'
        },
        {
            name: 'value',
            type: 'string',
            optional: true
        }
    ],
    docs: ['Contact point details']
});
// Result:
// /**
//  * Contact point details
//  */
// export interface ContactPoint<T> extends Element {
//     /**
//      * Communication system type
//      */
//     system?: 'phone' | 'email';
//     value?: string;
// }
```

#### Type Aliases

```typescript
Decl.typeAlias(
    sourceFile,
    'ResourceType',
    Type.keyof('ResourceTypeMap'),
    {
        exported: true,
        docs: ['Union of all resource type names']
    }
);
// Result:
// /**
//  * Union of all resource type names
//  */
// export type ResourceType = keyof ResourceTypeMap;
```

#### Constants

```typescript
Decl.const(
    sourceFile,
    'API_URL',
    Expr.string('https://api.example.com'),
    {
        exported: true,
        type: 'string',
        docs: ['Base API URL']
    }
);
// Result:
// /**
//  * Base API URL
//  */
// export const API_URL: string = 'https://api.example.com';
```

#### Functions

```typescript
// Arrow function
Decl.arrowFunction(sourceFile, 'attachProfile', {
    parameters: [
        { name: 'resource', type: 'Patient' },
        { name: 'profile', type: 'ProfileData' }
    ],
    returnType: 'Patient',
    body: [
        Stmt.return(
            Expr.objWithSpreads([
                Expr.spread('resource'),
                ['meta', Expr.object({
                    profile: Expr.array([Expr.string('http://example.com')])
                })]
            ])
        )
    ],
    exported: true,
    docs: ['Attach profile data to a patient resource']
});
// Result:
// /**
//  * Attach profile data to a patient resource
//  */
// export const attachProfile = (resource: Patient, profile: ProfileData): Patient => {
//     return { ...resource, meta: { profile: ['http://example.com'] } };
// };

// Regular function
Decl.function(sourceFile, 'validate', {
    parameters: [
        { name: 'value', type: 'string | undefined' }
    ],
    returnType: 'string',
    body: [
        Stmt.if(
            Expr.binary('value', '===', Expr.undefined()),
            [Stmt.throw('Value is required')]
        ),
        Stmt.return(Expr.id('value'))
    ],
    exported: true
});
```

#### Exports

```typescript
// Named exports
Decl.export(sourceFile, ['Patient', 'Observation']);
// Result: export { Patient, Observation };

// Re-export from module
Decl.exportFrom(sourceFile, './types', ['Patient', 'Observation']);
// Result: export { Patient, Observation } from './types';
```

#### Comments

```typescript
Decl.comment(sourceFile, 'WARNING: This file is autogenerated');
// Result: // WARNING: This file is autogenerated

Decl.blockComment(sourceFile, [
    'This file is autogenerated.',
    'Do not edit manually.'
]);
// Result:
// /*
//  * This file is autogenerated.
//  * Do not edit manually.
//  */

Decl.blankLine(sourceFile);
// Result: (blank line)
```

## Complete Example

Here's a complete example generating a FHIR ContactPoint interface:

```typescript
import { Project, IndentationText, QuoteKind } from 'ts-morph';
import { Decl, Type, Expr } from './ast';

// Setup project
const project = new Project({
    manipulationSettings: {
        indentationText: IndentationText.FourSpaces,
        quoteKind: QuoteKind.Single,
    },
});

const sourceFile = project.createSourceFile('ContactPoint.ts');

// Add disclaimer
Decl.comment(sourceFile, 'WARNING: This file is autogenerated by FHIR Schema Codegen.');
Decl.comment(sourceFile, 'https://github.com/fhir-schema/fhir-schema-codegen');
Decl.comment(sourceFile, 'Any manual changes made to this file may be overwritten.');
Decl.blankLine(sourceFile);

// Add imports
Decl.import(sourceFile, '../hl7-fhir-r4-core/Element', ['Element']);
Decl.import(sourceFile, '../hl7-fhir-r4-core/Period', ['Period']);
Decl.blankLine(sourceFile);

// Add interface
Decl.interface(sourceFile, {
    name: 'ContactPoint',
    exported: true,
    extends: ['Element'],
    properties: [
        {
            name: 'period',
            type: 'Period',
            optional: true,
        },
        {
            name: 'rank',
            type: 'number',
            optional: true,
        },
        {
            name: '_rank',
            type: 'Element',
            optional: true,
        },
        {
            name: 'system',
            type: Type.union([
                Type.stringLiteral('phone'),
                Type.stringLiteral('fax'),
                Type.stringLiteral('email'),
                Type.stringLiteral('pager'),
                Type.stringLiteral('url'),
                Type.stringLiteral('sms'),
                Type.stringLiteral('other'),
            ]),
            optional: true,
        },
        {
            name: '_system',
            type: 'Element',
            optional: true,
        },
        {
            name: 'use',
            type: Type.union([
                Type.stringLiteral('home'),
                Type.stringLiteral('work'),
                Type.stringLiteral('temp'),
                Type.stringLiteral('old'),
                Type.stringLiteral('mobile'),
            ]),
            optional: true,
        },
        {
            name: '_use',
            type: 'Element',
            optional: true,
        },
        {
            name: 'value',
            type: 'string',
            optional: true,
        },
        {
            name: '_value',
            type: 'Element',
            optional: true,
        },
    ],
});

// Save file
sourceFile.saveSync();
```

**Generated Output:**

```typescript
// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Element } from '../hl7-fhir-r4-core/Element';
import { Period } from '../hl7-fhir-r4-core/Period';

export interface ContactPoint extends Element {
    period?: Period;
    rank?: number;
    _rank?: Element;
    system?: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
    _system?: Element;
    use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
    _use?: Element;
    value?: string;
    _value?: Element;
}
```

## Benefits Over String Concatenation

### Before (String Concatenation):
```typescript
this.line('export interface ContactPoint extends Element {');
this.ident();
this.lineSM('system?:', "'phone' | 'email'");
this.lineSM('value?:', 'string');
this.deident();
this.line('}');
```

**Problems:**
- ❌ Manual indentation management
- ❌ Easy to forget semicolons or braces
- ❌ No type safety
- ❌ Hard to refactor
- ❌ Brittle tests (string comparison)

### After (AST Builders):
```typescript
Decl.interface(sourceFile, {
    name: 'ContactPoint',
    extends: ['Element'],
    properties: [
        { name: 'system', type: Type.union([Type.stringLiteral('phone'), Type.stringLiteral('email')]), optional: true },
        { name: 'value', type: 'string', optional: true }
    ]
});
```

**Benefits:**
- ✅ Automatic indentation
- ✅ Impossible to generate invalid syntax
- ✅ Type-safe builders
- ✅ Easy to refactor (structural changes)
- ✅ Testable (assert on AST structure)
- ✅ Readable and declarative

## Testing

Test the structure, not the strings:

```typescript
import { expect } from 'vitest';

const sourceFile = createSourceFile();
Decl.interface(sourceFile, {
    name: 'Patient',
    properties: [{ name: 'id', type: 'string' }]
});

const text = sourceFile.getFullText();
expect(text).toContain('export interface Patient');
expect(text).toContain('id: string');
```

## API Reference

For detailed API documentation, see the TypeScript type definitions in each module:

- `expressions.ts` - Expression builders
- `types.ts` - Type builders
- `statements.ts` - Statement builders
- `declarations.ts` - Declaration builders

All builders are fully typed with TypeScript for excellent IDE autocomplete support.
