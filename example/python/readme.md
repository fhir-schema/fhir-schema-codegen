# Aidbox Python SDK

A type-safe Python SDK for interacting with Aidbox FHIR server, generated from FHIR R4 specifications. The SDK provides Pydantic models for all FHIR resources and a client for server communication with full type checking support.

All files in `example/python/aidbox` are generated and should not be modified manually. If you require any changes, please open an issue or submit a pull request.

## Quick Start

1. Install dependencies:

```bash
$ pip install -r requirements.txt
```

2. Start Aidbox server:

```bash
$ curl -JO https://aidbox.app/runme/sdk && docker compose up --wait
```

3. Get Aidbox license (first run only):
    - Open <http://localhost:8888>
    - Follow setup instructions

4. Get `BOX_ROOT_CLIENT_SECRET` from  downloaded `docker-compose.yaml` file.

## Usage

### Client Configuration

```python
from aidbox.client import Client, Auth, AuthCredentials

client = Client(
    base_url="http://localhost:8888",
    auth=Auth(
        method="basic",
        credentials=AuthCredentials(
            username="root",
            password="<SECRET>", # get actual value from docker-compose.yaml: BOX_ROOT_CLIENT_SECRET
        ),
    ),
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
    print("Error:", e)
    if e.response is not None:
        response_json: Dict[str, Any] = e.response.json()
        print(response_json)
```

### Run example

```bash
$ python main.py | jq
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


## How To Generate Python SDK

This SDK was automatically generated using the FHIR Schema Codegen tool. The generation process:

1. Reads FHIR R4 resource definitions
2. Generates Python classes for each FHIR resource
3. Creates a type-safe client for interacting with the Aidbox server

```bash
$ npm install -g @fhirschema/codegen
$ npx fscg generate -g python -p hl7.fhir.r4.core@4.0.1 -o example/python --package-root aidbox
```

### Generation Options

You can customize the generated Python SDK with the following options:

- `--package-root`: Root package name for Python package hierarchy (e.g., 'aidbox' or 'my_package.fhir')
- `--py-allow-extra-fields`: Allow extra fields in resource models without validation

Example with options:

```bash
$ npx fscg generate -g python -p hl7.fhir.r4.core@4.0.1 -o example/python --package-root aidbox --py-allow-extra-fields
```

When `--py-allow-extra-fields` is enabled, the generated models will accept unknown properties without validation errors, which is useful when working with FHIR servers that might include non-standard extensions or properties. Note that these extra fields will not be included during serialization.

### Project Structure

```text
example/python/
├── aidbox/                            # (Generated) SDK core
│   ├── __init__.py                    # (Generated)
│   ├── client.py                      # (Generated) HTTP client implementation
│   └── hl7_fhir_r4_core/              # (Generated) FHIR R4 resources
│       ├── __init__.py                # (Generated)
│       ├── base.py                    # (Generated) Common base classes
│       ├── patient.py                 # (Generated) Patient resource
│       └── ... (other FHIR resources) # (Generated)
├── main.py                            # Example usage file
├── mypy.ini                           # Type checking configuration
├── requirements.txt                   # Project dependencies
├── test_sdk.py                        # SDK tests
└── README.md                          # This documentation
```

## Development

### Requirements

- Python 3.7+
- Production dependencies:
  - Pydantic 2.11+ (data validation and serialization)
  - Requests 2.32+ (HTTP client library)
- Development dependencies:
  - pytest 8.3+ (testing framework)
  - mypy 1.9+ (static type checking)
  - types-requests 2.32+ (type stubs for requests)

### Local Development

1. Install dependencies:

```bash
$ pip install -r requirements.txt
```

2. Run the example:

```bash
$ python main.py
```

3. Run type checking:

```bash
$ python -m mypy . --exclude venv
```

### Testing

To run the tests:

```bash
$ python -m pytest test_sdk.py
```

### Type Checking

This project uses mypy for static type checking. The SDK has been fully annotated with type hints to enable static type checking and provide better IDE support.

Type checking is automatically run as part of the test suite, but you can also run it manually:

```bash
# From the python directory
$ python -m mypy .
```
