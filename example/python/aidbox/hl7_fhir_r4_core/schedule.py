# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import Optional, List as L, Literal, ForwardRef

from aidbox.hl7_fhir_r4_core.base import CodeableConcept, Identifier, Period, Reference
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class Schedule(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='Schedule',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='Schedule'
    )
    
    active: Optional[bool] = Field(None, alias="active", serialization_alias="active")
    actor: Optional[L[Reference]] = Field(None, alias="actor", serialization_alias="actor")
    comment: Optional[str] = Field(None, alias="comment", serialization_alias="comment")
    identifier: Optional[L[Identifier]] = Field(None, alias="identifier", serialization_alias="identifier")
    planning_horizon: Optional[Period] = Field(None, alias="planningHorizon", serialization_alias="planningHorizon")
    service_category: Optional[L[CodeableConcept]] = Field(None, alias="serviceCategory", serialization_alias="serviceCategory")
    service_type: Optional[L[CodeableConcept]] = Field(None, alias="serviceType", serialization_alias="serviceType")
    specialty: Optional[L[CodeableConcept]] = Field(None, alias="specialty", serialization_alias="specialty")

