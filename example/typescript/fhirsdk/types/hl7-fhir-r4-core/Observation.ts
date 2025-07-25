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
import { Range } from './Range';
import { Ratio } from './Ratio';
import { Reference } from './Reference';
import { SampledData } from './SampledData';
import { Timing } from './Timing';


export interface ObservationComponent extends BackboneElement {
    code: CodeableConcept;
    dataAbsentReason?: CodeableConcept;
    interpretation?: CodeableConcept[];
    referenceRange?: ObservationReferenceRange[];
    valueBoolean?: boolean;
    valueCodeableConcept?: CodeableConcept;
    valueDateTime?: string;
    valueInteger?: number;
    valuePeriod?: Period;
    valueQuantity?: Quantity;
    valueRange?: Range;
    valueRatio?: Ratio;
    valueSampledData?: SampledData;
    valueString?: string;
    valueTime?: string;
}

export interface ObservationReferenceRange extends BackboneElement {
    age?: Range;
    appliesTo?: CodeableConcept[];
    high?: Quantity;
    low?: Quantity;
    text?: string;
    type?: CodeableConcept;
}

export interface Observation extends DomainResource {
    basedOn?: Reference<'CarePlan' | 'DeviceRequest' | 'ImmunizationRecommendation' | 'MedicationRequest' | 'NutritionOrder' | 'ServiceRequest'>[];
    bodySite?: CodeableConcept;
    category?: CodeableConcept[];
    code: CodeableConcept;
    component?: ObservationComponent[];
    dataAbsentReason?: CodeableConcept;
    derivedFrom?: Reference<'DocumentReference' | 'ImagingStudy' | 'Media' | 'MolecularSequence' | 'Observation' | 'QuestionnaireResponse'>[];
    device?: Reference<'Device' | 'DeviceMetric'>;
    effectiveDateTime?: string;
    _effectiveDateTime?: Element;
    effectiveInstant?: string;
    _effectiveInstant?: Element;
    effectivePeriod?: Period;
    effectiveTiming?: Timing;
    encounter?: Reference<'Encounter'>;
    focus?: Reference<'Resource'>[];
    hasMember?: Reference<'MolecularSequence' | 'Observation' | 'QuestionnaireResponse'>[];
    identifier?: Identifier[];
    interpretation?: CodeableConcept[];
    issued?: string;
    _issued?: Element;
    method?: CodeableConcept;
    note?: Annotation[];
    partOf?: Reference<'ImagingStudy' | 'Immunization' | 'MedicationAdministration' | 'MedicationDispense' | 'MedicationStatement' | 'Procedure'>[];
    performer?: Reference<'CareTeam' | 'Organization' | 'Patient' | 'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>[];
    referenceRange?: ObservationReferenceRange[];
    specimen?: Reference<'Specimen'>;
    status: 'registered' | 'preliminary' | 'final' | 'amended' | 'cancelled' | 'entered-in-error' | 'unknown' | 'corrected';
    _status?: Element;
    subject?: Reference<'Device' | 'Group' | 'Location' | 'Patient'>;
    valueBoolean?: boolean;
    _valueBoolean?: Element;
    valueCodeableConcept?: CodeableConcept;
    valueDateTime?: string;
    _valueDateTime?: Element;
    valueInteger?: number;
    _valueInteger?: Element;
    valuePeriod?: Period;
    valueQuantity?: Quantity;
    valueRange?: Range;
    valueRatio?: Ratio;
    valueSampledData?: SampledData;
    valueString?: string;
    _valueString?: Element;
    valueTime?: string;
    _valueTime?: Element;
}

