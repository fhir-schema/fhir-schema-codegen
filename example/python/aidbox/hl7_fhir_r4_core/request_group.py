# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import List as PyList, Literal

from aidbox.hl7_fhir_r4_core.base import \
    Age, Annotation, BackboneElement, CodeableConcept, Duration, Expression, Identifier, Period, Range, Reference, \
    RelatedArtifact, Timing
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class RequestGroupAction(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    action: PyList[RequestGroupAction] | None = Field(None, alias="action", serialization_alias="action")
    cardinality_behavior: Literal["single", "multiple"] | None = Field(None, alias="cardinalityBehavior", serialization_alias="cardinalityBehavior")
    code: PyList[CodeableConcept] | None = Field(None, alias="code", serialization_alias="code")
    condition: PyList[RequestGroupActionCondition] | None = Field(None, alias="condition", serialization_alias="condition")
    description: str | None = Field(None, alias="description", serialization_alias="description")
    documentation: PyList[RelatedArtifact] | None = Field(None, alias="documentation", serialization_alias="documentation")
    grouping_behavior: Literal["visual-group", "logical-group", "sentence-group"] | None = Field(None, alias="groupingBehavior", serialization_alias="groupingBehavior")
    participant: PyList[Reference] | None = Field(None, alias="participant", serialization_alias="participant")
    precheck_behavior: Literal["yes", "no"] | None = Field(None, alias="precheckBehavior", serialization_alias="precheckBehavior")
    prefix: str | None = Field(None, alias="prefix", serialization_alias="prefix")
    priority: Literal["routine", "urgent", "asap", "stat"] | None = Field(None, alias="priority", serialization_alias="priority")
    related_action: PyList[RequestGroupActionRelatedAction] | None = Field(None, alias="relatedAction", serialization_alias="relatedAction")
    required_behavior: Literal["must", "could", "must-unless-documented"] | None = Field(None, alias="requiredBehavior", serialization_alias="requiredBehavior")
    resource: Reference | None = Field(None, alias="resource", serialization_alias="resource")
    selection_behavior: Literal["any", "all", "all-or-none", "exactly-one", "at-most-one", "one-or-more"] | None = Field(None, alias="selectionBehavior", serialization_alias="selectionBehavior")
    text_equivalent: str | None = Field(None, alias="textEquivalent", serialization_alias="textEquivalent")
    timing_age: Age | None = Field(None, alias="timingAge", serialization_alias="timingAge")
    timing_date_time: str | None = Field(None, alias="timingDateTime", serialization_alias="timingDateTime")
    timing_duration: Duration | None = Field(None, alias="timingDuration", serialization_alias="timingDuration")
    timing_period: Period | None = Field(None, alias="timingPeriod", serialization_alias="timingPeriod")
    timing_range: Range | None = Field(None, alias="timingRange", serialization_alias="timingRange")
    timing_timing: Timing | None = Field(None, alias="timingTiming", serialization_alias="timingTiming")
    title: str | None = Field(None, alias="title", serialization_alias="title")
    type: CodeableConcept | None = Field(None, alias="type", serialization_alias="type")

class RequestGroupActionCondition(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    expression: Expression | None = Field(None, alias="expression", serialization_alias="expression")
    kind: Literal["applicability", "start", "stop"] = Field(alias="kind", serialization_alias="kind")

class RequestGroupActionRelatedAction(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    action_id: str = Field(alias="actionId", serialization_alias="actionId")
    offset_duration: Duration | None = Field(None, alias="offsetDuration", serialization_alias="offsetDuration")
    offset_range: Range | None = Field(None, alias="offsetRange", serialization_alias="offsetRange")
    relationship: Literal["before-start", "before", "before-end", "concurrent-with-start", "concurrent", "concurrent-with-end", "after-start", "after", "after-end"] = Field(alias="relationship", serialization_alias="relationship")


class RequestGroup(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='RequestGroup',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='RequestGroup'
    )
    
    action: PyList[RequestGroupAction] | None = Field(None, alias="action", serialization_alias="action")
    author: Reference | None = Field(None, alias="author", serialization_alias="author")
    authored_on: str | None = Field(None, alias="authoredOn", serialization_alias="authoredOn")
    based_on: PyList[Reference] | None = Field(None, alias="basedOn", serialization_alias="basedOn")
    code: CodeableConcept | None = Field(None, alias="code", serialization_alias="code")
    encounter: Reference | None = Field(None, alias="encounter", serialization_alias="encounter")
    group_identifier: Identifier | None = Field(None, alias="groupIdentifier", serialization_alias="groupIdentifier")
    identifier: PyList[Identifier] | None = Field(None, alias="identifier", serialization_alias="identifier")
    instantiates_canonical: PyList[str] | None = Field(None, alias="instantiatesCanonical", serialization_alias="instantiatesCanonical")
    instantiates_uri: PyList[str] | None = Field(None, alias="instantiatesUri", serialization_alias="instantiatesUri")
    intent: Literal["proposal", "plan", "directive", "order", "option", "original-order", "reflex-order", "filler-order", "instance-order"] = Field(alias="intent", serialization_alias="intent")
    note: PyList[Annotation] | None = Field(None, alias="note", serialization_alias="note")
    priority: Literal["routine", "urgent", "asap", "stat"] | None = Field(None, alias="priority", serialization_alias="priority")
    reason_code: PyList[CodeableConcept] | None = Field(None, alias="reasonCode", serialization_alias="reasonCode")
    reason_reference: PyList[Reference] | None = Field(None, alias="reasonReference", serialization_alias="reasonReference")
    replaces: PyList[Reference] | None = Field(None, alias="replaces", serialization_alias="replaces")
    status: Literal["draft", "active", "on-hold", "revoked", "completed", "entered-in-error", "unknown"] = Field(alias="status", serialization_alias="status")
    subject: Reference | None = Field(None, alias="subject", serialization_alias="subject")
    
    def to_json(self, indent: int | None = None) -> str:
        return self.model_dump_json(exclude_unset=True, exclude_none=True, indent=indent)
    
    @classmethod
    def from_json(cls, json: str) -> RequestGroup:
        return cls.model_validate_json(json)

