// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Attachment } from './Attachment';
import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';


export interface SubstanceNucleicAcidSubunitLinkage extends BackboneElement {
    connectivity?: string;
    identifier?: Identifier;
    name?: string;
    residueSite?: string;
}

export interface SubstanceNucleicAcidSubunitSugar extends BackboneElement {
    identifier?: Identifier;
    name?: string;
    residueSite?: string;
}

export interface SubstanceNucleicAcidSubunit extends BackboneElement {
    fivePrime?: CodeableConcept;
    length?: number;
    linkage?: SubstanceNucleicAcidSubunitLinkage[];
    sequence?: string;
    sequenceAttachment?: Attachment;
    subunit?: number;
    sugar?: SubstanceNucleicAcidSubunitSugar[];
    threePrime?: CodeableConcept;
}

export interface SubstanceNucleicAcid extends DomainResource {
    areaOfHybridisation?: string;
    _areaOfHybridisation?: Element;
    numberOfSubunits?: number;
    _numberOfSubunits?: Element;
    oligoNucleotideType?: CodeableConcept;
    sequenceType?: CodeableConcept;
    subunit?: SubstanceNucleicAcidSubunit[];
}

