# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import List as PyList, Literal

from aidbox.hl7_fhir_r4_core.base import \
    BackboneElement, CodeableConcept, Identifier, Money, Period, Reference
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class CoverageEligibilityResponseError(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    code: CodeableConcept = Field(alias="code", serialization_alias="code")

class CoverageEligibilityResponseInsurance(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    benefit_period: Period | None = Field(None, alias="benefitPeriod", serialization_alias="benefitPeriod")
    coverage: Reference = Field(alias="coverage", serialization_alias="coverage")
    inforce: bool | None = Field(None, alias="inforce", serialization_alias="inforce")
    item: PyList[CoverageEligibilityResponseInsuranceItem] | None = Field(None, alias="item", serialization_alias="item")

class CoverageEligibilityResponseInsuranceItem(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    authorization_required: bool | None = Field(None, alias="authorizationRequired", serialization_alias="authorizationRequired")
    authorization_supporting: PyList[CodeableConcept] | None = Field(None, alias="authorizationSupporting", serialization_alias="authorizationSupporting")
    authorization_url: str | None = Field(None, alias="authorizationUrl", serialization_alias="authorizationUrl")
    benefit: PyList[CoverageEligibilityResponseInsuranceItemBenefit] | None = Field(None, alias="benefit", serialization_alias="benefit")
    category: CodeableConcept | None = Field(None, alias="category", serialization_alias="category")
    description: str | None = Field(None, alias="description", serialization_alias="description")
    excluded: bool | None = Field(None, alias="excluded", serialization_alias="excluded")
    modifier: PyList[CodeableConcept] | None = Field(None, alias="modifier", serialization_alias="modifier")
    name: str | None = Field(None, alias="name", serialization_alias="name")
    network: CodeableConcept | None = Field(None, alias="network", serialization_alias="network")
    product_or_service: CodeableConcept | None = Field(None, alias="productOrService", serialization_alias="productOrService")
    provider: Reference | None = Field(None, alias="provider", serialization_alias="provider")
    term: CodeableConcept | None = Field(None, alias="term", serialization_alias="term")
    unit: CodeableConcept | None = Field(None, alias="unit", serialization_alias="unit")

class CoverageEligibilityResponseInsuranceItemBenefit(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    allowed_money: Money | None = Field(None, alias="allowedMoney", serialization_alias="allowedMoney")
    allowed_string: str | None = Field(None, alias="allowedString", serialization_alias="allowedString")
    allowed_unsigned_int: int | None = Field(None, alias="allowedUnsignedInt", serialization_alias="allowedUnsignedInt")
    type: CodeableConcept = Field(alias="type", serialization_alias="type")
    used_money: Money | None = Field(None, alias="usedMoney", serialization_alias="usedMoney")
    used_string: str | None = Field(None, alias="usedString", serialization_alias="usedString")
    used_unsigned_int: int | None = Field(None, alias="usedUnsignedInt", serialization_alias="usedUnsignedInt")


class CoverageEligibilityResponse(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='CoverageEligibilityResponse',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='CoverageEligibilityResponse'
    )
    
    created: str = Field(alias="created", serialization_alias="created")
    disposition: str | None = Field(None, alias="disposition", serialization_alias="disposition")
    error: PyList[CoverageEligibilityResponseError] | None = Field(None, alias="error", serialization_alias="error")
    form: CodeableConcept | None = Field(None, alias="form", serialization_alias="form")
    identifier: PyList[Identifier] | None = Field(None, alias="identifier", serialization_alias="identifier")
    insurance: PyList[CoverageEligibilityResponseInsurance] | None = Field(None, alias="insurance", serialization_alias="insurance")
    insurer: Reference = Field(alias="insurer", serialization_alias="insurer")
    outcome: Literal["queued", "complete", "error", "partial"] = Field(alias="outcome", serialization_alias="outcome")
    patient: Reference = Field(alias="patient", serialization_alias="patient")
    pre_auth_ref: str | None = Field(None, alias="preAuthRef", serialization_alias="preAuthRef")
    purpose: PyList[Literal["auth-requirements", "benefits", "discovery", "validation"]] = Field(alias="purpose", serialization_alias="purpose")
    request: Reference = Field(alias="request", serialization_alias="request")
    requestor: Reference | None = Field(None, alias="requestor", serialization_alias="requestor")
    serviced_date: str | None = Field(None, alias="servicedDate", serialization_alias="servicedDate")
    serviced_period: Period | None = Field(None, alias="servicedPeriod", serialization_alias="servicedPeriod")
    status: Literal["active", "cancelled", "draft", "entered-in-error"] = Field(alias="status", serialization_alias="status")
    
    def to_json(self, indent: int | None = None) -> str:
        return self.model_dump_json(exclude_unset=True, exclude_none=True, indent=indent)
    
    @classmethod
    def from_json(cls, json: str) -> CoverageEligibilityResponse:
        return cls.model_validate_json(json)

