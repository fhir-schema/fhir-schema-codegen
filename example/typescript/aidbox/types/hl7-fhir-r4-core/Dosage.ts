// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { Element } from './Element';
import { Quantity } from './Quantity';
import { Ratio } from './Ratio';
import { Timing } from './Timing';

export interface Dosage extends BackboneElement {
    additionalInstruction?: CodeableConcept[];
    asNeededBoolean?: boolean;
    _asNeededBoolean?: Element;
    asNeededCodeableConcept?: CodeableConcept;
    doseAndRate?: Element[];
    maxDosePerAdministration?: Quantity;
    maxDosePerLifetime?: Quantity;
    maxDosePerPeriod?: Ratio;
    method?: CodeableConcept;
    patientInstruction?: string;
    _patientInstruction?: Element;
    route?: CodeableConcept;
    sequence?: number;
    _sequence?: Element;
    site?: CodeableConcept;
    text?: string;
    _text?: Element;
    timing?: Timing;
}

