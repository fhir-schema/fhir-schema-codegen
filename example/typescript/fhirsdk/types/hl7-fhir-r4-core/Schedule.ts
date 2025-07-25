// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { CodeableConcept } from './CodeableConcept';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Period } from './Period';
import { Reference } from './Reference';

export interface Schedule extends DomainResource {
    active?: boolean;
    _active?: Element;
    actor: Reference<'Device' | 'HealthcareService' | 'Location' | 'Patient' | 'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>[];
    comment?: string;
    _comment?: Element;
    identifier?: Identifier[];
    planningHorizon?: Period;
    serviceCategory?: CodeableConcept[];
    serviceType?: CodeableConcept[];
    specialty?: CodeableConcept[];
}

