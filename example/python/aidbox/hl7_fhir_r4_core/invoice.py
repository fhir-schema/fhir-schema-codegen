# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class InvoiceParticipant(BackboneElement):
    actor: Optional[Reference] = None
    role: Optional[CodeableConcept] = None

class InvoiceLineItemPriceComponent(BackboneElement):
    amount: Optional[Money] = None
    code: Optional[CodeableConcept] = None
    factor: Optional[float] = None
    type: Optional[Literal["base", "surcharge", "deduction", "discount", "tax", "informational"]] = None

class InvoiceLineItem(BackboneElement):
    charge_item_codeable_concept: Optional[CodeableConcept] = None
    charge_item_reference: Optional[Reference] = None
    price_component: Optional[L[InvoiceLineItemPriceComponent]] = None
    sequence: Optional[PositiveInt] = None


class Invoice(DomainResource):
    account: Optional[Reference] = None
    cancelled_reason: Optional[str] = None
    date: Optional[str] = None
    identifier: Optional[L[Identifier]] = None
    issuer: Optional[Reference] = None
    line_item: Optional[L[InvoiceLineItem]] = None
    note: Optional[L[Annotation]] = None
    participant: Optional[L[InvoiceParticipant]] = None
    payment_terms: Optional[str] = None
    recipient: Optional[Reference] = None
    status: Optional[Literal["draft", "issued", "balanced", "cancelled", "entered-in-error"]] = None
    subject: Optional[Reference] = None
    total_gross: Optional[Money] = None
    total_net: Optional[Money] = None
    total_price_component: Optional[L[InvoiceLineItemPriceComponent]] = None
    type: Optional[CodeableConcept] = None

