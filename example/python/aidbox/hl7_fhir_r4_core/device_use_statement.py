# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import List as PyList, Literal

from aidbox.hl7_fhir_r4_core.base import \
    Annotation, CodeableConcept, Identifier, Period, Reference, Timing
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class DeviceUseStatement(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='DeviceUseStatement',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='DeviceUseStatement'
    )
    
    based_on: PyList[Reference] | None = Field(None, alias="basedOn", serialization_alias="basedOn")
    body_site: CodeableConcept | None = Field(None, alias="bodySite", serialization_alias="bodySite")
    derived_from: PyList[Reference] | None = Field(None, alias="derivedFrom", serialization_alias="derivedFrom")
    device: Reference = Field(alias="device", serialization_alias="device")
    identifier: PyList[Identifier] | None = Field(None, alias="identifier", serialization_alias="identifier")
    note: PyList[Annotation] | None = Field(None, alias="note", serialization_alias="note")
    reason_code: PyList[CodeableConcept] | None = Field(None, alias="reasonCode", serialization_alias="reasonCode")
    reason_reference: PyList[Reference] | None = Field(None, alias="reasonReference", serialization_alias="reasonReference")
    recorded_on: str | None = Field(None, alias="recordedOn", serialization_alias="recordedOn")
    source: Reference | None = Field(None, alias="source", serialization_alias="source")
    status: Literal["active", "completed", "entered-in-error", "intended", "stopped", "on-hold"] = Field(alias="status", serialization_alias="status")
    subject: Reference = Field(alias="subject", serialization_alias="subject")
    timing_date_time: str | None = Field(None, alias="timingDateTime", serialization_alias="timingDateTime")
    timing_period: Period | None = Field(None, alias="timingPeriod", serialization_alias="timingPeriod")
    timing_timing: Timing | None = Field(None, alias="timingTiming", serialization_alias="timingTiming")
    
    def to_json(self, indent: int | None = None) -> str:
        return self.model_dump_json(exclude_unset=True, exclude_none=True, indent=indent)
    
    @classmethod
    def from_json(cls, json: str) -> DeviceUseStatement:
        return cls.model_validate_json(json)

