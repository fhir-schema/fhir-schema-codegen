// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Ratio } from './Ratio';
import { Reference } from './Reference';


export interface MedicinalProductIngredientSpecifiedSubstance extends BackboneElement {
    code: CodeableConcept;
    confidentiality?: CodeableConcept;
    group: CodeableConcept;
    strength?: MedicinalProductIngredientSpecifiedSubstanceStrength[];
}

export interface MedicinalProductIngredientSpecifiedSubstanceStrength extends BackboneElement {
    concentration?: Ratio;
    concentrationLowLimit?: Ratio;
    country?: CodeableConcept[];
    measurementPoint?: string;
    presentation: Ratio;
    presentationLowLimit?: Ratio;
    referenceStrength?: MedicinalProductIngredientSpecifiedSubstanceStrengthReferenceStrength[];
}

export interface MedicinalProductIngredientSpecifiedSubstanceStrengthReferenceStrength extends BackboneElement {
    country?: CodeableConcept[];
    measurementPoint?: string;
    strength: Ratio;
    strengthLowLimit?: Ratio;
    substance?: CodeableConcept;
}

export interface MedicinalProductIngredientSubstance extends BackboneElement {
    code: CodeableConcept;
    strength?: MedicinalProductIngredientSpecifiedSubstanceStrength[];
}

export interface MedicinalProductIngredient extends DomainResource {
    allergenicIndicator?: boolean;
    _allergenicIndicator?: Element;
    identifier?: Identifier;
    manufacturer?: Reference<'Organization'>[];
    role: CodeableConcept;
    specifiedSubstance?: MedicinalProductIngredientSpecifiedSubstance[];
    substance?: MedicinalProductIngredientSubstance;
}

