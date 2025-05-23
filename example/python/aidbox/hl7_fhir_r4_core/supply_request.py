# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import Optional, List as L, Literal, ForwardRef

from aidbox.hl7_fhir_r4_core.base import BackboneElement, CodeableConcept, Identifier, Period, Quantity, Range, Reference, Timing
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class SupplyRequestParameter(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    code: Optional[CodeableConcept] = Field(None, alias="code", serialization_alias="code")
    value_boolean: Optional[bool] = Field(None, alias="valueBoolean", serialization_alias="valueBoolean")
    value_codeable_concept: Optional[CodeableConcept] = Field(None, alias="valueCodeableConcept", serialization_alias="valueCodeableConcept")
    value_quantity: Optional[Quantity] = Field(None, alias="valueQuantity", serialization_alias="valueQuantity")
    value_range: Optional[Range] = Field(None, alias="valueRange", serialization_alias="valueRange")


class SupplyRequest(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='SupplyRequest',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='SupplyRequest'
    )
    
    authored_on: Optional[str] = Field(None, alias="authoredOn", serialization_alias="authoredOn")
    category: Optional[CodeableConcept] = Field(None, alias="category", serialization_alias="category")
    deliver_from: Optional[Reference] = Field(None, alias="deliverFrom", serialization_alias="deliverFrom")
    deliver_to: Optional[Reference] = Field(None, alias="deliverTo", serialization_alias="deliverTo")
    identifier: Optional[L[Identifier]] = Field(None, alias="identifier", serialization_alias="identifier")
    item_codeable_concept: Optional[CodeableConcept] = Field(None, alias="itemCodeableConcept", serialization_alias="itemCodeableConcept")
    item_reference: Optional[Reference] = Field(None, alias="itemReference", serialization_alias="itemReference")
    occurrence_date_time: Optional[str] = Field(None, alias="occurrenceDateTime", serialization_alias="occurrenceDateTime")
    occurrence_period: Optional[Period] = Field(None, alias="occurrencePeriod", serialization_alias="occurrencePeriod")
    occurrence_timing: Optional[Timing] = Field(None, alias="occurrenceTiming", serialization_alias="occurrenceTiming")
    parameter: Optional[L[SupplyRequestParameter]] = Field(None, alias="parameter", serialization_alias="parameter")
    priority: Optional[Literal["routine", "urgent", "asap", "stat"]] = Field(None, alias="priority", serialization_alias="priority")
    quantity: Optional[Quantity] = Field(None, alias="quantity", serialization_alias="quantity")
    reason_code: Optional[L[CodeableConcept]] = Field(None, alias="reasonCode", serialization_alias="reasonCode")
    reason_reference: Optional[L[Reference]] = Field(None, alias="reasonReference", serialization_alias="reasonReference")
    requester: Optional[Reference] = Field(None, alias="requester", serialization_alias="requester")
    status: Optional[Literal["draft", "active", "suspended", "cancelled", "completed", "entered-in-error", "unknown"]] = Field(None, alias="status", serialization_alias="status")
    supplier: Optional[L[Reference]] = Field(None, alias="supplier", serialization_alias="supplier")

