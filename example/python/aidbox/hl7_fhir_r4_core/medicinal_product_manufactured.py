# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import List as PyList, Literal

from aidbox.hl7_fhir_r4_core.base import CodeableConcept, ProdCharacteristic, Quantity, Reference
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class MedicinalProductManufactured(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='MedicinalProductManufactured',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='MedicinalProductManufactured'
    )
    
    ingredient: PyList[Reference] | None = Field(None, alias="ingredient", serialization_alias="ingredient")
    manufactured_dose_form: CodeableConcept = Field(alias="manufacturedDoseForm", serialization_alias="manufacturedDoseForm")
    manufacturer: PyList[Reference] | None = Field(None, alias="manufacturer", serialization_alias="manufacturer")
    other_characteristics: PyList[CodeableConcept] | None = Field(None, alias="otherCharacteristics", serialization_alias="otherCharacteristics")
    physical_characteristics: ProdCharacteristic | None = Field(None, alias="physicalCharacteristics", serialization_alias="physicalCharacteristics")
    quantity: Quantity = Field(alias="quantity", serialization_alias="quantity")
    unit_of_presentation: CodeableConcept | None = Field(None, alias="unitOfPresentation", serialization_alias="unitOfPresentation")
    
    def to_json(self, indent: int | None = None) -> str:
        return self.model_dump_json(exclude_unset=True, exclude_none=True, indent=indent)
    
    @classmethod
    def from_json(cls, json: str) -> MedicinalProductManufactured:
        return cls.model_validate_json(json)

