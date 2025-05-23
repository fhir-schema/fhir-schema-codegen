# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import Optional, List as L, Literal, ForwardRef

from aidbox.hl7_fhir_r4_core.base import Annotation, BackboneElement, CodeableConcept, Identifier, Period, Quantity, Ratio, Reference
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class MedicationAdministrationDosage(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    dose: Optional[Quantity] = Field(None, alias="dose", serialization_alias="dose")
    method: Optional[CodeableConcept] = Field(None, alias="method", serialization_alias="method")
    rate_quantity: Optional[Quantity] = Field(None, alias="rateQuantity", serialization_alias="rateQuantity")
    rate_ratio: Optional[Ratio] = Field(None, alias="rateRatio", serialization_alias="rateRatio")
    route: Optional[CodeableConcept] = Field(None, alias="route", serialization_alias="route")
    site: Optional[CodeableConcept] = Field(None, alias="site", serialization_alias="site")
    text: Optional[str] = Field(None, alias="text", serialization_alias="text")

class MedicationAdministrationPerformer(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    actor: Optional[Reference] = Field(None, alias="actor", serialization_alias="actor")
    function: Optional[CodeableConcept] = Field(None, alias="function", serialization_alias="function")


class MedicationAdministration(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='MedicationAdministration',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='MedicationAdministration'
    )
    
    category: Optional[CodeableConcept] = Field(None, alias="category", serialization_alias="category")
    context: Optional[Reference] = Field(None, alias="context", serialization_alias="context")
    device: Optional[L[Reference]] = Field(None, alias="device", serialization_alias="device")
    dosage: Optional[MedicationAdministrationDosage] = Field(None, alias="dosage", serialization_alias="dosage")
    effective_date_time: Optional[str] = Field(None, alias="effectiveDateTime", serialization_alias="effectiveDateTime")
    effective_period: Optional[Period] = Field(None, alias="effectivePeriod", serialization_alias="effectivePeriod")
    event_history: Optional[L[Reference]] = Field(None, alias="eventHistory", serialization_alias="eventHistory")
    identifier: Optional[L[Identifier]] = Field(None, alias="identifier", serialization_alias="identifier")
    instantiates: Optional[L[str]] = Field(None, alias="instantiates", serialization_alias="instantiates")
    medication_codeable_concept: Optional[CodeableConcept] = Field(None, alias="medicationCodeableConcept", serialization_alias="medicationCodeableConcept")
    medication_reference: Optional[Reference] = Field(None, alias="medicationReference", serialization_alias="medicationReference")
    note: Optional[L[Annotation]] = Field(None, alias="note", serialization_alias="note")
    part_of: Optional[L[Reference]] = Field(None, alias="partOf", serialization_alias="partOf")
    performer: Optional[L[MedicationAdministrationPerformer]] = Field(None, alias="performer", serialization_alias="performer")
    reason_code: Optional[L[CodeableConcept]] = Field(None, alias="reasonCode", serialization_alias="reasonCode")
    reason_reference: Optional[L[Reference]] = Field(None, alias="reasonReference", serialization_alias="reasonReference")
    request: Optional[Reference] = Field(None, alias="request", serialization_alias="request")
    status: Optional[Literal["in-progress", "not-done", "on-hold", "completed", "entered-in-error", "stopped", "unknown"]] = Field(None, alias="status", serialization_alias="status")
    status_reason: Optional[L[CodeableConcept]] = Field(None, alias="statusReason", serialization_alias="statusReason")
    subject: Optional[Reference] = Field(None, alias="subject", serialization_alias="subject")
    supporting_information: Optional[L[Reference]] = Field(None, alias="supportingInformation", serialization_alias="supportingInformation")

