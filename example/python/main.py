from aidbox.hl7_fhir_r4_core.base import HumanName, Identifier
from aidbox.hl7_fhir_r4_core import Patient

from aidbox.client import Client

import requests

client = Client(
    base_url="http://localhost:8888",
    username="root",
    password="secret",
)

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
