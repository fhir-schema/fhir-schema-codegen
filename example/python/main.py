from aidbox.hl7_fhir_r4_core import Patient, HumanName, Identifier

from aidbox.client import Client, Auth, AuthCredentials
from pprint import pprint
import requests
from typing import Dict, Any

client = Client(
    base_url="http://localhost:8080/fhir",
    auth=Auth(
        method="basic",
        credentials=AuthCredentials(
            username="root",
            password="<SECRET>",  # get actual value from docker-compose.yaml: BOX_ROOT_CLIENT_SECRET
        ),
    ),
)

patient = Patient(
    identifier=[Identifier(system="http://org.io/id", value="0000-0000")],
    name=[HumanName(given=["John"], family="Doe")],
    gender="male",
)

try:
    result = client.create(patient)
    print(result.model_dump_json(exclude_unset=True, exclude_none=True))
    print(result.model_dump(exclude_unset=True, exclude_none=True))
except requests.exceptions.RequestException as e:
    print("Error:", e)
    if e.response is not None:
        response_json: Dict[str, Any] = e.response.json()
        print(response_json)

patient_json = """
    {
    "resourceType": "Patient",
    "name": [ { "family": "Doe", "given": [ "John" ] } ],
    "loteryNumber": 123456
    }
"""

# Working with extra fields (--py-allow-extra-fields) or without it
if Patient.model_config["extra"] == "allow":
    p = Patient.model_validate_json(patient_json)
    assert p.model_dump(exclude_unset=True, exclude_none=True)["name"] == [
        {"family": "Doe", "given": ["John"]}
    ]
    assert p.model_extra == {"loteryNumber": 123456}
else:
    error_happens = False
    try:
        p = Patient.model_validate_json(patient_json)
    except ValueError as e:
        error_happens = True
    assert error_happens
