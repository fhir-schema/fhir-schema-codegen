// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { CodeableConcept } from './CodeableConcept';
import { ContactDetail } from './ContactDetail';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Period } from './Period';
import { Reference } from './Reference';
import { RelatedArtifact } from './RelatedArtifact';
import { TriggerDefinition } from './TriggerDefinition';
import { UsageContext } from './UsageContext';

export interface EventDefinition extends DomainResource {
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
    experimental?: boolean;
    _experimental?: Element;
    identifier?: Identifier[];
    jurisdiction?: CodeableConcept[];
    lastReviewDate?: string;
    _lastReviewDate?: Element;
    name?: string;
    _name?: Element;
    publisher?: string;
    _publisher?: Element;
    purpose?: string;
    _purpose?: Element;
    relatedArtifact?: RelatedArtifact[];
    reviewer?: ContactDetail[];
    status: 'draft' | 'active' | 'retired' | 'unknown';
    _status?: Element;
    subjectCodeableConcept?: CodeableConcept;
    subjectReference?: Reference<'Group'>;
    subtitle?: string;
    _subtitle?: Element;
    title?: string;
    _title?: Element;
    topic?: CodeableConcept[];
    trigger: TriggerDefinition[];
    url?: string;
    _url?: Element;
    usage?: string;
    _usage?: Element;
    useContext?: UsageContext[];
    version?: string;
    _version?: Element;
}

