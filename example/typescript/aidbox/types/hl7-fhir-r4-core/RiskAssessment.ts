// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Annotation } from './Annotation';
import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Period } from './Period';
import { Range } from './Range';
import { Reference } from './Reference';


export interface RiskAssessmentPrediction extends BackboneElement {
    outcome?: CodeableConcept;
    probabilityDecimal?: number;
    probabilityRange?: Range;
    qualitativeRisk?: CodeableConcept;
    rationale?: string;
    relativeRisk?: number;
    whenPeriod?: Period;
    whenRange?: Range;
}

export interface RiskAssessment extends DomainResource {
    basedOn?: Reference<'Resource'>;
    basis?: Reference<'Resource'>[];
    code?: CodeableConcept;
    condition?: Reference<'Condition'>;
    encounter?: Reference<'Encounter'>;
    identifier?: Identifier[];
    method?: CodeableConcept;
    mitigation?: string;
    _mitigation?: Element;
    note?: Annotation[];
    occurrenceDateTime?: string;
    _occurrenceDateTime?: Element;
    occurrencePeriod?: Period;
    parent?: Reference<'Resource'>;
    performer?: Reference<'Device' | 'Practitioner' | 'PractitionerRole'>;
    prediction?: RiskAssessmentPrediction[];
    reasonCode?: CodeableConcept[];
    reasonReference?: Reference<'Condition' | 'DiagnosticReport' | 'DocumentReference' | 'Observation'>[];
    status?: 'registered' | 'preliminary' | 'final' | 'amended' | 'cancelled' | 'entered-in-error' | 'unknown';
    _status?: Element;
    subject?: Reference<'Group' | 'Patient'>;
}

