# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import List as PyList, Literal

from aidbox.hl7_fhir_r4_core.base import \
    Annotation, BackboneElement, CodeableConcept, ContactPoint, Identifier, Quantity, Reference
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class DeviceDeviceName(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    name: str = Field(alias="name", serialization_alias="name")
    type: Literal["udi-label-name", "user-friendly-name", "patient-reported-name", "manufacturer-name", "model-name", "other"] = Field(alias="type", serialization_alias="type")

class DeviceProperty(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    type: CodeableConcept = Field(alias="type", serialization_alias="type")
    value_code: PyList[CodeableConcept] | None = Field(None, alias="valueCode", serialization_alias="valueCode")
    value_quantity: PyList[Quantity] | None = Field(None, alias="valueQuantity", serialization_alias="valueQuantity")

class DeviceSpecialization(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    system_type: CodeableConcept = Field(alias="systemType", serialization_alias="systemType")
    version: str | None = Field(None, alias="version", serialization_alias="version")

class DeviceUdiCarrier(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    carrier_aidc: str | None = Field(None, alias="carrierAIDC", serialization_alias="carrierAIDC")
    carrier_hrf: str | None = Field(None, alias="carrierHRF", serialization_alias="carrierHRF")
    device_identifier: str | None = Field(None, alias="deviceIdentifier", serialization_alias="deviceIdentifier")
    entry_type: Literal["barcode", "rfid", "manual", "card", "self-reported", "unknown"] | None = Field(None, alias="entryType", serialization_alias="entryType")
    issuer: str | None = Field(None, alias="issuer", serialization_alias="issuer")
    jurisdiction: str | None = Field(None, alias="jurisdiction", serialization_alias="jurisdiction")

class DeviceVersion(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    component: Identifier | None = Field(None, alias="component", serialization_alias="component")
    type: CodeableConcept | None = Field(None, alias="type", serialization_alias="type")
    value: str = Field(alias="value", serialization_alias="value")


class Device(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='Device',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='Device'
    )
    
    contact: PyList[ContactPoint] | None = Field(None, alias="contact", serialization_alias="contact")
    definition: Reference | None = Field(None, alias="definition", serialization_alias="definition")
    device_name: PyList[DeviceDeviceName] | None = Field(None, alias="deviceName", serialization_alias="deviceName")
    distinct_identifier: str | None = Field(None, alias="distinctIdentifier", serialization_alias="distinctIdentifier")
    expiration_date: str | None = Field(None, alias="expirationDate", serialization_alias="expirationDate")
    identifier: PyList[Identifier] | None = Field(None, alias="identifier", serialization_alias="identifier")
    location: Reference | None = Field(None, alias="location", serialization_alias="location")
    lot_number: str | None = Field(None, alias="lotNumber", serialization_alias="lotNumber")
    manufacture_date: str | None = Field(None, alias="manufactureDate", serialization_alias="manufactureDate")
    manufacturer: str | None = Field(None, alias="manufacturer", serialization_alias="manufacturer")
    model_number: str | None = Field(None, alias="modelNumber", serialization_alias="modelNumber")
    note: PyList[Annotation] | None = Field(None, alias="note", serialization_alias="note")
    owner: Reference | None = Field(None, alias="owner", serialization_alias="owner")
    parent: Reference | None = Field(None, alias="parent", serialization_alias="parent")
    part_number: str | None = Field(None, alias="partNumber", serialization_alias="partNumber")
    patient: Reference | None = Field(None, alias="patient", serialization_alias="patient")
    property: PyList[DeviceProperty] | None = Field(None, alias="property", serialization_alias="property")
    safety: PyList[CodeableConcept] | None = Field(None, alias="safety", serialization_alias="safety")
    serial_number: str | None = Field(None, alias="serialNumber", serialization_alias="serialNumber")
    specialization: PyList[DeviceSpecialization] | None = Field(None, alias="specialization", serialization_alias="specialization")
    status: Literal["active", "inactive", "entered-in-error", "unknown"] | None = Field(None, alias="status", serialization_alias="status")
    status_reason: PyList[CodeableConcept] | None = Field(None, alias="statusReason", serialization_alias="statusReason")
    type: CodeableConcept | None = Field(None, alias="type", serialization_alias="type")
    udi_carrier: PyList[DeviceUdiCarrier] | None = Field(None, alias="udiCarrier", serialization_alias="udiCarrier")
    url: str | None = Field(None, alias="url", serialization_alias="url")
    version: PyList[DeviceVersion] | None = Field(None, alias="version", serialization_alias="version")
    
    def to_json(self, indent: int | None = None) -> str:
        return self.model_dump_json(exclude_unset=True, exclude_none=True, indent=indent)
    
    @classmethod
    def from_json(cls, json: str) -> Device:
        return cls.model_validate_json(json)

