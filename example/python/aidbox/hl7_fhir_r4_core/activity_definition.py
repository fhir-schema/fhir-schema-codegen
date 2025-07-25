# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import List as PyList, Literal

from aidbox.hl7_fhir_r4_core.base import \
    Age, BackboneElement, CodeableConcept, ContactDetail, Dosage, Duration, Expression, Identifier, Period, \
    Quantity, Range, Reference, RelatedArtifact, Timing, UsageContext
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class ActivityDefinitionDynamicValue(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    expression: Expression = Field(alias="expression", serialization_alias="expression")
    path: str = Field(alias="path", serialization_alias="path")

class ActivityDefinitionParticipant(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    role: CodeableConcept | None = Field(None, alias="role", serialization_alias="role")
    type: Literal["patient", "practitioner", "related-person", "device"] = Field(alias="type", serialization_alias="type")


class ActivityDefinition(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='ActivityDefinition',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='ActivityDefinition'
    )
    
    approval_date: str | None = Field(None, alias="approvalDate", serialization_alias="approvalDate")
    author: PyList[ContactDetail] | None = Field(None, alias="author", serialization_alias="author")
    body_site: PyList[CodeableConcept] | None = Field(None, alias="bodySite", serialization_alias="bodySite")
    code: CodeableConcept | None = Field(None, alias="code", serialization_alias="code")
    contact: PyList[ContactDetail] | None = Field(None, alias="contact", serialization_alias="contact")
    copyright: str | None = Field(None, alias="copyright", serialization_alias="copyright")
    date: str | None = Field(None, alias="date", serialization_alias="date")
    description: str | None = Field(None, alias="description", serialization_alias="description")
    do_not_perform: bool | None = Field(None, alias="doNotPerform", serialization_alias="doNotPerform")
    dosage: PyList[Dosage] | None = Field(None, alias="dosage", serialization_alias="dosage")
    dynamic_value: PyList[ActivityDefinitionDynamicValue] | None = Field(None, alias="dynamicValue", serialization_alias="dynamicValue")
    editor: PyList[ContactDetail] | None = Field(None, alias="editor", serialization_alias="editor")
    effective_period: Period | None = Field(None, alias="effectivePeriod", serialization_alias="effectivePeriod")
    endorser: PyList[ContactDetail] | None = Field(None, alias="endorser", serialization_alias="endorser")
    experimental: bool | None = Field(None, alias="experimental", serialization_alias="experimental")
    identifier: PyList[Identifier] | None = Field(None, alias="identifier", serialization_alias="identifier")
    intent: Literal["proposal", "plan", "directive", "order", "option", "original-order", "reflex-order", "filler-order", "instance-order"] | None = Field(None, alias="intent", serialization_alias="intent")
    jurisdiction: PyList[CodeableConcept] | None = Field(None, alias="jurisdiction", serialization_alias="jurisdiction")
    kind: Literal["Appointment", "AppointmentResponse", "CarePlan", "Claim", "CommunicationRequest", "Contract", "DeviceRequest", "EnrollmentRequest", "ImmunizationRecommendation", "MedicationRequest", "NutritionOrder", "ServiceRequest", "SupplyRequest", "Task", "VisionPrescription"] | None = Field(None, alias="kind", serialization_alias="kind")
    last_review_date: str | None = Field(None, alias="lastReviewDate", serialization_alias="lastReviewDate")
    library: PyList[str] | None = Field(None, alias="library", serialization_alias="library")
    location: Reference | None = Field(None, alias="location", serialization_alias="location")
    name: str | None = Field(None, alias="name", serialization_alias="name")
    observation_requirement: PyList[Reference] | None = Field(None, alias="observationRequirement", serialization_alias="observationRequirement")
    observation_result_requirement: PyList[Reference] | None = Field(None, alias="observationResultRequirement", serialization_alias="observationResultRequirement")
    participant: PyList[ActivityDefinitionParticipant] | None = Field(None, alias="participant", serialization_alias="participant")
    priority: Literal["routine", "urgent", "asap", "stat"] | None = Field(None, alias="priority", serialization_alias="priority")
    product_codeable_concept: CodeableConcept | None = Field(None, alias="productCodeableConcept", serialization_alias="productCodeableConcept")
    product_reference: Reference | None = Field(None, alias="productReference", serialization_alias="productReference")
    profile: str | None = Field(None, alias="profile", serialization_alias="profile")
    publisher: str | None = Field(None, alias="publisher", serialization_alias="publisher")
    purpose: str | None = Field(None, alias="purpose", serialization_alias="purpose")
    quantity: Quantity | None = Field(None, alias="quantity", serialization_alias="quantity")
    related_artifact: PyList[RelatedArtifact] | None = Field(None, alias="relatedArtifact", serialization_alias="relatedArtifact")
    reviewer: PyList[ContactDetail] | None = Field(None, alias="reviewer", serialization_alias="reviewer")
    specimen_requirement: PyList[Reference] | None = Field(None, alias="specimenRequirement", serialization_alias="specimenRequirement")
    status: Literal["draft", "active", "retired", "unknown"] = Field(alias="status", serialization_alias="status")
    subject_codeable_concept: CodeableConcept | None = Field(None, alias="subjectCodeableConcept", serialization_alias="subjectCodeableConcept")
    subject_reference: Reference | None = Field(None, alias="subjectReference", serialization_alias="subjectReference")
    subtitle: str | None = Field(None, alias="subtitle", serialization_alias="subtitle")
    timing_age: Age | None = Field(None, alias="timingAge", serialization_alias="timingAge")
    timing_date_time: str | None = Field(None, alias="timingDateTime", serialization_alias="timingDateTime")
    timing_duration: Duration | None = Field(None, alias="timingDuration", serialization_alias="timingDuration")
    timing_period: Period | None = Field(None, alias="timingPeriod", serialization_alias="timingPeriod")
    timing_range: Range | None = Field(None, alias="timingRange", serialization_alias="timingRange")
    timing_timing: Timing | None = Field(None, alias="timingTiming", serialization_alias="timingTiming")
    title: str | None = Field(None, alias="title", serialization_alias="title")
    topic: PyList[CodeableConcept] | None = Field(None, alias="topic", serialization_alias="topic")
    transform: str | None = Field(None, alias="transform", serialization_alias="transform")
    url: str | None = Field(None, alias="url", serialization_alias="url")
    usage: str | None = Field(None, alias="usage", serialization_alias="usage")
    use_context: PyList[UsageContext] | None = Field(None, alias="useContext", serialization_alias="useContext")
    version: str | None = Field(None, alias="version", serialization_alias="version")
    
    def to_json(self, indent: int | None = None) -> str:
        return self.model_dump_json(exclude_unset=True, exclude_none=True, indent=indent)
    
    @classmethod
    def from_json(cls, json: str) -> ActivityDefinition:
        return cls.model_validate_json(json)

