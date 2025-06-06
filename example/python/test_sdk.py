import pytest
from typing import Iterator
from aidbox.hl7_fhir_r4_core import Patient, HumanName
from aidbox.client import Client, Auth, AuthCredentials


FHIR_SERVER_URL = "http://localhost:8080/fhir"
USERNAME = "root"
PASSWORD = (
    "<SECRET>"  # get actual value from docker-compose.yaml: BOX_ROOT_CLIENT_SECRET
)


@pytest.fixture(scope="module")
def client() -> Client:
    return Client(
        base_url=FHIR_SERVER_URL,
        auth=Auth(
            method="basic",
            credentials=AuthCredentials(
                username=USERNAME,
                password=PASSWORD,
            ),
        ),
    )


@pytest.fixture
def created_patient(client: Client) -> Iterator[Patient]:
    patient = client.create(
        Patient(
            name=[HumanName(given=["Test"], family="Patient")],
            gender="female",
            birth_date="1980-01-01",
        )
    )
    # This fixture has module scope, so we yield the result for all tests to use
    yield patient
    try:
        if patient.id is not None:
            client.delete("Patient", patient.id)
    except Exception:
        pass


def test_create_patient(client: Client) -> None:
    new_patient = Patient(
        name=[HumanName(given=["Create"], family="Test")],
        gender="female",
        birth_date="1980-01-01",
    )

    created = client.create(new_patient)
    assert created.id is not None
    assert created.name is not None
    assert created.name[0].family == "Test"
    assert created.gender == "female"
    assert created.birth_date == "1980-01-01"

    client.delete("Patient", created.id)


def test_read_patient(client: Client, created_patient: Patient) -> None:
    assert created_patient.name is not None
    assert created_patient.id is not None
    read_patient = client.read(Patient, created_patient.id)

    assert read_patient.id == created_patient.id
    assert read_patient.name is not None
    assert read_patient.name[0].family == created_patient.name[0].family
    assert read_patient.gender == created_patient.gender


def test_update_patient(client: Client, created_patient: Patient) -> None:
    assert created_patient.id is not None
    patient_to_update = client.read(Patient, created_patient.id)

    assert patient_to_update.id == created_patient.id
    assert patient_to_update.gender == "female"
    assert patient_to_update.name is not None
    assert patient_to_update.name[0].family == "Patient"

    patient_to_update.name[0].family = "UpdatedFamily"
    patient_to_update.name[0].given = ["UpdatedGiven"]
    patient_to_update.gender = "male"
    updated_patient = client.update(patient_to_update)

    assert updated_patient.id == created_patient.id  # ID should not change
    assert updated_patient.gender == "male"  # Gender should be updated
    assert updated_patient.name is not None
    assert (
        updated_patient.name[0].family == "UpdatedFamily"
    )  # Family name should be updated
    assert updated_patient.name[0].given == [
        "UpdatedGiven"
    ]  # Given name should be updated

    assert created_patient.id is not None
    re_read_patient = client.read(Patient, created_patient.id)
    assert re_read_patient.gender == "male"
    assert re_read_patient.name is not None
    assert re_read_patient.name[0].family == "UpdatedFamily"
    assert re_read_patient.name[0].given == ["UpdatedGiven"]


def test_search_patient(client: Client, created_patient: Patient) -> None:
    search_params = {"name": "Patient"}
    result_bundle = client.search(Patient, search_params)
    assert result_bundle is not None
    assert result_bundle.total is not None
    assert result_bundle.total > 0, "No patients found in search"

    assert result_bundle.entry is not None
    found = False
    for entry in result_bundle.entry or []:
        assert entry.resource is not None
        print(entry.resource.id, created_patient.id)
        if entry.resource.id == created_patient.id:
            found = True
            break

    assert found, f"Patient with ID {created_patient.id} not found in search results"


def test_delete_patient(client: Client) -> None:
    delete_patient = Patient(
        name=[HumanName(given=["Delete"], family="Test")],
        gender="other",
    )

    created = client.create(delete_patient)
    assert created.id is not None
    client.delete("Patient", created.id)
    with pytest.raises(Exception) as _excinfo:
        client.read(Patient, created.id)


def test_to_from_json() -> None:
    p = Patient(
        name=[HumanName(given=["Test"], family="Patient")],
        gender="female",
        birth_date="1980-01-01",
    )
    json = p.to_json(indent=2)
    p2 = Patient.from_json(json)
    assert p == p2
