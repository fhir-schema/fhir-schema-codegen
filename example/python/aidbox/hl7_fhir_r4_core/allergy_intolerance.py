# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import List as PyList, Literal

from aidbox.hl7_fhir_r4_core.base import \
    Age, Annotation, BackboneElement, CodeableConcept, Identifier, Period, Range, Reference
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class AllergyIntoleranceReaction(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    description: str | None = Field(None, alias="description", serialization_alias="description")
    exposure_route: CodeableConcept | None = Field(None, alias="exposureRoute", serialization_alias="exposureRoute")
    manifestation: PyList[CodeableConcept] = Field(alias="manifestation", serialization_alias="manifestation")
    note: PyList[Annotation] | None = Field(None, alias="note", serialization_alias="note")
    onset: str | None = Field(None, alias="onset", serialization_alias="onset")
    severity: Literal["mild", "moderate", "severe"] | None = Field(None, alias="severity", serialization_alias="severity")
    substance: CodeableConcept | None = Field(None, alias="substance", serialization_alias="substance")


class AllergyIntolerance(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='AllergyIntolerance',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='AllergyIntolerance'
    )
    
    asserter: Reference | None = Field(None, alias="asserter", serialization_alias="asserter")
    category: PyList[Literal["food", "medication", "environment", "biologic"]] | None = Field(None, alias="category", serialization_alias="category")
    clinical_status: CodeableConcept | None = Field(None, alias="clinicalStatus", serialization_alias="clinicalStatus")
    code: CodeableConcept | None = Field(None, alias="code", serialization_alias="code")
    criticality: Literal["low", "high", "unable-to-assess"] | None = Field(None, alias="criticality", serialization_alias="criticality")
    encounter: Reference | None = Field(None, alias="encounter", serialization_alias="encounter")
    identifier: PyList[Identifier] | None = Field(None, alias="identifier", serialization_alias="identifier")
    last_occurrence: str | None = Field(None, alias="lastOccurrence", serialization_alias="lastOccurrence")
    note: PyList[Annotation] | None = Field(None, alias="note", serialization_alias="note")
    onset_age: Age | None = Field(None, alias="onsetAge", serialization_alias="onsetAge")
    onset_date_time: str | None = Field(None, alias="onsetDateTime", serialization_alias="onsetDateTime")
    onset_period: Period | None = Field(None, alias="onsetPeriod", serialization_alias="onsetPeriod")
    onset_range: Range | None = Field(None, alias="onsetRange", serialization_alias="onsetRange")
    onset_string: str | None = Field(None, alias="onsetString", serialization_alias="onsetString")
    patient: Reference = Field(alias="patient", serialization_alias="patient")
    reaction: PyList[AllergyIntoleranceReaction] | None = Field(None, alias="reaction", serialization_alias="reaction")
    recorded_date: str | None = Field(None, alias="recordedDate", serialization_alias="recordedDate")
    recorder: Reference | None = Field(None, alias="recorder", serialization_alias="recorder")
    type: Literal["allergy", "intolerance"] | None = Field(None, alias="type", serialization_alias="type")
    verification_status: CodeableConcept | None = Field(None, alias="verificationStatus", serialization_alias="verificationStatus")
    
    def to_json(self, indent: int | None = None) -> str:
        return self.model_dump_json(exclude_unset=True, exclude_none=True, indent=indent)
    
    @classmethod
    def from_json(cls, json: str) -> AllergyIntolerance:
        return cls.model_validate_json(json)

