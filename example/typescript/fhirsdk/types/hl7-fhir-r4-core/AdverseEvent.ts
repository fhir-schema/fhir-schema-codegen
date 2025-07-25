// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Reference } from './Reference';


export interface AdverseEventSuspectEntity extends BackboneElement {
    causality?: AdverseEventSuspectEntityCausality[];
    instance: Reference<'Device' | 'Immunization' | 'Medication' | 'MedicationAdministration' | 'MedicationStatement' | 'Procedure' | 'Substance'>;
}

export interface AdverseEventSuspectEntityCausality extends BackboneElement {
    assessment?: CodeableConcept;
    author?: Reference<'Practitioner' | 'PractitionerRole'>;
    method?: CodeableConcept;
    productRelatedness?: string;
}

export interface AdverseEvent extends DomainResource {
    actuality: 'actual' | 'potential';
    _actuality?: Element;
    category?: CodeableConcept[];
    contributor?: Reference<'Device' | 'Practitioner' | 'PractitionerRole'>[];
    date?: string;
    _date?: Element;
    detected?: string;
    _detected?: Element;
    encounter?: Reference<'Encounter'>;
    event?: CodeableConcept;
    identifier?: Identifier;
    location?: Reference<'Location'>;
    outcome?: CodeableConcept;
    recordedDate?: string;
    _recordedDate?: Element;
    recorder?: Reference<'Patient' | 'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>;
    referenceDocument?: Reference<'DocumentReference'>[];
    resultingCondition?: Reference<'Condition'>[];
    seriousness?: CodeableConcept;
    severity?: CodeableConcept;
    study?: Reference<'ResearchStudy'>[];
    subject: Reference<'Group' | 'Patient' | 'Practitioner' | 'RelatedPerson'>;
    subjectMedicalHistory?: Reference<'AllergyIntolerance' | 'Condition' | 'DocumentReference' | 'FamilyMemberHistory' | 'Immunization' | 'Media' | 'Observation' | 'Procedure'>[];
    suspectEntity?: AdverseEventSuspectEntity[];
}

