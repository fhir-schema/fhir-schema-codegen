# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class AppointmentResponse(DomainResource):
    actor: Optional[Reference] = None
    appointment: Optional[Reference] = None
    comment: Optional[str] = None
    end: Optional[str] = None
    identifier: Optional[L[Identifier]] = None
    participant_status: Optional[Literal["accepted", "declined", "tentative", "needs-action"]] = None
    participant_type: Optional[L[CodeableConcept]] = None
    start: Optional[str] = None

