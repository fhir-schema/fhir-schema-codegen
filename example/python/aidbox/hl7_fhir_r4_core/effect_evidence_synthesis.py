# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class EffectEvidenceSynthesisEffectEstimatePrecisionEstimate(BackboneElement):
    from_: Optional[float] = None
    level: Optional[float] = None
    to: Optional[float] = None
    type: Optional[CodeableConcept] = None

class EffectEvidenceSynthesisEffectEstimate(BackboneElement):
    description: Optional[str] = None
    precision_estimate: Optional[L[EffectEvidenceSynthesisEffectEstimatePrecisionEstimate]] = None
    type: Optional[CodeableConcept] = None
    unit_of_measure: Optional[CodeableConcept] = None
    value: Optional[float] = None
    variant_state: Optional[CodeableConcept] = None

class EffectEvidenceSynthesisSampleSize(BackboneElement):
    description: Optional[str] = None
    number_of_participants: Optional[int] = None
    number_of_studies: Optional[int] = None

class EffectEvidenceSynthesisCertaintyCertaintySubcomponent(BackboneElement):
    note: Optional[L[Annotation]] = None
    rating: Optional[L[CodeableConcept]] = None
    type: Optional[CodeableConcept] = None

class EffectEvidenceSynthesisCertainty(BackboneElement):
    certainty_subcomponent: Optional[L[EffectEvidenceSynthesisCertaintyCertaintySubcomponent]] = None
    note: Optional[L[Annotation]] = None
    rating: Optional[L[CodeableConcept]] = None

class EffectEvidenceSynthesisResultsByExposure(BackboneElement):
    description: Optional[str] = None
    exposure_state: Optional[Literal["exposure", "exposure-alternative"]] = None
    risk_evidence_synthesis: Optional[Reference] = None
    variant_state: Optional[CodeableConcept] = None


class EffectEvidenceSynthesis(DomainResource):
    approval_date: Optional[str] = None
    author: Optional[L[ContactDetail]] = None
    certainty: Optional[L[EffectEvidenceSynthesisCertainty]] = None
    contact: Optional[L[ContactDetail]] = None
    copyright: Optional[str] = None
    date: Optional[str] = None
    description: Optional[str] = None
    editor: Optional[L[ContactDetail]] = None
    effect_estimate: Optional[L[EffectEvidenceSynthesisEffectEstimate]] = None
    effective_period: Optional[Period] = None
    endorser: Optional[L[ContactDetail]] = None
    exposure: Optional[Reference] = None
    exposure_alternative: Optional[Reference] = None
    identifier: Optional[L[Identifier]] = None
    jurisdiction: Optional[L[CodeableConcept]] = None
    last_review_date: Optional[str] = None
    name: Optional[str] = None
    note: Optional[L[Annotation]] = None
    outcome: Optional[Reference] = None
    population: Optional[Reference] = None
    publisher: Optional[str] = None
    related_artifact: Optional[L[RelatedArtifact]] = None
    results_by_exposure: Optional[L[EffectEvidenceSynthesisResultsByExposure]] = None
    reviewer: Optional[L[ContactDetail]] = None
    sample_size: Optional[EffectEvidenceSynthesisSampleSize] = None
    status: Optional[Literal["draft", "active", "retired", "unknown"]] = None
    study_type: Optional[CodeableConcept] = None
    synthesis_type: Optional[CodeableConcept] = None
    title: Optional[str] = None
    topic: Optional[L[CodeableConcept]] = None
    url: Optional[str] = None
    use_context: Optional[L[UsageContext]] = None
    version: Optional[str] = None

