# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class ImmunizationRecommendationRecommendationDateCriterion(BackboneElement):
    code: Optional[CodeableConcept] = None
    value: Optional[str] = None

class ImmunizationRecommendationRecommendation(BackboneElement):
    contraindicated_vaccine_code: Optional[L[CodeableConcept]] = None
    date_criterion: Optional[L[ImmunizationRecommendationRecommendationDateCriterion]] = None
    description: Optional[str] = None
    dose_number_positive_int: Optional[PositiveInt] = None
    dose_number_string: Optional[str] = None
    forecast_reason: Optional[L[CodeableConcept]] = None
    forecast_status: Optional[CodeableConcept] = None
    series: Optional[str] = None
    series_doses_positive_int: Optional[PositiveInt] = None
    series_doses_string: Optional[str] = None
    supporting_immunization: Optional[L[Reference]] = None
    supporting_patient_information: Optional[L[Reference]] = None
    target_disease: Optional[CodeableConcept] = None
    vaccine_code: Optional[L[CodeableConcept]] = None


class ImmunizationRecommendation(DomainResource):
    authority: Optional[Reference] = None
    date: Optional[str] = None
    identifier: Optional[L[Identifier]] = None
    patient: Optional[Reference] = None
    recommendation: Optional[L[ImmunizationRecommendationRecommendation]] = None

