# Aidbox TypeScript SDK

This is a generated TypeScript SDK for the Aidbox FHIR server. The SDK provides a type-safe way to interact with FHIR resources.

## Installation

```bash
npm install
```

## Setting Up Aidbox

Before running the code, you need to start the Aidbox server using Docker Compose:

1. Navigate to the root directory of the project
2. Start Aidbox:
```bash
docker-compose up -d
```

3. On first start:
   - Open http://localhost:8888 in your browser
   - Follow the instructions to get a license

4. Wait for Aidbox to initialize (this may take a few minutes)

## Usage

### Basic Setup

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

```bash

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

### Regenerating the SDK

If you need to regenerate the SDK with updated FHIR definitions:

1. Update the FHIR definitions in the source
2. Run the generation command:
```bash

```
