# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class ObservationDefinitionQuantitativeDetails(BackboneElement):
    conversion_factor: Optional[float] = None
    customary_unit: Optional[CodeableConcept] = None
    decimal_precision: Optional[int] = None
    unit: Optional[CodeableConcept] = None

class ObservationDefinitionQualifiedInterval(BackboneElement):
    age: Optional[Range] = None
    applies_to: Optional[L[CodeableConcept]] = None
    category: Optional[Literal["reference", "critical", "absolute"]] = None
    condition: Optional[str] = None
    context: Optional[CodeableConcept] = None
    gender: Optional[Literal["male", "female", "other", "unknown"]] = None
    gestational_age: Optional[Range] = None
    range: Optional[Range] = None


class ObservationDefinition(DomainResource):
    abnormal_coded_value_set: Optional[Reference] = None
    category: Optional[L[CodeableConcept]] = None
    code: Optional[CodeableConcept] = None
    critical_coded_value_set: Optional[Reference] = None
    identifier: Optional[L[Identifier]] = None
    method: Optional[CodeableConcept] = None
    multiple_results_allowed: Optional[bool] = None
    normal_coded_value_set: Optional[Reference] = None
    permitted_data_type: Optional[L[Literal["Quantity", "CodeableConcept", "string", "boolean", "integer", "Range", "Ratio", "SampledData", "time", "dateTime", "Period"]]] = None
    preferred_report_name: Optional[str] = None
    qualified_interval: Optional[L[ObservationDefinitionQualifiedInterval]] = None
    quantitative_details: Optional[ObservationDefinitionQuantitativeDetails] = None
    valid_coded_value_set: Optional[Reference] = None

