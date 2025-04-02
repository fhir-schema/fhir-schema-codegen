// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Quantity } from './Quantity';
import { Reference } from './Reference';


export interface MolecularSequenceStructureVariantOuter extends BackboneElement {
    end?: number;
    start?: number;
}

export interface MolecularSequenceStructureVariantInner extends BackboneElement {
    end?: number;
    start?: number;
}

export interface MolecularSequenceStructureVariant extends BackboneElement {
    exact?: boolean;
    inner?: MolecularSequenceStructureVariantInner;
    length?: number;
    outer?: MolecularSequenceStructureVariantOuter;
    variantType?: CodeableConcept;
}

export interface MolecularSequenceRepository extends BackboneElement {
    datasetId?: string;
    name?: string;
    readsetId?: string;
    type?: 'directlink' | 'openapi' | 'login' | 'oauth' | 'other';
    url?: string;
    variantsetId?: string;
}

export interface MolecularSequenceVariant extends BackboneElement {
    cigar?: string;
    end?: number;
    observedAllele?: string;
    referenceAllele?: string;
    start?: number;
    variantPointer?: Reference<'Observation'>;
}

export interface MolecularSequenceQualityRoc extends BackboneElement {
    fMeasure?: number[];
    numFN?: number[];
    numFP?: number[];
    numTP?: number[];
    precision?: number[];
    score?: number[];
    sensitivity?: number[];
}

export interface MolecularSequenceQuality extends BackboneElement {
    end?: number;
    fScore?: number;
    gtFP?: number;
    method?: CodeableConcept;
    precision?: number;
    queryFP?: number;
    queryTP?: number;
    recall?: number;
    roc?: MolecularSequenceQualityRoc;
    score?: Quantity;
    standardSequence?: CodeableConcept;
    start?: number;
    truthFN?: number;
    truthTP?: number;
    type?: 'indel' | 'snp' | 'unknown';
}

export interface MolecularSequenceReferenceSeq extends BackboneElement {
    chromosome?: CodeableConcept;
    genomeBuild?: string;
    orientation?: 'sense' | 'antisense';
    referenceSeqId?: CodeableConcept;
    referenceSeqPointer?: Reference<'MolecularSequence'>;
    referenceSeqString?: string;
    strand?: 'watson' | 'crick';
    windowEnd?: number;
    windowStart?: number;
}

export interface MolecularSequence extends DomainResource {
    coordinateSystem?: number;
    _coordinateSystem?: Element;
    device?: Reference<'Device'>;
    identifier?: Identifier[];
    observedSeq?: string;
    _observedSeq?: Element;
    patient?: Reference<'Patient'>;
    performer?: Reference<'Organization'>;
    pointer?: Reference<'MolecularSequence'>[];
    quality?: MolecularSequenceQuality[];
    quantity?: Quantity;
    readCoverage?: number;
    _readCoverage?: Element;
    referenceSeq?: MolecularSequenceReferenceSeq;
    repository?: MolecularSequenceRepository[];
    specimen?: Reference<'Specimen'>;
    structureVariant?: MolecularSequenceStructureVariant[];
    type?: 'aa' | 'dna' | 'rna';
    _type?: Element;
    variant?: MolecularSequenceVariant[];
}

