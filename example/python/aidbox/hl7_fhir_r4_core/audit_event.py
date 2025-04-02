# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class AuditEventSource(BackboneElement):
    observer: Optional[Reference] = None
    site: Optional[str] = None
    type: Optional[L[Coding]] = None

class AuditEventAgentNetwork(BackboneElement):
    address: Optional[str] = None
    type: Optional[Literal["1", "2", "3", "4", "5"]] = None

class AuditEventAgent(BackboneElement):
    alt_id: Optional[str] = None
    location: Optional[Reference] = None
    media: Optional[Coding] = None
    name: Optional[str] = None
    network: Optional[AuditEventAgentNetwork] = None
    policy: Optional[L[str]] = None
    purpose_of_use: Optional[L[CodeableConcept]] = None
    requestor: Optional[bool] = None
    role: Optional[L[CodeableConcept]] = None
    type: Optional[CodeableConcept] = None
    who: Optional[Reference] = None

class AuditEventEntityDetail(BackboneElement):
    type: Optional[str] = None
    value_base64binary: Optional[str] = None
    value_string: Optional[str] = None

class AuditEventEntity(BackboneElement):
    description: Optional[str] = None
    detail: Optional[L[AuditEventEntityDetail]] = None
    lifecycle: Optional[Coding] = None
    name: Optional[str] = None
    query: Optional[str] = None
    role: Optional[Coding] = None
    security_label: Optional[L[Coding]] = None
    type: Optional[Coding] = None
    what: Optional[Reference] = None


class AuditEvent(DomainResource):
    action: Optional[Literal["C", "R", "U", "D", "E"]] = None
    agent: Optional[L[AuditEventAgent]] = None
    entity: Optional[L[AuditEventEntity]] = None
    outcome: Optional[Literal["0", "4", "8", "12"]] = None
    outcome_desc: Optional[str] = None
    period: Optional[Period] = None
    purpose_of_event: Optional[L[CodeableConcept]] = None
    recorded: Optional[str] = None
    source: Optional[AuditEventSource] = None
    subtype: Optional[L[Coding]] = None
    type: Optional[Coding] = None

