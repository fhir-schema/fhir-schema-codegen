// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Annotation } from './Annotation';
import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { ContactDetail } from './ContactDetail';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Period } from './Period';
import { Reference } from './Reference';
import { RelatedArtifact } from './RelatedArtifact';
import { UsageContext } from './UsageContext';


export interface RiskEvidenceSynthesisCertainty extends BackboneElement {
    certaintySubcomponent?: RiskEvidenceSynthesisCertaintyCertaintySubcomponent[];
    note?: Annotation[];
    rating?: CodeableConcept[];
}

export interface RiskEvidenceSynthesisCertaintyCertaintySubcomponent extends BackboneElement {
    note?: Annotation[];
    rating?: CodeableConcept[];
    type?: CodeableConcept;
}

export interface RiskEvidenceSynthesisRiskEstimate extends BackboneElement {
    denominatorCount?: number;
    description?: string;
    numeratorCount?: number;
    precisionEstimate?: RiskEvidenceSynthesisRiskEstimatePrecisionEstimate[];
    type?: CodeableConcept;
    unitOfMeasure?: CodeableConcept;
    value?: number;
}

export interface RiskEvidenceSynthesisRiskEstimatePrecisionEstimate extends BackboneElement {
    from?: number;
    level?: number;
    to?: number;
    type?: CodeableConcept;
}

export interface RiskEvidenceSynthesisSampleSize extends BackboneElement {
    description?: string;
    numberOfParticipants?: number;
    numberOfStudies?: number;
}

export interface RiskEvidenceSynthesis extends DomainResource {
    approvalDate?: string;
    _approvalDate?: Element;
    author?: ContactDetail[];
    certainty?: RiskEvidenceSynthesisCertainty[];
    contact?: ContactDetail[];
    copyright?: string;
    _copyright?: Element;
    date?: string;
    _date?: Element;
    description?: string;
    _description?: Element;
    editor?: ContactDetail[];
    effectivePeriod?: Period;
    endorser?: ContactDetail[];
    exposure?: Reference<'EvidenceVariable'>;
    identifier?: Identifier[];
    jurisdiction?: CodeableConcept[];
    lastReviewDate?: string;
    _lastReviewDate?: Element;
    name?: string;
    _name?: Element;
    note?: Annotation[];
    outcome: Reference<'EvidenceVariable'>;
    population: Reference<'EvidenceVariable'>;
    publisher?: string;
    _publisher?: Element;
    relatedArtifact?: RelatedArtifact[];
    reviewer?: ContactDetail[];
    riskEstimate?: RiskEvidenceSynthesisRiskEstimate;
    sampleSize?: RiskEvidenceSynthesisSampleSize;
    status: 'draft' | 'active' | 'retired' | 'unknown';
    _status?: Element;
    studyType?: CodeableConcept;
    synthesisType?: CodeableConcept;
    title?: string;
    _title?: Element;
    topic?: CodeableConcept[];
    url?: string;
    _url?: Element;
    useContext?: UsageContext[];
    version?: string;
    _version?: Element;
}

