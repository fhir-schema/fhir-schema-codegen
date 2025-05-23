# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import Optional, List as L, Literal, ForwardRef

from aidbox.hl7_fhir_r4_core.base import Address, Attachment, BackboneElement, CodeableConcept, Identifier, Money, Period, Quantity, Reference
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class ClaimResponseInsurance(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    business_arrangement: Optional[str] = Field(None, alias="businessArrangement", serialization_alias="businessArrangement")
    claim_response: Optional[Reference] = Field(None, alias="claimResponse", serialization_alias="claimResponse")
    coverage: Optional[Reference] = Field(None, alias="coverage", serialization_alias="coverage")
    focal: Optional[bool] = Field(None, alias="focal", serialization_alias="focal")
    sequence: Optional[PositiveInt] = Field(None, alias="sequence", serialization_alias="sequence")

class ClaimResponseProcessNote(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    language: Optional[CodeableConcept] = Field(None, alias="language", serialization_alias="language")
    number: Optional[PositiveInt] = Field(None, alias="number", serialization_alias="number")
    text: Optional[str] = Field(None, alias="text", serialization_alias="text")
    type: Optional[Literal["display", "print", "printoper"]] = Field(None, alias="type", serialization_alias="type")

class ClaimResponsePayment(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    adjustment: Optional[Money] = Field(None, alias="adjustment", serialization_alias="adjustment")
    adjustment_reason: Optional[CodeableConcept] = Field(None, alias="adjustmentReason", serialization_alias="adjustmentReason")
    amount: Optional[Money] = Field(None, alias="amount", serialization_alias="amount")
    date: Optional[str] = Field(None, alias="date", serialization_alias="date")
    identifier: Optional[Identifier] = Field(None, alias="identifier", serialization_alias="identifier")
    type: Optional[CodeableConcept] = Field(None, alias="type", serialization_alias="type")

class ClaimResponseItemAdjudication(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    amount: Optional[Money] = Field(None, alias="amount", serialization_alias="amount")
    category: Optional[CodeableConcept] = Field(None, alias="category", serialization_alias="category")
    reason: Optional[CodeableConcept] = Field(None, alias="reason", serialization_alias="reason")
    value: Optional[float] = Field(None, alias="value", serialization_alias="value")

class ClaimResponseItemDetailSubDetail(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    adjudication: Optional[L[ClaimResponseItemAdjudication]] = Field(None, alias="adjudication", serialization_alias="adjudication")
    note_number: Optional[L[PositiveInt]] = Field(None, alias="noteNumber", serialization_alias="noteNumber")
    sub_detail_sequence: Optional[PositiveInt] = Field(None, alias="subDetailSequence", serialization_alias="subDetailSequence")

class ClaimResponseItemDetail(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    adjudication: Optional[L[ClaimResponseItemAdjudication]] = Field(None, alias="adjudication", serialization_alias="adjudication")
    detail_sequence: Optional[PositiveInt] = Field(None, alias="detailSequence", serialization_alias="detailSequence")
    note_number: Optional[L[PositiveInt]] = Field(None, alias="noteNumber", serialization_alias="noteNumber")
    sub_detail: Optional[L[ClaimResponseItemDetailSubDetail]] = Field(None, alias="subDetail", serialization_alias="subDetail")

class ClaimResponseItem(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    adjudication: Optional[L[ClaimResponseItemAdjudication]] = Field(None, alias="adjudication", serialization_alias="adjudication")
    detail: Optional[L[ClaimResponseItemDetail]] = Field(None, alias="detail", serialization_alias="detail")
    item_sequence: Optional[PositiveInt] = Field(None, alias="itemSequence", serialization_alias="itemSequence")
    note_number: Optional[L[PositiveInt]] = Field(None, alias="noteNumber", serialization_alias="noteNumber")

class ClaimResponseTotal(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    amount: Optional[Money] = Field(None, alias="amount", serialization_alias="amount")
    category: Optional[CodeableConcept] = Field(None, alias="category", serialization_alias="category")

class ClaimResponseError(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    code: Optional[CodeableConcept] = Field(None, alias="code", serialization_alias="code")
    detail_sequence: Optional[PositiveInt] = Field(None, alias="detailSequence", serialization_alias="detailSequence")
    item_sequence: Optional[PositiveInt] = Field(None, alias="itemSequence", serialization_alias="itemSequence")
    sub_detail_sequence: Optional[PositiveInt] = Field(None, alias="subDetailSequence", serialization_alias="subDetailSequence")

class ClaimResponseAddItemDetailSubDetail(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    adjudication: Optional[L[ClaimResponseItemAdjudication]] = Field(None, alias="adjudication", serialization_alias="adjudication")
    factor: Optional[float] = Field(None, alias="factor", serialization_alias="factor")
    modifier: Optional[L[CodeableConcept]] = Field(None, alias="modifier", serialization_alias="modifier")
    net: Optional[Money] = Field(None, alias="net", serialization_alias="net")
    note_number: Optional[L[PositiveInt]] = Field(None, alias="noteNumber", serialization_alias="noteNumber")
    product_or_service: Optional[CodeableConcept] = Field(None, alias="productOrService", serialization_alias="productOrService")
    quantity: Optional[Quantity] = Field(None, alias="quantity", serialization_alias="quantity")
    unit_price: Optional[Money] = Field(None, alias="unitPrice", serialization_alias="unitPrice")

class ClaimResponseAddItemDetail(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    adjudication: Optional[L[ClaimResponseItemAdjudication]] = Field(None, alias="adjudication", serialization_alias="adjudication")
    factor: Optional[float] = Field(None, alias="factor", serialization_alias="factor")
    modifier: Optional[L[CodeableConcept]] = Field(None, alias="modifier", serialization_alias="modifier")
    net: Optional[Money] = Field(None, alias="net", serialization_alias="net")
    note_number: Optional[L[PositiveInt]] = Field(None, alias="noteNumber", serialization_alias="noteNumber")
    product_or_service: Optional[CodeableConcept] = Field(None, alias="productOrService", serialization_alias="productOrService")
    quantity: Optional[Quantity] = Field(None, alias="quantity", serialization_alias="quantity")
    sub_detail: Optional[L[ClaimResponseAddItemDetailSubDetail]] = Field(None, alias="subDetail", serialization_alias="subDetail")
    unit_price: Optional[Money] = Field(None, alias="unitPrice", serialization_alias="unitPrice")

class ClaimResponseAddItem(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    adjudication: Optional[L[ClaimResponseItemAdjudication]] = Field(None, alias="adjudication", serialization_alias="adjudication")
    body_site: Optional[CodeableConcept] = Field(None, alias="bodySite", serialization_alias="bodySite")
    detail: Optional[L[ClaimResponseAddItemDetail]] = Field(None, alias="detail", serialization_alias="detail")
    detail_sequence: Optional[L[PositiveInt]] = Field(None, alias="detailSequence", serialization_alias="detailSequence")
    factor: Optional[float] = Field(None, alias="factor", serialization_alias="factor")
    item_sequence: Optional[L[PositiveInt]] = Field(None, alias="itemSequence", serialization_alias="itemSequence")
    location_address: Optional[Address] = Field(None, alias="locationAddress", serialization_alias="locationAddress")
    location_codeable_concept: Optional[CodeableConcept] = Field(None, alias="locationCodeableConcept", serialization_alias="locationCodeableConcept")
    location_reference: Optional[Reference] = Field(None, alias="locationReference", serialization_alias="locationReference")
    modifier: Optional[L[CodeableConcept]] = Field(None, alias="modifier", serialization_alias="modifier")
    net: Optional[Money] = Field(None, alias="net", serialization_alias="net")
    note_number: Optional[L[PositiveInt]] = Field(None, alias="noteNumber", serialization_alias="noteNumber")
    product_or_service: Optional[CodeableConcept] = Field(None, alias="productOrService", serialization_alias="productOrService")
    program_code: Optional[L[CodeableConcept]] = Field(None, alias="programCode", serialization_alias="programCode")
    provider: Optional[L[Reference]] = Field(None, alias="provider", serialization_alias="provider")
    quantity: Optional[Quantity] = Field(None, alias="quantity", serialization_alias="quantity")
    serviced_date: Optional[str] = Field(None, alias="servicedDate", serialization_alias="servicedDate")
    serviced_period: Optional[Period] = Field(None, alias="servicedPeriod", serialization_alias="servicedPeriod")
    subdetail_sequence: Optional[L[PositiveInt]] = Field(None, alias="subdetailSequence", serialization_alias="subdetailSequence")
    sub_site: Optional[L[CodeableConcept]] = Field(None, alias="subSite", serialization_alias="subSite")
    unit_price: Optional[Money] = Field(None, alias="unitPrice", serialization_alias="unitPrice")


class ClaimResponse(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='ClaimResponse',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='ClaimResponse'
    )
    
    add_item: Optional[L[ClaimResponseAddItem]] = Field(None, alias="addItem", serialization_alias="addItem")
    adjudication: Optional[L[ClaimResponseItemAdjudication]] = Field(None, alias="adjudication", serialization_alias="adjudication")
    communication_request: Optional[L[Reference]] = Field(None, alias="communicationRequest", serialization_alias="communicationRequest")
    created: Optional[str] = Field(None, alias="created", serialization_alias="created")
    disposition: Optional[str] = Field(None, alias="disposition", serialization_alias="disposition")
    error: Optional[L[ClaimResponseError]] = Field(None, alias="error", serialization_alias="error")
    form: Optional[Attachment] = Field(None, alias="form", serialization_alias="form")
    form_code: Optional[CodeableConcept] = Field(None, alias="formCode", serialization_alias="formCode")
    funds_reserve: Optional[CodeableConcept] = Field(None, alias="fundsReserve", serialization_alias="fundsReserve")
    identifier: Optional[L[Identifier]] = Field(None, alias="identifier", serialization_alias="identifier")
    insurance: Optional[L[ClaimResponseInsurance]] = Field(None, alias="insurance", serialization_alias="insurance")
    insurer: Optional[Reference] = Field(None, alias="insurer", serialization_alias="insurer")
    item: Optional[L[ClaimResponseItem]] = Field(None, alias="item", serialization_alias="item")
    outcome: Optional[Literal["queued", "complete", "error", "partial"]] = Field(None, alias="outcome", serialization_alias="outcome")
    patient: Optional[Reference] = Field(None, alias="patient", serialization_alias="patient")
    payee_type: Optional[CodeableConcept] = Field(None, alias="payeeType", serialization_alias="payeeType")
    payment: Optional[ClaimResponsePayment] = Field(None, alias="payment", serialization_alias="payment")
    pre_auth_period: Optional[Period] = Field(None, alias="preAuthPeriod", serialization_alias="preAuthPeriod")
    pre_auth_ref: Optional[str] = Field(None, alias="preAuthRef", serialization_alias="preAuthRef")
    process_note: Optional[L[ClaimResponseProcessNote]] = Field(None, alias="processNote", serialization_alias="processNote")
    request: Optional[Reference] = Field(None, alias="request", serialization_alias="request")
    requestor: Optional[Reference] = Field(None, alias="requestor", serialization_alias="requestor")
    status: Optional[Literal["active", "cancelled", "draft", "entered-in-error"]] = Field(None, alias="status", serialization_alias="status")
    sub_type: Optional[CodeableConcept] = Field(None, alias="subType", serialization_alias="subType")
    total: Optional[L[ClaimResponseTotal]] = Field(None, alias="total", serialization_alias="total")
    type: Optional[CodeableConcept] = Field(None, alias="type", serialization_alias="type")
    use: Optional[Literal["claim", "preauthorization", "predetermination"]] = Field(None, alias="use", serialization_alias="use")

