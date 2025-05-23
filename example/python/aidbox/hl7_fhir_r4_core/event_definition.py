# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import Optional, List as L, Literal, ForwardRef

from aidbox.hl7_fhir_r4_core.base import CodeableConcept, ContactDetail, Identifier, Period, Reference, RelatedArtifact, TriggerDefinition, UsageContext
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class EventDefinition(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='EventDefinition',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='EventDefinition'
    )
    
    approval_date: Optional[str] = Field(None, alias="approvalDate", serialization_alias="approvalDate")
    author: Optional[L[ContactDetail]] = Field(None, alias="author", serialization_alias="author")
    contact: Optional[L[ContactDetail]] = Field(None, alias="contact", serialization_alias="contact")
    copyright: Optional[str] = Field(None, alias="copyright", serialization_alias="copyright")
    date: Optional[str] = Field(None, alias="date", serialization_alias="date")
    description: Optional[str] = Field(None, alias="description", serialization_alias="description")
    editor: Optional[L[ContactDetail]] = Field(None, alias="editor", serialization_alias="editor")
    effective_period: Optional[Period] = Field(None, alias="effectivePeriod", serialization_alias="effectivePeriod")
    endorser: Optional[L[ContactDetail]] = Field(None, alias="endorser", serialization_alias="endorser")
    experimental: Optional[bool] = Field(None, alias="experimental", serialization_alias="experimental")
    identifier: Optional[L[Identifier]] = Field(None, alias="identifier", serialization_alias="identifier")
    jurisdiction: Optional[L[CodeableConcept]] = Field(None, alias="jurisdiction", serialization_alias="jurisdiction")
    last_review_date: Optional[str] = Field(None, alias="lastReviewDate", serialization_alias="lastReviewDate")
    name: Optional[str] = Field(None, alias="name", serialization_alias="name")
    publisher: Optional[str] = Field(None, alias="publisher", serialization_alias="publisher")
    purpose: Optional[str] = Field(None, alias="purpose", serialization_alias="purpose")
    related_artifact: Optional[L[RelatedArtifact]] = Field(None, alias="relatedArtifact", serialization_alias="relatedArtifact")
    reviewer: Optional[L[ContactDetail]] = Field(None, alias="reviewer", serialization_alias="reviewer")
    status: Optional[Literal["draft", "active", "retired", "unknown"]] = Field(None, alias="status", serialization_alias="status")
    subject_codeable_concept: Optional[CodeableConcept] = Field(None, alias="subjectCodeableConcept", serialization_alias="subjectCodeableConcept")
    subject_reference: Optional[Reference] = Field(None, alias="subjectReference", serialization_alias="subjectReference")
    subtitle: Optional[str] = Field(None, alias="subtitle", serialization_alias="subtitle")
    title: Optional[str] = Field(None, alias="title", serialization_alias="title")
    topic: Optional[L[CodeableConcept]] = Field(None, alias="topic", serialization_alias="topic")
    trigger: Optional[L[TriggerDefinition]] = Field(None, alias="trigger", serialization_alias="trigger")
    url: Optional[str] = Field(None, alias="url", serialization_alias="url")
    usage: Optional[str] = Field(None, alias="usage", serialization_alias="usage")
    use_context: Optional[L[UsageContext]] = Field(None, alias="useContext", serialization_alias="useContext")
    version: Optional[str] = Field(None, alias="version", serialization_alias="version")

