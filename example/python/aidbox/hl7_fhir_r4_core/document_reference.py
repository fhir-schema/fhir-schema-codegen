# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class DocumentReferenceContent(BackboneElement):
    attachment: Optional[Attachment] = None
    format: Optional[Coding] = None

class DocumentReferenceRelatesTo(BackboneElement):
    code: Optional[Literal["replaces", "transforms", "signs", "appends"]] = None
    target: Optional[Reference] = None

class DocumentReferenceContext(BackboneElement):
    encounter: Optional[L[Reference]] = None
    event: Optional[L[CodeableConcept]] = None
    facility_type: Optional[CodeableConcept] = None
    period: Optional[Period] = None
    practice_setting: Optional[CodeableConcept] = None
    related: Optional[L[Reference]] = None
    source_patient_info: Optional[Reference] = None


class DocumentReference(DomainResource):
    authenticator: Optional[Reference] = None
    author: Optional[L[Reference]] = None
    category: Optional[L[CodeableConcept]] = None
    content: Optional[L[DocumentReferenceContent]] = None
    context: Optional[DocumentReferenceContext] = None
    custodian: Optional[Reference] = None
    date: Optional[str] = None
    description: Optional[str] = None
    doc_status: Optional[Literal["preliminary", "final", "amended", "entered-in-error"]] = None
    identifier: Optional[L[Identifier]] = None
    master_identifier: Optional[Identifier] = None
    relates_to: Optional[L[DocumentReferenceRelatesTo]] = None
    security_label: Optional[L[CodeableConcept]] = None
    status: Optional[Literal["current", "superseded", "entered-in-error"]] = None
    subject: Optional[Reference] = None
    type: Optional[CodeableConcept] = None

