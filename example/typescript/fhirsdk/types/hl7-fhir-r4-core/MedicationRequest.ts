// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Annotation } from './Annotation';
import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { DomainResource } from './DomainResource';
import { Dosage } from './Dosage';
import { Duration } from './Duration';
import { Identifier } from './Identifier';
import { Period } from './Period';
import { Quantity } from './Quantity';
import { Reference } from './Reference';


export interface MedicationRequestDispenseRequest extends BackboneElement {
    dispenseInterval?: Duration;
    expectedSupplyDuration?: Duration;
    initialFill?: MedicationRequestDispenseRequestInitialFill;
    numberOfRepeatsAllowed?: number;
    performer?: Reference<'Organization'>;
    quantity?: Quantity;
    validityPeriod?: Period;
}

export interface MedicationRequestDispenseRequestInitialFill extends BackboneElement {
    duration?: Duration;
    quantity?: Quantity;
}

export interface MedicationRequestSubstitution extends BackboneElement {
    allowedBoolean?: boolean;
    allowedCodeableConcept?: CodeableConcept;
    reason?: CodeableConcept;
}

export interface MedicationRequest extends DomainResource {
    authoredOn?: string;
    _authoredOn?: Element;
    basedOn?: Reference<'CarePlan' | 'ImmunizationRecommendation' | 'MedicationRequest' | 'ServiceRequest'>[];
    category?: CodeableConcept[];
    courseOfTherapyType?: CodeableConcept;
    detectedIssue?: Reference<'DetectedIssue'>[];
    dispenseRequest?: MedicationRequestDispenseRequest;
    doNotPerform?: boolean;
    _doNotPerform?: Element;
    dosageInstruction?: Dosage[];
    encounter?: Reference<'Encounter'>;
    eventHistory?: Reference<'Provenance'>[];
    groupIdentifier?: Identifier;
    identifier?: Identifier[];
    instantiatesCanonical?: string[];
    _instantiatesCanonical?: Element;
    instantiatesUri?: string[];
    _instantiatesUri?: Element;
    insurance?: Reference<'ClaimResponse' | 'Coverage'>[];
    intent: 'proposal' | 'plan' | 'order' | 'original-order' | 'reflex-order' | 'filler-order' | 'instance-order' | 'option';
    _intent?: Element;
    medicationCodeableConcept?: CodeableConcept;
    medicationReference?: Reference<'Medication'>;
    note?: Annotation[];
    performer?: Reference<'CareTeam' | 'Device' | 'Organization' | 'Patient' | 'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>;
    performerType?: CodeableConcept;
    priority?: 'routine' | 'urgent' | 'asap' | 'stat';
    _priority?: Element;
    priorPrescription?: Reference<'MedicationRequest'>;
    reasonCode?: CodeableConcept[];
    reasonReference?: Reference<'Condition' | 'Observation'>[];
    recorder?: Reference<'Practitioner' | 'PractitionerRole'>;
    reportedBoolean?: boolean;
    _reportedBoolean?: Element;
    reportedReference?: Reference<'Organization' | 'Patient' | 'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>;
    requester?: Reference<'Device' | 'Organization' | 'Patient' | 'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>;
    status: 'active' | 'on-hold' | 'cancelled' | 'completed' | 'entered-in-error' | 'stopped' | 'draft' | 'unknown';
    _status?: Element;
    statusReason?: CodeableConcept;
    subject: Reference<'Group' | 'Patient'>;
    substitution?: MedicationRequestSubstitution;
    supportingInformation?: Reference<'Resource'>[];
}

