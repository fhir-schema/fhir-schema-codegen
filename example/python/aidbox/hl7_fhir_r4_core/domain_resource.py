# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import Optional, List as L, Literal, ForwardRef

from aidbox.hl7_fhir_r4_core.base import Extension, Narrative
from aidbox.hl7_fhir_r4_core.resource import Resource
from aidbox.hl7_fhir_r4_core.resource_families import ResourceFamily


class DomainResource(Resource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='DomainResource',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='DomainResource'
    )
    
    contained: Optional[L[ResourceFamily]] = Field(None, alias="contained", serialization_alias="contained")
    extension: Optional[L[Extension]] = Field(None, alias="extension", serialization_alias="extension")
    modifier_extension: Optional[L[Extension]] = Field(None, alias="modifierExtension", serialization_alias="modifierExtension")
    text: Optional[Narrative] = Field(None, alias="text", serialization_alias="text")

