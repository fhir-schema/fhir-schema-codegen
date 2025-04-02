// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';


export interface SubstanceSourceMaterialOrganismAuthor extends BackboneElement {
    authorDescription?: string;
    authorType?: CodeableConcept;
}

export interface SubstanceSourceMaterialOrganismHybrid extends BackboneElement {
    hybridType?: CodeableConcept;
    maternalOrganismId?: string;
    maternalOrganismName?: string;
    paternalOrganismId?: string;
    paternalOrganismName?: string;
}

export interface SubstanceSourceMaterialOrganismOrganismGeneral extends BackboneElement {
    class?: CodeableConcept;
    kingdom?: CodeableConcept;
    order?: CodeableConcept;
    phylum?: CodeableConcept;
}

export interface SubstanceSourceMaterialOrganism extends BackboneElement {
    author?: SubstanceSourceMaterialOrganismAuthor[];
    family?: CodeableConcept;
    genus?: CodeableConcept;
    hybrid?: SubstanceSourceMaterialOrganismHybrid;
    intraspecificDescription?: string;
    intraspecificType?: CodeableConcept;
    organismGeneral?: SubstanceSourceMaterialOrganismOrganismGeneral;
    species?: CodeableConcept;
}

export interface SubstanceSourceMaterialPartDescription extends BackboneElement {
    part?: CodeableConcept;
    partLocation?: CodeableConcept;
}

export interface SubstanceSourceMaterialFractionDescription extends BackboneElement {
    fraction?: string;
    materialType?: CodeableConcept;
}

export interface SubstanceSourceMaterial extends DomainResource {
    countryOfOrigin?: CodeableConcept[];
    developmentStage?: CodeableConcept;
    fractionDescription?: SubstanceSourceMaterialFractionDescription[];
    geographicalLocation?: string[];
    _geographicalLocation?: Element;
    organism?: SubstanceSourceMaterialOrganism;
    organismId?: Identifier;
    organismName?: string;
    _organismName?: Element;
    parentSubstanceId?: Identifier[];
    parentSubstanceName?: string[];
    _parentSubstanceName?: Element;
    partDescription?: SubstanceSourceMaterialPartDescription[];
    sourceMaterialClass?: CodeableConcept;
    sourceMaterialState?: CodeableConcept;
    sourceMaterialType?: CodeableConcept;
}

