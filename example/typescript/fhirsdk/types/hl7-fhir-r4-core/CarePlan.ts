// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Annotation } from './Annotation';
import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Period } from './Period';
import { Quantity } from './Quantity';
import { Reference } from './Reference';
import { Timing } from './Timing';


export interface CarePlanActivity extends BackboneElement {
    detail?: CarePlanActivityDetail;
    outcomeCodeableConcept?: CodeableConcept[];
    outcomeReference?: Reference<'Resource'>[];
    progress?: Annotation[];
    reference?: Reference<'Appointment' | 'CommunicationRequest' | 'DeviceRequest' | 'MedicationRequest' | 'NutritionOrder' | 'RequestGroup' | 'ServiceRequest' | 'Task' | 'VisionPrescription'>;
}

export interface CarePlanActivityDetail extends BackboneElement {
    code?: CodeableConcept;
    dailyAmount?: Quantity;
    description?: string;
    doNotPerform?: boolean;
    goal?: Reference<'Goal'>[];
    instantiatesCanonical?: string[];
    instantiatesUri?: string[];
    kind?: 'Appointment' | 'CommunicationRequest' | 'DeviceRequest' | 'MedicationRequest' | 'NutritionOrder' | 'Task' | 'ServiceRequest' | 'VisionPrescription';
    location?: Reference<'Location'>;
    performer?: Reference<'CareTeam' | 'Device' | 'HealthcareService' | 'Organization' | 'Patient' | 'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>[];
    productCodeableConcept?: CodeableConcept;
    productReference?: Reference<'Medication' | 'Substance'>;
    quantity?: Quantity;
    reasonCode?: CodeableConcept[];
    reasonReference?: Reference<'Condition' | 'DiagnosticReport' | 'DocumentReference' | 'Observation'>[];
    scheduledPeriod?: Period;
    scheduledString?: string;
    scheduledTiming?: Timing;
    status: 'not-started' | 'scheduled' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled' | 'unknown' | 'entered-in-error' | 'stopped';
    statusReason?: CodeableConcept;
}

export interface CarePlan extends DomainResource {
    activity?: CarePlanActivity[];
    addresses?: Reference<'Condition'>[];
    author?: Reference<'CareTeam' | 'Device' | 'Organization' | 'Patient' | 'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>;
    basedOn?: Reference<'CarePlan'>[];
    careTeam?: Reference<'CareTeam'>[];
    category?: CodeableConcept[];
    contributor?: Reference<'CareTeam' | 'Device' | 'Organization' | 'Patient' | 'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>[];
    created?: string;
    _created?: Element;
    description?: string;
    _description?: Element;
    encounter?: Reference<'Encounter'>;
    goal?: Reference<'Goal'>[];
    identifier?: Identifier[];
    instantiatesCanonical?: string[];
    _instantiatesCanonical?: Element;
    instantiatesUri?: string[];
    _instantiatesUri?: Element;
    intent: 'proposal' | 'plan' | 'order' | 'option';
    _intent?: Element;
    note?: Annotation[];
    partOf?: Reference<'CarePlan'>[];
    period?: Period;
    replaces?: Reference<'CarePlan'>[];
    status: 'draft' | 'active' | 'on-hold' | 'revoked' | 'completed' | 'entered-in-error' | 'unknown';
    _status?: Element;
    subject: Reference<'Group' | 'Patient'>;
    supportingInfo?: Reference<'Resource'>[];
    title?: string;
    _title?: Element;
}

