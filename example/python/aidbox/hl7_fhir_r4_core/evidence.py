# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class Evidence(DomainResource):
    approval_date: Optional[str] = None
    author: Optional[L[ContactDetail]] = None
    contact: Optional[L[ContactDetail]] = None
    copyright: Optional[str] = None
    date: Optional[str] = None
    description: Optional[str] = None
    editor: Optional[L[ContactDetail]] = None
    effective_period: Optional[Period] = None
    endorser: Optional[L[ContactDetail]] = None
    exposure_background: Optional[Reference] = None
    exposure_variant: Optional[L[Reference]] = None
    identifier: Optional[L[Identifier]] = None
    jurisdiction: Optional[L[CodeableConcept]] = None
    last_review_date: Optional[str] = None
    name: Optional[str] = None
    note: Optional[L[Annotation]] = None
    outcome: Optional[L[Reference]] = None
    publisher: Optional[str] = None
    related_artifact: Optional[L[RelatedArtifact]] = None
    reviewer: Optional[L[ContactDetail]] = None
    short_title: Optional[str] = None
    status: Optional[Literal["draft", "active", "retired", "unknown"]] = None
    subtitle: Optional[str] = None
    title: Optional[str] = None
    topic: Optional[L[CodeableConcept]] = None
    url: Optional[str] = None
    use_context: Optional[L[UsageContext]] = None
    version: Optional[str] = None

