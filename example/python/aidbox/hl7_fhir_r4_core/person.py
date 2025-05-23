# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import Optional, List as L, Literal, ForwardRef

from aidbox.hl7_fhir_r4_core.base import Address, Attachment, BackboneElement, ContactPoint, HumanName, Identifier, Reference
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class PersonLink(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    assurance: Optional[Literal["level1", "level2", "level3", "level4"]] = Field(None, alias="assurance", serialization_alias="assurance")
    target: Optional[Reference] = Field(None, alias="target", serialization_alias="target")


class Person(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='Person',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='Person'
    )
    
    active: Optional[bool] = Field(None, alias="active", serialization_alias="active")
    address: Optional[L[Address]] = Field(None, alias="address", serialization_alias="address")
    birth_date: Optional[str] = Field(None, alias="birthDate", serialization_alias="birthDate")
    gender: Optional[Literal["male", "female", "other", "unknown"]] = Field(None, alias="gender", serialization_alias="gender")
    identifier: Optional[L[Identifier]] = Field(None, alias="identifier", serialization_alias="identifier")
    link: Optional[L[PersonLink]] = Field(None, alias="link", serialization_alias="link")
    managing_organization: Optional[Reference] = Field(None, alias="managingOrganization", serialization_alias="managingOrganization")
    name: Optional[L[HumanName]] = Field(None, alias="name", serialization_alias="name")
    photo: Optional[Attachment] = Field(None, alias="photo", serialization_alias="photo")
    telecom: Optional[L[ContactPoint]] = Field(None, alias="telecom", serialization_alias="telecom")

