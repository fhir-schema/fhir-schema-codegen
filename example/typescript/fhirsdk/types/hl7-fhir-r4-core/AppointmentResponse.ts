// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { CodeableConcept } from './CodeableConcept';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Reference } from './Reference';

export interface AppointmentResponse extends DomainResource {
    actor?: Reference<'Device' | 'HealthcareService' | 'Location' | 'Patient' | 'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>;
    appointment: Reference<'Appointment'>;
    comment?: string;
    _comment?: Element;
    end?: string;
    _end?: Element;
    identifier?: Identifier[];
    participantStatus: 'accepted' | 'declined' | 'tentative' | 'needs-action';
    _participantStatus?: Element;
    participantType?: CodeableConcept[];
    start?: string;
    _start?: Element;
}

