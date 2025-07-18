// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Annotation } from './Annotation';
import { CodeableConcept } from './CodeableConcept';
import { ContactDetail } from './ContactDetail';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Period } from './Period';
import { Reference } from './Reference';
import { RelatedArtifact } from './RelatedArtifact';
import { UsageContext } from './UsageContext';

export interface Evidence extends DomainResource {
    approvalDate?: string;
    _approvalDate?: Element;
    author?: ContactDetail[];
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
    exposureBackground: Reference<'EvidenceVariable'>;
    exposureVariant?: Reference<'EvidenceVariable'>[];
    identifier?: Identifier[];
    jurisdiction?: CodeableConcept[];
    lastReviewDate?: string;
    _lastReviewDate?: Element;
    name?: string;
    _name?: Element;
    note?: Annotation[];
    outcome?: Reference<'EvidenceVariable'>[];
    publisher?: string;
    _publisher?: Element;
    relatedArtifact?: RelatedArtifact[];
    reviewer?: ContactDetail[];
    shortTitle?: string;
    _shortTitle?: Element;
    status: 'draft' | 'active' | 'retired' | 'unknown';
    _status?: Element;
    subtitle?: string;
    _subtitle?: Element;
    title?: string;
    _title?: Element;
    topic?: CodeableConcept[];
    url?: string;
    _url?: Element;
    useContext?: UsageContext[];
    version?: string;
    _version?: Element;
}

