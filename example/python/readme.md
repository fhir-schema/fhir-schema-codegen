# Aidbox Python SDK

This is a generated Python SDK for the Aidbox FHIR server. The SDK provides a type-safe way to interact with FHIR resources.

## Installation

```bash
pip install -r requirements.txt
```

## Setting Up Aidbox

Before running the code, you need to start the Aidbox server using Docker Compose:

1. Navigate to the root directory of the project
2. Start Aidbox:
```bash
cd ../. && docker compose up -d
```

3. On first start:
   - Open http://localhost:8888 in your browser
   - Follow the instructions to get a license

4. Wait for Aidbox to initialize (this may take a few minutes)

## Usage

### Basic Setup

```python
from aidbox.client import Client

client = Client(
    base_url="http://localhost:8888",
    username="root",
    password="secret",
)
```

### Working with FHIR Resources

```python
from aidbox.hl7_fhir_r4_core.base import HumanName, Identifier
from aidbox.hl7_fhir_r4_core import Patient

patient = Patient(
    name=[Identifier(system="http://org.io/id", value="0000-0000")],
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
4. Includes proper type hints and documentation

### Generation Process

```bash

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

### Prerequisites

- Python 3.7+
- pip
- Node.js (for generation)

### Local Development

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the example:
```bash
python main.py
```

### Regenerating the SDK

If you need to regenerate the SDK with updated FHIR definitions:

1. Update the FHIR definitions in the source
2. Run the generation command:

```bash

```
