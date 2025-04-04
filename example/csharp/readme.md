# Aidbox C# SDK

A type-safe C# SDK for interacting with Aidbox FHIR server, generated from FHIR R4 specifications. The SDK provides strongly-typed classes for all FHIR resources and a synchronous client for server communication.

## Quick Start

1. Install dependencies:
```bash
dotnet restore
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

```csharp
using Aidbox;

var auth = new Auth
{
    Method = AuthMethods.BASIC,
    Credentials = new AuthCredentials
    {
        Username = "root",
        Password = "secret"
    }
};

var client = new Client("https://localhost:8888", auth);
```

### Working with FHIR Resources

The SDK provides strongly-typed classes for all FHIR resources. Here's an example of creating a Patient:

```csharp
using Aidbox.FHIR.R4.Core;

var patient = new Patient
{
    Identifier = [new Identifier { System = "http://org.io/id", Value = "0000-0000" }],
    Name = [new HumanName { Given = ["John"], Family = "Doe" }],
    Gender = "male",
    BirthDate = "1990-01-01",
};

var (result, error) = await client.Create(patient);
```

## How This SDK Was Generated

This SDK was automatically generated using the FHIR Schema Codegen tool. The generation process:

1. Reads FHIR R4 resource definitions
2. Generates C# classes for each FHIR resource
3. Creates a type-safe client for interacting with the Aidbox server

### Generation Process

```bash
cd fhir-schema-codegen

npm run build

node dist/cli.js generate --generator csharp --output ./example/csharp/aidbox  --packages hl7.fhir.r4.core@4.0.1
```

This will:
1. Generate C# classes in the `aidbox/models` directory
2. Create the client implementation in `aidbox/Client.cs`
3. Set up the package structure with proper imports

### Project Structure

```
example/csharp/
├── aidbox/
│   ├── Client.cs
│   ├── Config.cs
│   └── hl7_fhir_r4_core/
│       ├── base.cs
│       ├── Patient.cs
│       └── ... (other FHIR resources)
├── Program.cs
├── csharp.csproj
└── README.md
```

## Development

### Requirements
- .NET 7.0+
- Visual Studio 2022 or JetBrains Rider

- .NET 7.0 or later
- Node.js (for generation)

### Local Development

1. Restore dependencies:
```bash
dotnet restore
```

2. Build the project:
```bash
dotnet build
```

3. Run the example:
```bash
dotnet run
```
