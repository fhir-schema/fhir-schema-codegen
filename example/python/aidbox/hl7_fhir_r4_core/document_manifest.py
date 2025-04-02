# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class DocumentManifestRelated(BackboneElement):
    identifier: Optional[Identifier] = None
    ref: Optional[Reference] = None


class DocumentManifest(DomainResource):
    author: Optional[L[Reference]] = None
    content: Optional[L[Reference]] = None
    created: Optional[str] = None
    description: Optional[str] = None
    identifier: Optional[L[Identifier]] = None
    master_identifier: Optional[Identifier] = None
    recipient: Optional[L[Reference]] = None
    related: Optional[L[DocumentManifestRelated]] = None
    source: Optional[str] = None
    status: Optional[Literal["current", "superseded", "entered-in-error"]] = None
    subject: Optional[Reference] = None
    type: Optional[CodeableConcept] = None

