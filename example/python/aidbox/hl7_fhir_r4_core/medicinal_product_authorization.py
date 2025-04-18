# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class MedicinalProductAuthorizationJurisdictionalAuthorization(BackboneElement):
    country: Optional[CodeableConcept] = None
    identifier: Optional[L[Identifier]] = None
    jurisdiction: Optional[L[CodeableConcept]] = None
    legal_status_of_supply: Optional[CodeableConcept] = None
    validity_period: Optional[Period] = None

class MedicinalProductAuthorizationProcedure(BackboneElement):
    application: Optional[L[MedicinalProductAuthorizationProcedure]] = None
    date_date_time: Optional[str] = None
    date_period: Optional[Period] = None
    identifier: Optional[Identifier] = None
    type: Optional[CodeableConcept] = None


class MedicinalProductAuthorization(DomainResource):
    country: Optional[L[CodeableConcept]] = None
    data_exclusivity_period: Optional[Period] = None
    date_of_first_authorization: Optional[str] = None
    holder: Optional[Reference] = None
    identifier: Optional[L[Identifier]] = None
    international_birth_date: Optional[str] = None
    jurisdiction: Optional[L[CodeableConcept]] = None
    jurisdictional_authorization: Optional[L[MedicinalProductAuthorizationJurisdictionalAuthorization]] = None
    legal_basis: Optional[CodeableConcept] = None
    procedure: Optional[MedicinalProductAuthorizationProcedure] = None
    regulator: Optional[Reference] = None
    restore_date: Optional[str] = None
    status: Optional[CodeableConcept] = None
    status_date: Optional[str] = None
    subject: Optional[Reference] = None
    validity_period: Optional[Period] = None

