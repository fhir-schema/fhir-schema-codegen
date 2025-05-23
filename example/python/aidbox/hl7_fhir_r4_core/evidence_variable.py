# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import Optional, List as L, Literal, ForwardRef

from aidbox.hl7_fhir_r4_core.base import Annotation, BackboneElement, CodeableConcept, ContactDetail, DataRequirement, Duration, Expression, Identifier, Period, Reference, RelatedArtifact, Timing, TriggerDefinition, UsageContext
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class EvidenceVariableCharacteristic(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    definition_canonical: Optional[str] = Field(None, alias="definitionCanonical", serialization_alias="definitionCanonical")
    definition_codeable_concept: Optional[CodeableConcept] = Field(None, alias="definitionCodeableConcept", serialization_alias="definitionCodeableConcept")
    definition_data_requirement: Optional[DataRequirement] = Field(None, alias="definitionDataRequirement", serialization_alias="definitionDataRequirement")
    definition_expression: Optional[Expression] = Field(None, alias="definitionExpression", serialization_alias="definitionExpression")
    definition_reference: Optional[Reference] = Field(None, alias="definitionReference", serialization_alias="definitionReference")
    definition_trigger_definition: Optional[TriggerDefinition] = Field(None, alias="definitionTriggerDefinition", serialization_alias="definitionTriggerDefinition")
    description: Optional[str] = Field(None, alias="description", serialization_alias="description")
    exclude: Optional[bool] = Field(None, alias="exclude", serialization_alias="exclude")
    group_measure: Optional[Literal["mean", "median", "mean-of-mean", "mean-of-median", "median-of-mean", "median-of-median"]] = Field(None, alias="groupMeasure", serialization_alias="groupMeasure")
    participant_effective_date_time: Optional[str] = Field(None, alias="participantEffectiveDateTime", serialization_alias="participantEffectiveDateTime")
    participant_effective_duration: Optional[Duration] = Field(None, alias="participantEffectiveDuration", serialization_alias="participantEffectiveDuration")
    participant_effective_period: Optional[Period] = Field(None, alias="participantEffectivePeriod", serialization_alias="participantEffectivePeriod")
    participant_effective_timing: Optional[Timing] = Field(None, alias="participantEffectiveTiming", serialization_alias="participantEffectiveTiming")
    time_from_start: Optional[Duration] = Field(None, alias="timeFromStart", serialization_alias="timeFromStart")
    usage_context: Optional[L[UsageContext]] = Field(None, alias="usageContext", serialization_alias="usageContext")


class EvidenceVariable(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='EvidenceVariable',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='EvidenceVariable'
    )
    
    approval_date: Optional[str] = Field(None, alias="approvalDate", serialization_alias="approvalDate")
    author: Optional[L[ContactDetail]] = Field(None, alias="author", serialization_alias="author")
    characteristic: Optional[L[EvidenceVariableCharacteristic]] = Field(None, alias="characteristic", serialization_alias="characteristic")
    contact: Optional[L[ContactDetail]] = Field(None, alias="contact", serialization_alias="contact")
    copyright: Optional[str] = Field(None, alias="copyright", serialization_alias="copyright")
    date: Optional[str] = Field(None, alias="date", serialization_alias="date")
    description: Optional[str] = Field(None, alias="description", serialization_alias="description")
    editor: Optional[L[ContactDetail]] = Field(None, alias="editor", serialization_alias="editor")
    effective_period: Optional[Period] = Field(None, alias="effectivePeriod", serialization_alias="effectivePeriod")
    endorser: Optional[L[ContactDetail]] = Field(None, alias="endorser", serialization_alias="endorser")
    identifier: Optional[L[Identifier]] = Field(None, alias="identifier", serialization_alias="identifier")
    jurisdiction: Optional[L[CodeableConcept]] = Field(None, alias="jurisdiction", serialization_alias="jurisdiction")
    last_review_date: Optional[str] = Field(None, alias="lastReviewDate", serialization_alias="lastReviewDate")
    name: Optional[str] = Field(None, alias="name", serialization_alias="name")
    note: Optional[L[Annotation]] = Field(None, alias="note", serialization_alias="note")
    publisher: Optional[str] = Field(None, alias="publisher", serialization_alias="publisher")
    related_artifact: Optional[L[RelatedArtifact]] = Field(None, alias="relatedArtifact", serialization_alias="relatedArtifact")
    reviewer: Optional[L[ContactDetail]] = Field(None, alias="reviewer", serialization_alias="reviewer")
    short_title: Optional[str] = Field(None, alias="shortTitle", serialization_alias="shortTitle")
    status: Optional[Literal["draft", "active", "retired", "unknown"]] = Field(None, alias="status", serialization_alias="status")
    subtitle: Optional[str] = Field(None, alias="subtitle", serialization_alias="subtitle")
    title: Optional[str] = Field(None, alias="title", serialization_alias="title")
    topic: Optional[L[CodeableConcept]] = Field(None, alias="topic", serialization_alias="topic")
    type: Optional[Literal["dichotomous", "continuous", "descriptive"]] = Field(None, alias="type", serialization_alias="type")
    url: Optional[str] = Field(None, alias="url", serialization_alias="url")
    use_context: Optional[L[UsageContext]] = Field(None, alias="useContext", serialization_alias="useContext")
    version: Optional[str] = Field(None, alias="version", serialization_alias="version")

