# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import Optional, List as L, Literal, ForwardRef

from aidbox.hl7_fhir_r4_core.base import BackboneElement, CodeableConcept, ContactDetail, Period, UsageContext
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class NamingSystemUniqueId(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    comment: Optional[str] = Field(None, alias="comment", serialization_alias="comment")
    period: Optional[Period] = Field(None, alias="period", serialization_alias="period")
    preferred: Optional[bool] = Field(None, alias="preferred", serialization_alias="preferred")
    type: Optional[Literal["oid", "uuid", "uri", "other"]] = Field(None, alias="type", serialization_alias="type")
    value: Optional[str] = Field(None, alias="value", serialization_alias="value")


class NamingSystem(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='NamingSystem',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='NamingSystem'
    )
    
    contact: Optional[L[ContactDetail]] = Field(None, alias="contact", serialization_alias="contact")
    date: Optional[str] = Field(None, alias="date", serialization_alias="date")
    description: Optional[str] = Field(None, alias="description", serialization_alias="description")
    jurisdiction: Optional[L[CodeableConcept]] = Field(None, alias="jurisdiction", serialization_alias="jurisdiction")
    kind: Optional[Literal["codesystem", "identifier", "root"]] = Field(None, alias="kind", serialization_alias="kind")
    name: Optional[str] = Field(None, alias="name", serialization_alias="name")
    publisher: Optional[str] = Field(None, alias="publisher", serialization_alias="publisher")
    responsible: Optional[str] = Field(None, alias="responsible", serialization_alias="responsible")
    status: Optional[Literal["draft", "active", "retired", "unknown"]] = Field(None, alias="status", serialization_alias="status")
    type: Optional[CodeableConcept] = Field(None, alias="type", serialization_alias="type")
    unique_id: Optional[L[NamingSystemUniqueId]] = Field(None, alias="uniqueId", serialization_alias="uniqueId")
    usage: Optional[str] = Field(None, alias="usage", serialization_alias="usage")
    use_context: Optional[L[UsageContext]] = Field(None, alias="useContext", serialization_alias="useContext")

