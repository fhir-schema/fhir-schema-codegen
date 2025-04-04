# Aidbox Python SDK

A type-safe Python SDK for interacting with Aidbox FHIR server, generated from FHIR R4 specifications. The SDK provides Pydantic models for all FHIR resources and an async client for server communication.

## Quick Start

1. Install dependencies:
```bash
pip install -r requirements.txt
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

```python
from aidbox.client import Client

client = Client(
    base_url="http://localhost:8888",
    username="root",
    password="secret",
)
```

### Working with FHIR Resources

The SDK provides Pydantic models for all FHIR resources. Here's an example of creating a Patient:

```python
from aidbox.hl7_fhir_r4_core.base import HumanName, Identifier
from aidbox.hl7_fhir_r4_core import Patient

patient = Patient(
    identifier=[Identifier(system="http://org.io/id", value="0000-0000")],
    name=[HumanName(given=["John"], family="Doe")],
    gender="male",
    birth_date="1990-01-01",
)

try:
    result = client.create(patient)
    print(result.model_dump_json(exclude_unset=True, exclude_none=True))
except requests.exceptions.RequestException as e:
    if e.response is not None:
        print(e.response.json())
```

## How This SDK Was Generated

This SDK was automatically generated using the FHIR Schema Codegen tool. The generation process:

1. Reads FHIR R4 resource definitions
2. Generates Python classes for each FHIR resource
3. Creates a type-safe client for interacting with the Aidbox server

### Generation Process

```bash
cd fhir-schema-codegen

npm run build

node dist/cli.js generate --generator python --output ./example/python/aidbox  --packages hl7.fhir.r4.core@4.0.1
```

This will:
1. Generate Python classes in the `aidbox/models` directory
2. Create the client implementation in `aidbox/client.py`
3. Set up the package structure with proper imports

### Project Structure

```
example/python/
├── aidbox/
│   ├── __init__.py
│   ├── client.py
│   └── hl7_fhir_r4_core/
│       ├── __init__.py
│       ├── base.py
│       ├── patient.py
│       └── ... (other FHIR resources)
├── main.py
├── requirements.txt
└── README.md
```

## Development

### Requirements
- Python 3.7+
- Pydantic 2.0+

### Local Development

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the example:
```bash
python main.py
```
