# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class CatalogEntryRelatedEntry(BackboneElement):
    item: Optional[Reference] = None
    relationtype: Optional[Literal["triggers", "is-replaced-by"]] = None


class CatalogEntry(DomainResource):
    additional_characteristic: Optional[L[CodeableConcept]] = None
    additional_classification: Optional[L[CodeableConcept]] = None
    additional_identifier: Optional[L[Identifier]] = None
    classification: Optional[L[CodeableConcept]] = None
    identifier: Optional[L[Identifier]] = None
    last_updated: Optional[str] = None
    orderable: Optional[bool] = None
    referenced_item: Optional[Reference] = None
    related_entry: Optional[L[CatalogEntryRelatedEntry]] = None
    status: Optional[Literal["draft", "active", "retired", "unknown"]] = None
    type: Optional[CodeableConcept] = None
    validity_period: Optional[Period] = None
    valid_to: Optional[str] = None

