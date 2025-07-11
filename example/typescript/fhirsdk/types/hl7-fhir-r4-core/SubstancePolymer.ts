// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Attachment } from './Attachment';
import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { DomainResource } from './DomainResource';
import { SubstanceAmount } from './SubstanceAmount';


export interface SubstancePolymerMonomerSet extends BackboneElement {
    ratioType?: CodeableConcept;
    startingMaterial?: SubstancePolymerMonomerSetStartingMaterial[];
}

export interface SubstancePolymerMonomerSetStartingMaterial extends BackboneElement {
    amount?: SubstanceAmount;
    isDefining?: boolean;
    material?: CodeableConcept;
    type?: CodeableConcept;
}

export interface SubstancePolymerRepeat extends BackboneElement {
    averageMolecularFormula?: string;
    numberOfUnits?: number;
    repeatUnit?: SubstancePolymerRepeatRepeatUnit[];
    repeatUnitAmountType?: CodeableConcept;
}

export interface SubstancePolymerRepeatRepeatUnit extends BackboneElement {
    amount?: SubstanceAmount;
    degreeOfPolymerisation?: SubstancePolymerRepeatRepeatUnitDegreeOfPolymerisation[];
    orientationOfPolymerisation?: CodeableConcept;
    repeatUnit?: string;
    structuralRepresentation?: SubstancePolymerRepeatRepeatUnitStructuralRepresentation[];
}

export interface SubstancePolymerRepeatRepeatUnitDegreeOfPolymerisation extends BackboneElement {
    amount?: SubstanceAmount;
    degree?: CodeableConcept;
}

export interface SubstancePolymerRepeatRepeatUnitStructuralRepresentation extends BackboneElement {
    attachment?: Attachment;
    representation?: string;
    type?: CodeableConcept;
}

export interface SubstancePolymer extends DomainResource {
    class?: CodeableConcept;
    copolymerConnectivity?: CodeableConcept[];
    geometry?: CodeableConcept;
    modification?: string[];
    _modification?: Element;
    monomerSet?: SubstancePolymerMonomerSet[];
    repeat?: SubstancePolymerRepeat[];
}

