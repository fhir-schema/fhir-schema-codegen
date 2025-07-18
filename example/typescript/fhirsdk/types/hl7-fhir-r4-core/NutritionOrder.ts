// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Annotation } from './Annotation';
import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Quantity } from './Quantity';
import { Ratio } from './Ratio';
import { Reference } from './Reference';
import { Timing } from './Timing';


export interface NutritionOrderEnteralFormula extends BackboneElement {
    additiveProductName?: string;
    additiveType?: CodeableConcept;
    administration?: NutritionOrderEnteralFormulaAdministration[];
    administrationInstruction?: string;
    baseFormulaProductName?: string;
    baseFormulaType?: CodeableConcept;
    caloricDensity?: Quantity;
    maxVolumeToDeliver?: Quantity;
    routeofAdministration?: CodeableConcept;
}

export interface NutritionOrderEnteralFormulaAdministration extends BackboneElement {
    quantity?: Quantity;
    rateQuantity?: Quantity;
    rateRatio?: Ratio;
    schedule?: Timing;
}

export interface NutritionOrderOralDiet extends BackboneElement {
    fluidConsistencyType?: CodeableConcept[];
    instruction?: string;
    nutrient?: NutritionOrderOralDietNutrient[];
    schedule?: Timing[];
    texture?: NutritionOrderOralDietTexture[];
    type?: CodeableConcept[];
}

export interface NutritionOrderOralDietNutrient extends BackboneElement {
    amount?: Quantity;
    modifier?: CodeableConcept;
}

export interface NutritionOrderOralDietTexture extends BackboneElement {
    foodType?: CodeableConcept;
    modifier?: CodeableConcept;
}

export interface NutritionOrderSupplement extends BackboneElement {
    instruction?: string;
    productName?: string;
    quantity?: Quantity;
    schedule?: Timing[];
    type?: CodeableConcept;
}

export interface NutritionOrder extends DomainResource {
    allergyIntolerance?: Reference<'AllergyIntolerance'>[];
    dateTime: string;
    _dateTime?: Element;
    encounter?: Reference<'Encounter'>;
    enteralFormula?: NutritionOrderEnteralFormula;
    excludeFoodModifier?: CodeableConcept[];
    foodPreferenceModifier?: CodeableConcept[];
    identifier?: Identifier[];
    instantiates?: string[];
    _instantiates?: Element;
    instantiatesCanonical?: string[];
    _instantiatesCanonical?: Element;
    instantiatesUri?: string[];
    _instantiatesUri?: Element;
    intent: 'proposal' | 'plan' | 'directive' | 'order' | 'option' | 'original-order' | 'reflex-order' | 'filler-order' | 'instance-order';
    _intent?: Element;
    note?: Annotation[];
    oralDiet?: NutritionOrderOralDiet;
    orderer?: Reference<'Practitioner' | 'PractitionerRole'>;
    patient: Reference<'Patient'>;
    status: 'draft' | 'active' | 'on-hold' | 'revoked' | 'completed' | 'entered-in-error' | 'unknown';
    _status?: Element;
    supplement?: NutritionOrderSupplement[];
}

