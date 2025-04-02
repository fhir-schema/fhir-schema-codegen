// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Period } from './Period';
import { Reference } from './Reference';


export interface DetectedIssueEvidence extends BackboneElement {
    code?: CodeableConcept[];
    detail?: Reference<'Resource'>[];
}

export interface DetectedIssueMitigation extends BackboneElement {
    action?: CodeableConcept;
    author?: Reference<'Practitioner' | 'PractitionerRole'>;
    date?: string;
}

export interface DetectedIssue extends DomainResource {
    author?: Reference<'Device' | 'Practitioner' | 'PractitionerRole'>;
    code?: CodeableConcept;
    detail?: string;
    _detail?: Element;
    evidence?: DetectedIssueEvidence[];
    identifiedDateTime?: string;
    _identifiedDateTime?: Element;
    identifiedPeriod?: Period;
    identifier?: Identifier[];
    implicated?: Reference<'Resource'>[];
    mitigation?: DetectedIssueMitigation[];
    patient?: Reference<'Patient'>;
    reference?: string;
    _reference?: Element;
    severity?: 'high' | 'moderate' | 'low';
    _severity?: Element;
    status?: 'registered' | 'preliminary' | 'final' | 'amended' | 'cancelled' | 'entered-in-error' | 'unknown';
    _status?: Element;
}

