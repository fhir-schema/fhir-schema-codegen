# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class PatientLink(BackboneElement):
    other: Optional[Reference] = None
    type: Optional[Literal["replaced-by", "replaces", "refer", "seealso"]] = None

class PatientCommunication(BackboneElement):
    language: Optional[CodeableConcept] = None
    preferred: Optional[bool] = None

class PatientContact(BackboneElement):
    address: Optional[Address] = None
    gender: Optional[Literal["male", "female", "other", "unknown"]] = None
    name: Optional[HumanName] = None
    organization: Optional[Reference] = None
    period: Optional[Period] = None
    relationship: Optional[L[CodeableConcept]] = None
    telecom: Optional[L[ContactPoint]] = None


class Patient(DomainResource):
    active: Optional[bool] = None
    address: Optional[L[Address]] = None
    birth_date: Optional[str] = None
    communication: Optional[L[PatientCommunication]] = None
    contact: Optional[L[PatientContact]] = None
    deceased_boolean: Optional[bool] = None
    deceased_date_time: Optional[str] = None
    gender: Optional[Literal["male", "female", "other", "unknown"]] = None
    general_practitioner: Optional[L[Reference]] = None
    identifier: Optional[L[Identifier]] = None
    link: Optional[L[PatientLink]] = None
    managing_organization: Optional[Reference] = None
    marital_status: Optional[CodeableConcept] = None
    multiple_birth_boolean: Optional[bool] = None
    multiple_birth_integer: Optional[int] = None
    name: Optional[L[HumanName]] = None
    photo: Optional[L[Attachment]] = None
    telecom: Optional[L[ContactPoint]] = None

