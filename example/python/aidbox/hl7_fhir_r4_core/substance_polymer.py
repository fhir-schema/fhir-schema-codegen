# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class SubstancePolymerMonomerSetStartingMaterial(BackboneElement):
    amount: Optional[SubstanceAmount] = None
    is_defining: Optional[bool] = None
    material: Optional[CodeableConcept] = None
    type: Optional[CodeableConcept] = None

class SubstancePolymerMonomerSet(BackboneElement):
    ratio_type: Optional[CodeableConcept] = None
    starting_material: Optional[L[SubstancePolymerMonomerSetStartingMaterial]] = None

class SubstancePolymerRepeatRepeatUnitDegreeOfPolymerisation(BackboneElement):
    amount: Optional[SubstanceAmount] = None
    degree: Optional[CodeableConcept] = None

class SubstancePolymerRepeatRepeatUnitStructuralRepresentation(BackboneElement):
    attachment: Optional[Attachment] = None
    representation: Optional[str] = None
    type: Optional[CodeableConcept] = None

class SubstancePolymerRepeatRepeatUnit(BackboneElement):
    amount: Optional[SubstanceAmount] = None
    degree_of_polymerisation: Optional[L[SubstancePolymerRepeatRepeatUnitDegreeOfPolymerisation]] = None
    orientation_of_polymerisation: Optional[CodeableConcept] = None
    repeat_unit: Optional[str] = None
    structural_representation: Optional[L[SubstancePolymerRepeatRepeatUnitStructuralRepresentation]] = None

class SubstancePolymerRepeat(BackboneElement):
    average_molecular_formula: Optional[str] = None
    number_of_units: Optional[int] = None
    repeat_unit: Optional[L[SubstancePolymerRepeatRepeatUnit]] = None
    repeat_unit_amount_type: Optional[CodeableConcept] = None


class SubstancePolymer(DomainResource):
    class_: Optional[CodeableConcept] = None
    copolymer_connectivity: Optional[L[CodeableConcept]] = None
    geometry: Optional[CodeableConcept] = None
    modification: Optional[L[str]] = None
    monomer_set: Optional[L[SubstancePolymerMonomerSet]] = None
    repeat: Optional[L[SubstancePolymerRepeat]] = None

