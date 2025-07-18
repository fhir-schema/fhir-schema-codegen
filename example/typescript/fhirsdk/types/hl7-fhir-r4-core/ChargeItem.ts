// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Annotation } from './Annotation';
import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Money } from './Money';
import { Period } from './Period';
import { Quantity } from './Quantity';
import { Reference } from './Reference';
import { Timing } from './Timing';


export interface ChargeItemPerformer extends BackboneElement {
    actor: Reference<'CareTeam' | 'Device' | 'Organization' | 'Patient' | 'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>;
    function?: CodeableConcept;
}

export interface ChargeItem extends DomainResource {
    account?: Reference<'Account'>[];
    bodysite?: CodeableConcept[];
    code: CodeableConcept;
    context?: Reference<'Encounter' | 'EpisodeOfCare'>;
    costCenter?: Reference<'Organization'>;
    definitionCanonical?: string[];
    _definitionCanonical?: Element;
    definitionUri?: string[];
    _definitionUri?: Element;
    enteredDate?: string;
    _enteredDate?: Element;
    enterer?: Reference<'Device' | 'Organization' | 'Patient' | 'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>;
    factorOverride?: number;
    _factorOverride?: Element;
    identifier?: Identifier[];
    note?: Annotation[];
    occurrenceDateTime?: string;
    _occurrenceDateTime?: Element;
    occurrencePeriod?: Period;
    occurrenceTiming?: Timing;
    overrideReason?: string;
    _overrideReason?: Element;
    partOf?: Reference<'ChargeItem'>[];
    performer?: ChargeItemPerformer[];
    performingOrganization?: Reference<'Organization'>;
    priceOverride?: Money;
    productCodeableConcept?: CodeableConcept;
    productReference?: Reference<'Device' | 'Medication' | 'Substance'>;
    quantity?: Quantity;
    reason?: CodeableConcept[];
    requestingOrganization?: Reference<'Organization'>;
    service?: Reference<'DiagnosticReport' | 'ImagingStudy' | 'Immunization' | 'MedicationAdministration' | 'MedicationDispense' | 'Observation' | 'Procedure' | 'SupplyDelivery'>[];
    status: 'planned' | 'billable' | 'not-billable' | 'aborted' | 'billed' | 'entered-in-error' | 'unknown';
    _status?: Element;
    subject: Reference<'Group' | 'Patient'>;
    supportingInformation?: Reference<'Resource'>[];
}

