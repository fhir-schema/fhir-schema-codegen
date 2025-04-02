# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class SubscriptionChannel(BackboneElement):
    endpoint: Optional[str] = None
    header: Optional[L[str]] = None
    payload: Optional[str] = None
    type: Optional[Literal["rest-hook", "websocket", "email", "sms", "message"]] = None


class Subscription(DomainResource):
    channel: Optional[SubscriptionChannel] = None
    contact: Optional[L[ContactPoint]] = None
    criteria: Optional[str] = None
    end: Optional[str] = None
    error: Optional[str] = None
    reason: Optional[str] = None
    status: Optional[Literal["requested", "active", "error", "off"]] = None

