// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { ContactDetail } from './ContactDetail';
import { DataRequirement } from './DataRequirement';
import { DomainResource } from './DomainResource';
import { Duration } from './Duration';
import { Expression } from './Expression';
import { Identifier } from './Identifier';
import { Period } from './Period';
import { Reference } from './Reference';
import { RelatedArtifact } from './RelatedArtifact';
import { Timing } from './Timing';
import { UsageContext } from './UsageContext';


export interface ResearchElementDefinitionCharacteristic extends BackboneElement {
    definitionCanonical?: string;
    definitionCodeableConcept?: CodeableConcept;
    definitionDataRequirement?: DataRequirement;
    definitionExpression?: Expression;
    exclude?: boolean;
    participantEffectiveDateTime?: string;
    participantEffectiveDescription?: string;
    participantEffectiveDuration?: Duration;
    participantEffectiveGroupMeasure?: 'mean' | 'median' | 'mean-of-mean' | 'mean-of-median' | 'median-of-mean' | 'median-of-median';
    participantEffectivePeriod?: Period;
    participantEffectiveTimeFromStart?: Duration;
    participantEffectiveTiming?: Timing;
    studyEffectiveDateTime?: string;
    studyEffectiveDescription?: string;
    studyEffectiveDuration?: Duration;
    studyEffectiveGroupMeasure?: 'mean' | 'median' | 'mean-of-mean' | 'mean-of-median' | 'median-of-mean' | 'median-of-median';
    studyEffectivePeriod?: Period;
    studyEffectiveTimeFromStart?: Duration;
    studyEffectiveTiming?: Timing;
    unitOfMeasure?: CodeableConcept;
    usageContext?: UsageContext[];
}

export interface ResearchElementDefinition extends DomainResource {
    approvalDate?: string;
    _approvalDate?: Element;
    author?: ContactDetail[];
    characteristic: ResearchElementDefinitionCharacteristic[];
    comment?: string[];
    _comment?: Element;
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
    experimental?: boolean;
    _experimental?: Element;
    identifier?: Identifier[];
    jurisdiction?: CodeableConcept[];
    lastReviewDate?: string;
    _lastReviewDate?: Element;
    library?: string[];
    _library?: Element;
    name?: string;
    _name?: Element;
    publisher?: string;
    _publisher?: Element;
    purpose?: string;
    _purpose?: Element;
    relatedArtifact?: RelatedArtifact[];
    reviewer?: ContactDetail[];
    shortTitle?: string;
    _shortTitle?: Element;
    status: 'draft' | 'active' | 'retired' | 'unknown';
    _status?: Element;
    subjectCodeableConcept?: CodeableConcept;
    subjectReference?: Reference<'Group'>;
    subtitle?: string;
    _subtitle?: Element;
    title?: string;
    _title?: Element;
    topic?: CodeableConcept[];
    type: 'population' | 'exposure' | 'outcome';
    _type?: Element;
    url?: string;
    _url?: Element;
    usage?: string;
    _usage?: Element;
    useContext?: UsageContext[];
    variableType?: 'dichotomous' | 'continuous' | 'descriptive';
    _variableType?: Element;
    version?: string;
    _version?: Element;
}

