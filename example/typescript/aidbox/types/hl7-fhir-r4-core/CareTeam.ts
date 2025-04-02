// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Annotation } from './Annotation';
import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { ContactPoint } from './ContactPoint';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Period } from './Period';
import { Reference } from './Reference';


export interface CareTeamParticipant extends BackboneElement {
    member?: Reference<'CareTeam' | 'Organization' | 'Patient' | 'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>;
    onBehalfOf?: Reference<'Organization'>;
    period?: Period;
    role?: CodeableConcept[];
}

export interface CareTeam extends DomainResource {
    category?: CodeableConcept[];
    encounter?: Reference<'Encounter'>;
    identifier?: Identifier[];
    managingOrganization?: Reference<'Organization'>[];
    name?: string;
    _name?: Element;
    note?: Annotation[];
    participant?: CareTeamParticipant[];
    period?: Period;
    reasonCode?: CodeableConcept[];
    reasonReference?: Reference<'Condition'>[];
    status?: 'proposed' | 'active' | 'suspended' | 'inactive' | 'entered-in-error';
    _status?: Element;
    subject?: Reference<'Group' | 'Patient'>;
    telecom?: ContactPoint[];
}

