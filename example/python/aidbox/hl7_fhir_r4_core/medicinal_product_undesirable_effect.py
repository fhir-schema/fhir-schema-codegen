# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import List as PyList, Literal

from aidbox.hl7_fhir_r4_core.base import CodeableConcept, Population, Reference
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class MedicinalProductUndesirableEffect(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='MedicinalProductUndesirableEffect',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='MedicinalProductUndesirableEffect'
    )
    
    classification: CodeableConcept | None = Field(None, alias="classification", serialization_alias="classification")
    frequency_of_occurrence: CodeableConcept | None = Field(None, alias="frequencyOfOccurrence", serialization_alias="frequencyOfOccurrence")
    population: PyList[Population] | None = Field(None, alias="population", serialization_alias="population")
    subject: PyList[Reference] | None = Field(None, alias="subject", serialization_alias="subject")
    symptom_condition_effect: CodeableConcept | None = Field(None, alias="symptomConditionEffect", serialization_alias="symptomConditionEffect")
    
    def to_json(self, indent: int | None = None) -> str:
        return self.model_dump_json(exclude_unset=True, exclude_none=True, indent=indent)
    
    @classmethod
    def from_json(cls, json: str) -> MedicinalProductUndesirableEffect:
        return cls.model_validate_json(json)

