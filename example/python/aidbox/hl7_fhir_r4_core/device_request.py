# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class DeviceRequestParameter(BackboneElement):
    code: Optional[CodeableConcept] = None
    value_boolean: Optional[bool] = None
    value_codeable_concept: Optional[CodeableConcept] = None
    value_quantity: Optional[Quantity] = None
    value_range: Optional[Range] = None


class DeviceRequest(DomainResource):
    authored_on: Optional[str] = None
    based_on: Optional[L[Reference]] = None
    code_codeable_concept: Optional[CodeableConcept] = None
    code_reference: Optional[Reference] = None
    encounter: Optional[Reference] = None
    group_identifier: Optional[Identifier] = None
    identifier: Optional[L[Identifier]] = None
    instantiates_canonical: Optional[L[str]] = None
    instantiates_uri: Optional[L[str]] = None
    insurance: Optional[L[Reference]] = None
    intent: Optional[Literal["proposal", "plan", "directive", "order", "option"]] = None
    note: Optional[L[Annotation]] = None
    occurrence_date_time: Optional[str] = None
    occurrence_period: Optional[Period] = None
    occurrence_timing: Optional[Timing] = None
    parameter: Optional[L[DeviceRequestParameter]] = None
    performer: Optional[Reference] = None
    performer_type: Optional[CodeableConcept] = None
    priority: Optional[Literal["routine", "urgent", "asap", "stat"]] = None
    prior_request: Optional[L[Reference]] = None
    reason_code: Optional[L[CodeableConcept]] = None
    reason_reference: Optional[L[Reference]] = None
    relevant_history: Optional[L[Reference]] = None
    requester: Optional[Reference] = None
    status: Optional[Literal["draft", "active", "on-hold", "revoked", "completed", "entered-in-error", "unknown"]] = None
    subject: Optional[Reference] = None
    supporting_info: Optional[L[Reference]] = None

