// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Annotation } from './Annotation';
import { CodeableConcept } from './CodeableConcept';
import { DataRequirement } from './DataRequirement';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Reference } from './Reference';

export interface GuidanceResponse extends DomainResource {
    dataRequirement?: DataRequirement[];
    encounter?: Reference<'Encounter'>;
    evaluationMessage?: Reference<'OperationOutcome'>[];
    identifier?: Identifier[];
    moduleCanonical?: string;
    _moduleCanonical?: Element;
    moduleCodeableConcept?: CodeableConcept;
    moduleUri?: string;
    _moduleUri?: Element;
    note?: Annotation[];
    occurrenceDateTime?: string;
    _occurrenceDateTime?: Element;
    outputParameters?: Reference<'Parameters'>;
    performer?: Reference<'Device'>;
    reasonCode?: CodeableConcept[];
    reasonReference?: Reference<'Condition' | 'DiagnosticReport' | 'DocumentReference' | 'Observation'>[];
    requestIdentifier?: Identifier;
    result?: Reference<'CarePlan' | 'RequestGroup'>;
    status: 'success' | 'data-requested' | 'data-required' | 'in-progress' | 'failure' | 'entered-in-error';
    _status?: Element;
    subject?: Reference<'Group' | 'Patient'>;
}

