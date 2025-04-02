# Aidbox C# SDK

This is a generated C# SDK for the Aidbox FHIR server. The SDK provides a type-safe way to interact with FHIR resources.

## Installation

```bash
dotnet restore
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

```csharp
using Aidbox;

var auth = new Auth
{
    Method = AuthMethods.BASIC,
    Credentials = new AuthCredentials
    {
        Username = "root",
        Password = "12345"
    }
};

var client = new Client("https://localhost:8888", auth);
```

### Working with FHIR Resources

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



### Project Structure

```
example/csharp/
├── aidbox/
│   ├── Client.cs
│   ├── Config.cs
│   └── hl7_fhir_r4_core/
│       ├── base.py
│       ├── Patient.cs
│       └── ... (other FHIR resources)
├── Program.cs
├── csharp.csproj
└── README.md
```

## Development

### Prerequisites

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

### Regenerating the SDK

If you need to regenerate the SDK with updated FHIR definitions:

1. Update the FHIR definitions in the source
2. Run the generation command:

```bash
fhirschema-codegen generate -g csharp -o ./aidbox -f *.ndjson
```

Or create your own language specific template with:

```bash
fhirschema-codegen create-generator -o ./csharp-template
fhirschema-codegen generate --custom-generator ./csharp-template
```
<!-- --custom-generator ./csharp-template hide build inside the template project -->
<!-- --custom-generator ./csharp-template show here the ability to use other fhir versions -->