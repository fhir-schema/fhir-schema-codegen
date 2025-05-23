# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import Optional, List as L, Literal, ForwardRef

from aidbox.hl7_fhir_r4_core.base import Annotation, Attachment, BackboneElement, CodeableConcept, Coding, Identifier, Money, Period, Quantity, Reference, Signature, Timing
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class ContractRule(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    content_attachment: Optional[Attachment] = Field(None, alias="contentAttachment", serialization_alias="contentAttachment")
    content_reference: Optional[Reference] = Field(None, alias="contentReference", serialization_alias="contentReference")

class ContractLegal(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    content_attachment: Optional[Attachment] = Field(None, alias="contentAttachment", serialization_alias="contentAttachment")
    content_reference: Optional[Reference] = Field(None, alias="contentReference", serialization_alias="contentReference")

class ContractContentDefinition(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    copyright: Optional[str] = Field(None, alias="copyright", serialization_alias="copyright")
    publication_date: Optional[str] = Field(None, alias="publicationDate", serialization_alias="publicationDate")
    publication_status: Optional[Literal["amended", "appended", "cancelled", "disputed", "entered-in-error", "executable", "executed", "negotiable", "offered", "policy", "rejected", "renewed", "revoked", "resolved", "terminated"]] = Field(None, alias="publicationStatus", serialization_alias="publicationStatus")
    publisher: Optional[Reference] = Field(None, alias="publisher", serialization_alias="publisher")
    sub_type: Optional[CodeableConcept] = Field(None, alias="subType", serialization_alias="subType")
    type: Optional[CodeableConcept] = Field(None, alias="type", serialization_alias="type")

class ContractSigner(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    party: Optional[Reference] = Field(None, alias="party", serialization_alias="party")
    signature: Optional[L[Signature]] = Field(None, alias="signature", serialization_alias="signature")
    type: Optional[Coding] = Field(None, alias="type", serialization_alias="type")

class ContractTermOfferParty(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    reference: Optional[L[Reference]] = Field(None, alias="reference", serialization_alias="reference")
    role: Optional[CodeableConcept] = Field(None, alias="role", serialization_alias="role")

class ContractTermOfferAnswer(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    value_attachment: Optional[Attachment] = Field(None, alias="valueAttachment", serialization_alias="valueAttachment")
    value_boolean: Optional[bool] = Field(None, alias="valueBoolean", serialization_alias="valueBoolean")
    value_coding: Optional[Coding] = Field(None, alias="valueCoding", serialization_alias="valueCoding")
    value_date: Optional[str] = Field(None, alias="valueDate", serialization_alias="valueDate")
    value_date_time: Optional[str] = Field(None, alias="valueDateTime", serialization_alias="valueDateTime")
    value_decimal: Optional[float] = Field(None, alias="valueDecimal", serialization_alias="valueDecimal")
    value_integer: Optional[int] = Field(None, alias="valueInteger", serialization_alias="valueInteger")
    value_quantity: Optional[Quantity] = Field(None, alias="valueQuantity", serialization_alias="valueQuantity")
    value_reference: Optional[Reference] = Field(None, alias="valueReference", serialization_alias="valueReference")
    value_string: Optional[str] = Field(None, alias="valueString", serialization_alias="valueString")
    value_time: Optional[str] = Field(None, alias="valueTime", serialization_alias="valueTime")
    value_uri: Optional[str] = Field(None, alias="valueUri", serialization_alias="valueUri")

class ContractTermOffer(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    answer: Optional[L[ContractTermOfferAnswer]] = Field(None, alias="answer", serialization_alias="answer")
    decision: Optional[CodeableConcept] = Field(None, alias="decision", serialization_alias="decision")
    decision_mode: Optional[L[CodeableConcept]] = Field(None, alias="decisionMode", serialization_alias="decisionMode")
    identifier: Optional[L[Identifier]] = Field(None, alias="identifier", serialization_alias="identifier")
    link_id: Optional[L[str]] = Field(None, alias="linkId", serialization_alias="linkId")
    party: Optional[L[ContractTermOfferParty]] = Field(None, alias="party", serialization_alias="party")
    security_label_number: Optional[L[int]] = Field(None, alias="securityLabelNumber", serialization_alias="securityLabelNumber")
    text: Optional[str] = Field(None, alias="text", serialization_alias="text")
    topic: Optional[Reference] = Field(None, alias="topic", serialization_alias="topic")
    type: Optional[CodeableConcept] = Field(None, alias="type", serialization_alias="type")

class ContractTermActionSubject(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    reference: Optional[L[Reference]] = Field(None, alias="reference", serialization_alias="reference")
    role: Optional[CodeableConcept] = Field(None, alias="role", serialization_alias="role")

class ContractTermAction(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    context: Optional[Reference] = Field(None, alias="context", serialization_alias="context")
    context_link_id: Optional[L[str]] = Field(None, alias="contextLinkId", serialization_alias="contextLinkId")
    do_not_perform: Optional[bool] = Field(None, alias="doNotPerform", serialization_alias="doNotPerform")
    intent: Optional[CodeableConcept] = Field(None, alias="intent", serialization_alias="intent")
    link_id: Optional[L[str]] = Field(None, alias="linkId", serialization_alias="linkId")
    note: Optional[L[Annotation]] = Field(None, alias="note", serialization_alias="note")
    occurrence_date_time: Optional[str] = Field(None, alias="occurrenceDateTime", serialization_alias="occurrenceDateTime")
    occurrence_period: Optional[Period] = Field(None, alias="occurrencePeriod", serialization_alias="occurrencePeriod")
    occurrence_timing: Optional[Timing] = Field(None, alias="occurrenceTiming", serialization_alias="occurrenceTiming")
    performer: Optional[Reference] = Field(None, alias="performer", serialization_alias="performer")
    performer_link_id: Optional[L[str]] = Field(None, alias="performerLinkId", serialization_alias="performerLinkId")
    performer_role: Optional[CodeableConcept] = Field(None, alias="performerRole", serialization_alias="performerRole")
    performer_type: Optional[L[CodeableConcept]] = Field(None, alias="performerType", serialization_alias="performerType")
    reason: Optional[L[str]] = Field(None, alias="reason", serialization_alias="reason")
    reason_code: Optional[L[CodeableConcept]] = Field(None, alias="reasonCode", serialization_alias="reasonCode")
    reason_link_id: Optional[L[str]] = Field(None, alias="reasonLinkId", serialization_alias="reasonLinkId")
    reason_reference: Optional[L[Reference]] = Field(None, alias="reasonReference", serialization_alias="reasonReference")
    requester: Optional[L[Reference]] = Field(None, alias="requester", serialization_alias="requester")
    requester_link_id: Optional[L[str]] = Field(None, alias="requesterLinkId", serialization_alias="requesterLinkId")
    security_label_number: Optional[L[int]] = Field(None, alias="securityLabelNumber", serialization_alias="securityLabelNumber")
    status: Optional[CodeableConcept] = Field(None, alias="status", serialization_alias="status")
    subject: Optional[L[ContractTermActionSubject]] = Field(None, alias="subject", serialization_alias="subject")
    type: Optional[CodeableConcept] = Field(None, alias="type", serialization_alias="type")

class ContractTermSecurityLabel(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    category: Optional[L[Coding]] = Field(None, alias="category", serialization_alias="category")
    classification: Optional[Coding] = Field(None, alias="classification", serialization_alias="classification")
    control: Optional[L[Coding]] = Field(None, alias="control", serialization_alias="control")
    number: Optional[L[int]] = Field(None, alias="number", serialization_alias="number")

class ContractTermAssetContext(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    code: Optional[L[CodeableConcept]] = Field(None, alias="code", serialization_alias="code")
    reference: Optional[Reference] = Field(None, alias="reference", serialization_alias="reference")
    text: Optional[str] = Field(None, alias="text", serialization_alias="text")

class ContractTermAssetValuedItem(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    effective_time: Optional[str] = Field(None, alias="effectiveTime", serialization_alias="effectiveTime")
    entity_codeable_concept: Optional[CodeableConcept] = Field(None, alias="entityCodeableConcept", serialization_alias="entityCodeableConcept")
    entity_reference: Optional[Reference] = Field(None, alias="entityReference", serialization_alias="entityReference")
    factor: Optional[float] = Field(None, alias="factor", serialization_alias="factor")
    identifier: Optional[Identifier] = Field(None, alias="identifier", serialization_alias="identifier")
    link_id: Optional[L[str]] = Field(None, alias="linkId", serialization_alias="linkId")
    net: Optional[Money] = Field(None, alias="net", serialization_alias="net")
    payment: Optional[str] = Field(None, alias="payment", serialization_alias="payment")
    payment_date: Optional[str] = Field(None, alias="paymentDate", serialization_alias="paymentDate")
    points: Optional[float] = Field(None, alias="points", serialization_alias="points")
    quantity: Optional[Quantity] = Field(None, alias="quantity", serialization_alias="quantity")
    recipient: Optional[Reference] = Field(None, alias="recipient", serialization_alias="recipient")
    responsible: Optional[Reference] = Field(None, alias="responsible", serialization_alias="responsible")
    security_label_number: Optional[L[int]] = Field(None, alias="securityLabelNumber", serialization_alias="securityLabelNumber")
    unit_price: Optional[Money] = Field(None, alias="unitPrice", serialization_alias="unitPrice")

class ContractTermAsset(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    answer: Optional[L[ContractTermOfferAnswer]] = Field(None, alias="answer", serialization_alias="answer")
    condition: Optional[str] = Field(None, alias="condition", serialization_alias="condition")
    context: Optional[L[ContractTermAssetContext]] = Field(None, alias="context", serialization_alias="context")
    link_id: Optional[L[str]] = Field(None, alias="linkId", serialization_alias="linkId")
    period: Optional[L[Period]] = Field(None, alias="period", serialization_alias="period")
    period_type: Optional[L[CodeableConcept]] = Field(None, alias="periodType", serialization_alias="periodType")
    relationship: Optional[Coding] = Field(None, alias="relationship", serialization_alias="relationship")
    scope: Optional[CodeableConcept] = Field(None, alias="scope", serialization_alias="scope")
    security_label_number: Optional[L[int]] = Field(None, alias="securityLabelNumber", serialization_alias="securityLabelNumber")
    subtype: Optional[L[CodeableConcept]] = Field(None, alias="subtype", serialization_alias="subtype")
    text: Optional[str] = Field(None, alias="text", serialization_alias="text")
    type: Optional[L[CodeableConcept]] = Field(None, alias="type", serialization_alias="type")
    type_reference: Optional[L[Reference]] = Field(None, alias="typeReference", serialization_alias="typeReference")
    use_period: Optional[L[Period]] = Field(None, alias="usePeriod", serialization_alias="usePeriod")
    valued_item: Optional[L[ContractTermAssetValuedItem]] = Field(None, alias="valuedItem", serialization_alias="valuedItem")

class ContractTerm(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    action: Optional[L[ContractTermAction]] = Field(None, alias="action", serialization_alias="action")
    applies: Optional[Period] = Field(None, alias="applies", serialization_alias="applies")
    asset: Optional[L[ContractTermAsset]] = Field(None, alias="asset", serialization_alias="asset")
    group: Optional[L[ContractTerm]] = Field(None, alias="group", serialization_alias="group")
    identifier: Optional[Identifier] = Field(None, alias="identifier", serialization_alias="identifier")
    issued: Optional[str] = Field(None, alias="issued", serialization_alias="issued")
    offer: Optional[ContractTermOffer] = Field(None, alias="offer", serialization_alias="offer")
    security_label: Optional[L[ContractTermSecurityLabel]] = Field(None, alias="securityLabel", serialization_alias="securityLabel")
    sub_type: Optional[CodeableConcept] = Field(None, alias="subType", serialization_alias="subType")
    text: Optional[str] = Field(None, alias="text", serialization_alias="text")
    topic_codeable_concept: Optional[CodeableConcept] = Field(None, alias="topicCodeableConcept", serialization_alias="topicCodeableConcept")
    topic_reference: Optional[Reference] = Field(None, alias="topicReference", serialization_alias="topicReference")
    type: Optional[CodeableConcept] = Field(None, alias="type", serialization_alias="type")

class ContractFriendly(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    content_attachment: Optional[Attachment] = Field(None, alias="contentAttachment", serialization_alias="contentAttachment")
    content_reference: Optional[Reference] = Field(None, alias="contentReference", serialization_alias="contentReference")


class Contract(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='Contract',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='Contract'
    )
    
    alias: Optional[L[str]] = Field(None, alias="alias", serialization_alias="alias")
    applies: Optional[Period] = Field(None, alias="applies", serialization_alias="applies")
    author: Optional[Reference] = Field(None, alias="author", serialization_alias="author")
    authority: Optional[L[Reference]] = Field(None, alias="authority", serialization_alias="authority")
    content_definition: Optional[ContractContentDefinition] = Field(None, alias="contentDefinition", serialization_alias="contentDefinition")
    content_derivative: Optional[CodeableConcept] = Field(None, alias="contentDerivative", serialization_alias="contentDerivative")
    domain: Optional[L[Reference]] = Field(None, alias="domain", serialization_alias="domain")
    expiration_type: Optional[CodeableConcept] = Field(None, alias="expirationType", serialization_alias="expirationType")
    friendly: Optional[L[ContractFriendly]] = Field(None, alias="friendly", serialization_alias="friendly")
    identifier: Optional[L[Identifier]] = Field(None, alias="identifier", serialization_alias="identifier")
    instantiates_canonical: Optional[Reference] = Field(None, alias="instantiatesCanonical", serialization_alias="instantiatesCanonical")
    instantiates_uri: Optional[str] = Field(None, alias="instantiatesUri", serialization_alias="instantiatesUri")
    issued: Optional[str] = Field(None, alias="issued", serialization_alias="issued")
    legal: Optional[L[ContractLegal]] = Field(None, alias="legal", serialization_alias="legal")
    legally_binding_attachment: Optional[Attachment] = Field(None, alias="legallyBindingAttachment", serialization_alias="legallyBindingAttachment")
    legally_binding_reference: Optional[Reference] = Field(None, alias="legallyBindingReference", serialization_alias="legallyBindingReference")
    legal_state: Optional[CodeableConcept] = Field(None, alias="legalState", serialization_alias="legalState")
    name: Optional[str] = Field(None, alias="name", serialization_alias="name")
    relevant_history: Optional[L[Reference]] = Field(None, alias="relevantHistory", serialization_alias="relevantHistory")
    rule: Optional[L[ContractRule]] = Field(None, alias="rule", serialization_alias="rule")
    scope: Optional[CodeableConcept] = Field(None, alias="scope", serialization_alias="scope")
    signer: Optional[L[ContractSigner]] = Field(None, alias="signer", serialization_alias="signer")
    site: Optional[L[Reference]] = Field(None, alias="site", serialization_alias="site")
    status: Optional[Literal["amended", "appended", "cancelled", "disputed", "entered-in-error", "executable", "executed", "negotiable", "offered", "policy", "rejected", "renewed", "revoked", "resolved", "terminated"]] = Field(None, alias="status", serialization_alias="status")
    subject: Optional[L[Reference]] = Field(None, alias="subject", serialization_alias="subject")
    subtitle: Optional[str] = Field(None, alias="subtitle", serialization_alias="subtitle")
    sub_type: Optional[L[CodeableConcept]] = Field(None, alias="subType", serialization_alias="subType")
    supporting_info: Optional[L[Reference]] = Field(None, alias="supportingInfo", serialization_alias="supportingInfo")
    term: Optional[L[ContractTerm]] = Field(None, alias="term", serialization_alias="term")
    title: Optional[str] = Field(None, alias="title", serialization_alias="title")
    topic_codeable_concept: Optional[CodeableConcept] = Field(None, alias="topicCodeableConcept", serialization_alias="topicCodeableConcept")
    topic_reference: Optional[Reference] = Field(None, alias="topicReference", serialization_alias="topicReference")
    type: Optional[CodeableConcept] = Field(None, alias="type", serialization_alias="type")
    url: Optional[str] = Field(None, alias="url", serialization_alias="url")
    version: Optional[str] = Field(None, alias="version", serialization_alias="version")

