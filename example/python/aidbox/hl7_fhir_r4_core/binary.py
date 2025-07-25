# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import List as PyList, Literal

from aidbox.hl7_fhir_r4_core.base import Reference
from aidbox.hl7_fhir_r4_core.resource import Resource
from aidbox.hl7_fhir_r4_core.resource_families import ResourceFamily


class Binary(Resource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='Binary',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='Binary'
    )
    
    content_type: str = Field(alias="contentType", serialization_alias="contentType")
    data: str | None = Field(None, alias="data", serialization_alias="data")
    security_context: Reference | None = Field(None, alias="securityContext", serialization_alias="securityContext")
    
    def to_json(self, indent: int | None = None) -> str:
        return self.model_dump_json(exclude_unset=True, exclude_none=True, indent=indent)
    
    @classmethod
    def from_json(cls, json: str) -> Binary:
        return cls.model_validate_json(json)

