# Aidbox TypeScript SDK

A type-safe SDK for interacting with Aidbox FHIR server, generated from FHIR R4 specifications. The SDK provides complete type definitions for all FHIR resources and a simple client for server communication.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start Aidbox server:
```bash
cd ../. && docker compose up -d
```

3. Get license (first run only):
   - Open http://localhost:8888
   - Follow setup instructions

## Usage

### Client Configuration

```typescript
import { Client } from './aidbox';

const client = new Client('http://localhost:8888', {
  auth: {
    method: 'basic',
    credentials: {
      username: 'root',
      password: 'secret',
    },
  },
});
```

### Working with FHIR Resources

The SDK provides full type safety for all FHIR resources. Here's an example of creating a Patient:

```typescript
import { Patient } from './aidbox/types/hl7-fhir-r4-core';

const patient: Patient = {
  identifier: [{ system: 'http://org.io/id', value: '0000-0000' }],
  name: [{ given: ['John'], family: 'Doe' }],
  gender: 'male',
  birthDate: '1990-01-01',
};

  const response = await client.resource.create('Patient', patient);

  console.log(response);
```
## How This SDK Was Generated

This SDK was automatically generated using the FHIR Schema Codegen tool. The generation process:

1. Reads FHIR R4 resource definitions
2. Generates TypeScript interfaces for each FHIR resource
3. Creates a type-safe client for interacting with the Aidbox server

### Generation Process

```bash
cd fhir-schema-codegen

npm run build

node dist/cli.js generate --generator typescript --output ./example/typescript/aidbox  --packages hl7.fhir.r4.core@4.0.1
```

This will:
1. Generate TypeScript interfaces and classes in the `aidbox/types` directory
2. Create the client implementation in `aidbox/http-client.ts`
3. Set up the package structure with proper exports

### Project Structure

```
example/typescript/
├── aidbox/
│   ├── index.ts
│   ├── http-client.ts
│   └── types/
│       └── hl7-fhir-r4-core/
│           ├── index.ts
│           ├── resource.ts
│           ├── patient.ts
│           └── ... (other FHIR resources)
├── main.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Development

### Prerequisites

- Node.js >= 18
- npm
- TypeScript 4.9+

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run start
```

3. Run the example:
```bash
npm run build
```
