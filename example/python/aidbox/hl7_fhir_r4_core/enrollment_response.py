# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class EnrollmentResponse(DomainResource):
    created: Optional[str] = None
    disposition: Optional[str] = None
    identifier: Optional[L[Identifier]] = None
    organization: Optional[Reference] = None
    outcome: Optional[Literal["queued", "complete", "error", "partial"]] = None
    request: Optional[Reference] = None
    request_provider: Optional[Reference] = None
    status: Optional[Literal["active", "cancelled", "draft", "entered-in-error"]] = None

