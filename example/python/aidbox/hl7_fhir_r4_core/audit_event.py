# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import Optional, List as L, Literal, ForwardRef

from aidbox.hl7_fhir_r4_core.base import BackboneElement, CodeableConcept, Coding, Period, Reference
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class AuditEventSource(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    observer: Optional[Reference] = Field(None, alias="observer", serialization_alias="observer")
    site: Optional[str] = Field(None, alias="site", serialization_alias="site")
    type: Optional[L[Coding]] = Field(None, alias="type", serialization_alias="type")

class AuditEventAgentNetwork(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    address: Optional[str] = Field(None, alias="address", serialization_alias="address")
    type: Optional[Literal["1", "2", "3", "4", "5"]] = Field(None, alias="type", serialization_alias="type")

class AuditEventAgent(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    alt_id: Optional[str] = Field(None, alias="altId", serialization_alias="altId")
    location: Optional[Reference] = Field(None, alias="location", serialization_alias="location")
    media: Optional[Coding] = Field(None, alias="media", serialization_alias="media")
    name: Optional[str] = Field(None, alias="name", serialization_alias="name")
    network: Optional[AuditEventAgentNetwork] = Field(None, alias="network", serialization_alias="network")
    policy: Optional[L[str]] = Field(None, alias="policy", serialization_alias="policy")
    purpose_of_use: Optional[L[CodeableConcept]] = Field(None, alias="purposeOfUse", serialization_alias="purposeOfUse")
    requestor: Optional[bool] = Field(None, alias="requestor", serialization_alias="requestor")
    role: Optional[L[CodeableConcept]] = Field(None, alias="role", serialization_alias="role")
    type: Optional[CodeableConcept] = Field(None, alias="type", serialization_alias="type")
    who: Optional[Reference] = Field(None, alias="who", serialization_alias="who")

class AuditEventEntityDetail(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    type: Optional[str] = Field(None, alias="type", serialization_alias="type")
    value_base64binary: Optional[str] = Field(None, alias="valueBase64Binary", serialization_alias="valueBase64Binary")
    value_string: Optional[str] = Field(None, alias="valueString", serialization_alias="valueString")

class AuditEventEntity(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    description: Optional[str] = Field(None, alias="description", serialization_alias="description")
    detail: Optional[L[AuditEventEntityDetail]] = Field(None, alias="detail", serialization_alias="detail")
    lifecycle: Optional[Coding] = Field(None, alias="lifecycle", serialization_alias="lifecycle")
    name: Optional[str] = Field(None, alias="name", serialization_alias="name")
    query: Optional[str] = Field(None, alias="query", serialization_alias="query")
    role: Optional[Coding] = Field(None, alias="role", serialization_alias="role")
    security_label: Optional[L[Coding]] = Field(None, alias="securityLabel", serialization_alias="securityLabel")
    type: Optional[Coding] = Field(None, alias="type", serialization_alias="type")
    what: Optional[Reference] = Field(None, alias="what", serialization_alias="what")


class AuditEvent(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='AuditEvent',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='AuditEvent'
    )
    
    action: Optional[Literal["C", "R", "U", "D", "E"]] = Field(None, alias="action", serialization_alias="action")
    agent: Optional[L[AuditEventAgent]] = Field(None, alias="agent", serialization_alias="agent")
    entity: Optional[L[AuditEventEntity]] = Field(None, alias="entity", serialization_alias="entity")
    outcome: Optional[Literal["0", "4", "8", "12"]] = Field(None, alias="outcome", serialization_alias="outcome")
    outcome_desc: Optional[str] = Field(None, alias="outcomeDesc", serialization_alias="outcomeDesc")
    period: Optional[Period] = Field(None, alias="period", serialization_alias="period")
    purpose_of_event: Optional[L[CodeableConcept]] = Field(None, alias="purposeOfEvent", serialization_alias="purposeOfEvent")
    recorded: Optional[str] = Field(None, alias="recorded", serialization_alias="recorded")
    source: Optional[AuditEventSource] = Field(None, alias="source", serialization_alias="source")
    subtype: Optional[L[Coding]] = Field(None, alias="subtype", serialization_alias="subtype")
    type: Optional[Coding] = Field(None, alias="type", serialization_alias="type")

