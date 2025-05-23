# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import Optional, List as L, Literal, ForwardRef

from aidbox.hl7_fhir_r4_core.base import BackboneElement, CodeableConcept, Identifier, Period, Reference
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class AccountCoverage(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    coverage: Optional[Reference] = Field(None, alias="coverage", serialization_alias="coverage")
    priority: Optional[PositiveInt] = Field(None, alias="priority", serialization_alias="priority")

class AccountGuarantor(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    on_hold: Optional[bool] = Field(None, alias="onHold", serialization_alias="onHold")
    party: Optional[Reference] = Field(None, alias="party", serialization_alias="party")
    period: Optional[Period] = Field(None, alias="period", serialization_alias="period")


class Account(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='Account',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='Account'
    )
    
    coverage: Optional[L[AccountCoverage]] = Field(None, alias="coverage", serialization_alias="coverage")
    description: Optional[str] = Field(None, alias="description", serialization_alias="description")
    guarantor: Optional[L[AccountGuarantor]] = Field(None, alias="guarantor", serialization_alias="guarantor")
    identifier: Optional[L[Identifier]] = Field(None, alias="identifier", serialization_alias="identifier")
    name: Optional[str] = Field(None, alias="name", serialization_alias="name")
    owner: Optional[Reference] = Field(None, alias="owner", serialization_alias="owner")
    part_of: Optional[Reference] = Field(None, alias="partOf", serialization_alias="partOf")
    service_period: Optional[Period] = Field(None, alias="servicePeriod", serialization_alias="servicePeriod")
    status: Optional[Literal["active", "inactive", "entered-in-error", "on-hold", "unknown"]] = Field(None, alias="status", serialization_alias="status")
    subject: Optional[L[Reference]] = Field(None, alias="subject", serialization_alias="subject")
    type: Optional[CodeableConcept] = Field(None, alias="type", serialization_alias="type")

