// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { Coding } from './Coding';
import { DomainResource } from './DomainResource';
import { Duration } from './Duration';
import { Identifier } from './Identifier';
import { Period } from './Period';
import { Reference } from './Reference';


export interface EncounterClassHistory extends BackboneElement {
    class: Coding;
    period: Period;
}

export interface EncounterDiagnosis extends BackboneElement {
    condition: Reference<'Condition' | 'Procedure'>;
    rank?: number;
    use?: CodeableConcept;
}

export interface EncounterHospitalization extends BackboneElement {
    admitSource?: CodeableConcept;
    destination?: Reference<'Location' | 'Organization'>;
    dietPreference?: CodeableConcept[];
    dischargeDisposition?: CodeableConcept;
    origin?: Reference<'Location' | 'Organization'>;
    preAdmissionIdentifier?: Identifier;
    reAdmission?: CodeableConcept;
    specialArrangement?: CodeableConcept[];
    specialCourtesy?: CodeableConcept[];
}

export interface EncounterLocation extends BackboneElement {
    location: Reference<'Location'>;
    period?: Period;
    physicalType?: CodeableConcept;
    status?: 'planned' | 'active' | 'reserved' | 'completed';
}

export interface EncounterParticipant extends BackboneElement {
    individual?: Reference<'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>;
    period?: Period;
    type?: CodeableConcept[];
}

export interface EncounterStatusHistory extends BackboneElement {
    period: Period;
    status: 'planned' | 'arrived' | 'triaged' | 'in-progress' | 'onleave' | 'finished' | 'cancelled' | 'entered-in-error' | 'unknown';
}

export interface Encounter extends DomainResource {
    account?: Reference<'Account'>[];
    appointment?: Reference<'Appointment'>[];
    basedOn?: Reference<'ServiceRequest'>[];
    class: Coding;
    classHistory?: EncounterClassHistory[];
    diagnosis?: EncounterDiagnosis[];
    episodeOfCare?: Reference<'EpisodeOfCare'>[];
    hospitalization?: EncounterHospitalization;
    identifier?: Identifier[];
    length?: Duration;
    location?: EncounterLocation[];
    participant?: EncounterParticipant[];
    partOf?: Reference<'Encounter'>;
    period?: Period;
    priority?: CodeableConcept;
    reasonCode?: CodeableConcept[];
    reasonReference?: Reference<'Condition' | 'ImmunizationRecommendation' | 'Observation' | 'Procedure'>[];
    serviceProvider?: Reference<'Organization'>;
    serviceType?: CodeableConcept;
    status: 'planned' | 'arrived' | 'triaged' | 'in-progress' | 'onleave' | 'finished' | 'cancelled' | 'entered-in-error' | 'unknown';
    _status?: Element;
    statusHistory?: EncounterStatusHistory[];
    subject?: Reference<'Group' | 'Patient'>;
    type?: CodeableConcept[];
}

