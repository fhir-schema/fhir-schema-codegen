# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class EncounterDiagnosis(BackboneElement):
    condition: Optional[Reference] = None
    rank: Optional[PositiveInt] = None
    use: Optional[CodeableConcept] = None

class EncounterParticipant(BackboneElement):
    individual: Optional[Reference] = None
    period: Optional[Period] = None
    type: Optional[L[CodeableConcept]] = None

class EncounterClassHistory(BackboneElement):
    class_: Optional[Coding] = None
    period: Optional[Period] = None

class EncounterHospitalization(BackboneElement):
    admit_source: Optional[CodeableConcept] = None
    destination: Optional[Reference] = None
    diet_preference: Optional[L[CodeableConcept]] = None
    discharge_disposition: Optional[CodeableConcept] = None
    origin: Optional[Reference] = None
    pre_admission_identifier: Optional[Identifier] = None
    re_admission: Optional[CodeableConcept] = None
    special_arrangement: Optional[L[CodeableConcept]] = None
    special_courtesy: Optional[L[CodeableConcept]] = None

class EncounterLocation(BackboneElement):
    location: Optional[Reference] = None
    period: Optional[Period] = None
    physical_type: Optional[CodeableConcept] = None
    status: Optional[Literal["planned", "active", "reserved", "completed"]] = None

class EncounterStatusHistory(BackboneElement):
    period: Optional[Period] = None
    status: Optional[Literal["planned", "arrived", "triaged", "in-progress", "onleave", "finished", "cancelled", "entered-in-error", "unknown"]] = None


class Encounter(DomainResource):
    account: Optional[L[Reference]] = None
    appointment: Optional[L[Reference]] = None
    based_on: Optional[L[Reference]] = None
    class_: Optional[Coding] = None
    class_history: Optional[L[EncounterClassHistory]] = None
    diagnosis: Optional[L[EncounterDiagnosis]] = None
    episode_of_care: Optional[L[Reference]] = None
    hospitalization: Optional[EncounterHospitalization] = None
    identifier: Optional[L[Identifier]] = None
    length: Optional[Duration] = None
    location: Optional[L[EncounterLocation]] = None
    participant: Optional[L[EncounterParticipant]] = None
    part_of: Optional[Reference] = None
    period: Optional[Period] = None
    priority: Optional[CodeableConcept] = None
    reason_code: Optional[L[CodeableConcept]] = None
    reason_reference: Optional[L[Reference]] = None
    service_provider: Optional[Reference] = None
    service_type: Optional[CodeableConcept] = None
    status: Optional[Literal["planned", "arrived", "triaged", "in-progress", "onleave", "finished", "cancelled", "entered-in-error", "unknown"]] = None
    status_history: Optional[L[EncounterStatusHistory]] = None
    subject: Optional[Reference] = None
    type: Optional[L[CodeableConcept]] = None

