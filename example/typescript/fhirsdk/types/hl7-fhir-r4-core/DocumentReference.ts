// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Attachment } from './Attachment';
import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { Coding } from './Coding';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Period } from './Period';
import { Reference } from './Reference';


export interface DocumentReferenceContent extends BackboneElement {
    attachment: Attachment;
    format?: Coding;
}

export interface DocumentReferenceContext extends BackboneElement {
    encounter?: Reference<'Encounter' | 'EpisodeOfCare'>[];
    event?: CodeableConcept[];
    facilityType?: CodeableConcept;
    period?: Period;
    practiceSetting?: CodeableConcept;
    related?: Reference<'Resource'>[];
    sourcePatientInfo?: Reference<'Patient'>;
}

export interface DocumentReferenceRelatesTo extends BackboneElement {
    code: 'replaces' | 'transforms' | 'signs' | 'appends';
    target: Reference<'DocumentReference'>;
}

export interface DocumentReference extends DomainResource {
    authenticator?: Reference<'Organization' | 'Practitioner' | 'PractitionerRole'>;
    author?: Reference<'Device' | 'Organization' | 'Patient' | 'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>[];
    category?: CodeableConcept[];
    content: DocumentReferenceContent[];
    context?: DocumentReferenceContext;
    custodian?: Reference<'Organization'>;
    date?: string;
    _date?: Element;
    description?: string;
    _description?: Element;
    docStatus?: 'preliminary' | 'final' | 'amended' | 'entered-in-error';
    _docStatus?: Element;
    identifier?: Identifier[];
    masterIdentifier?: Identifier;
    relatesTo?: DocumentReferenceRelatesTo[];
    securityLabel?: CodeableConcept[];
    status: 'current' | 'superseded' | 'entered-in-error';
    _status?: Element;
    subject?: Reference<'Device' | 'Group' | 'Patient' | 'Practitioner'>;
    type?: CodeableConcept;
}

