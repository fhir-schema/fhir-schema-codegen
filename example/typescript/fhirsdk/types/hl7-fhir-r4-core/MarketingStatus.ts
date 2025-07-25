// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { Period } from './Period';

export interface MarketingStatus extends BackboneElement {
    country: CodeableConcept;
    dateRange: Period;
    jurisdiction?: CodeableConcept;
    restoreDate?: string;
    _restoreDate?: Element;
    status: CodeableConcept;
}

