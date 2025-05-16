# Aidbox TypeScript SDK

A TypeScript SDK for interacting with Aidbox FHIR server, generated from FHIR R4 specifications. The SDK provides TypeScript interfaces for all FHIR resources and a client for server communication with full type checking support.

All files in `example/typescript/aidbox` are generated and should not be modified manually. If you require any changes, please open an issue or submit a pull request.

## Quick Start

1. Install dependencies:

```bash
$ npm install
```

2. Start Aidbox server:

```bash
$ curl -JO https://aidbox.app/runme/sdk && docker compose up --wait
```

3. Get Aidbox license (first run only):
    - Open <http://localhost:8888>
    - Follow setup instructions

4. Get `BOX_ROOT_CLIENT_SECRET` from downloaded `docker-compose.yaml` file.

## Usage

### Client Configuration

```typescript
import { Client } from './aidbox';

const client = new Client('http://localhost:8080', {
  auth: {
    method: 'basic',
    credentials: {
      username: 'root',
      password: '<SECRET>', // get actual value from docker-compose.yaml: BOX_ROOT_CLIENT_SECRET
    },
  },
});
```

### Working with FHIR Resources

The SDK provides TypeScript interfaces for all FHIR resources. Here's an example of creating a Patient:

```typescript
import { Patient } from './aidbox/types/hl7-fhir-r4-core';

const patient: Patient = {
  identifier: [{ system: 'http://org.io/id', value: '0000-0000' }],
  name: [{ given: ['John'], family: 'Doe' }],
  gender: 'male',
  birthDate: '1990-01-01',
};

try {
  const result = await client.resource.create('Patient', patient);
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error("Error:", error);
  if (error.response) {
    console.error(error.response.data);
  }
}
```

### Run example

```bash
$ npm run start | jq
{
  "id": "555d6bd2-5b7b-4fe6-9a67-e32a5b5aa1e5",
  "meta": {
    "lastUpdated": "2025-05-14T08:45:58.840236Z",
    "versionId": "246"
  },
  "birthDate": "1990-01-01",
  "gender": "male",
  "identifier": [
    {
      "system": "http://org.io/id",
      "value": "0000-0000"
    }
  ],
  "name": [
    {
      "family": "Doe",
      "given": [
        "John"
      ]
    }
  ]
}
```

## How To Generate TypeScript SDK

This SDK was automatically generated using the FHIR Schema Codegen tool. The generation process:

1. Reads FHIR R4 resource definitions
2. Generates TypeScript interfaces for each FHIR resource
3. Creates a type-safe client for interacting with the Aidbox server

```bash
$ npm install -g @fhirschema/codegen
$ npx fscg generate -g typescript -p hl7.fhir.r4.core@4.0.1 -o example/typescript --py-sdk-package aidbox
```

### Project Structure

```text
example/typescript/
├── aidbox/                            # (Generated) SDK core
│   ├── index.ts                       # (Generated)
│   ├── http-client.ts                 # (Generated) HTTP client implementation
│   └── types/                         # (Generated) FHIR R4 resources
│       └── hl7-fhir-r4-core/          # (Generated)
│           ├── index.ts               # (Generated)
│           ├── resource.ts            # (Generated) Common base interfaces
│           ├── patient.ts             # (Generated) Patient resource
│           └── ... (other FHIR resources) # (Generated)
├── main.ts                            # Example usage file
├── package.json                       # Project dependencies
├── tsconfig.json                      # TypeScript configuration
└── README.md                          # This documentation
```

## Development

### Requirements

- Node.js 18+
- Production dependencies:
  - Axios (HTTP client library)
  - TypeScript 4.9+ (static typing)
- Development dependencies:
  - ts-node (for running TypeScript directly)
  - eslint (code linting)
  - jest (testing framework)

### Local Development

1. Install dependencies:

```bash
$ npm install
```

2. Run the example:

```bash
$ npm run start
```

3. Build the project:

```bash
$ npm run build
```

### Testing

To run the tests:

```bash
$ npm test
```

### Type Checking

This project uses TypeScript for static type checking. The SDK has been fully typed to enable static type checking and provide better IDE support.

Type checking is
 automatically run as part of the build process, but you can also run it manually:

```bash
# From the typescript directory
$ npx tsc --noEmit
```
