// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Range } from './Range';
import { Reference } from './Reference';


export interface ObservationDefinitionQualifiedInterval extends BackboneElement {
    age?: Range;
    appliesTo?: CodeableConcept[];
    category?: 'reference' | 'critical' | 'absolute';
    condition?: string;
    context?: CodeableConcept;
    gender?: 'male' | 'female' | 'other' | 'unknown';
    gestationalAge?: Range;
    range?: Range;
}

export interface ObservationDefinitionQuantitativeDetails extends BackboneElement {
    conversionFactor?: number;
    customaryUnit?: CodeableConcept;
    decimalPrecision?: number;
    unit?: CodeableConcept;
}

export interface ObservationDefinition extends DomainResource {
    abnormalCodedValueSet?: Reference<'ValueSet'>;
    category?: CodeableConcept[];
    code: CodeableConcept;
    criticalCodedValueSet?: Reference<'ValueSet'>;
    identifier?: Identifier[];
    method?: CodeableConcept;
    multipleResultsAllowed?: boolean;
    _multipleResultsAllowed?: Element;
    normalCodedValueSet?: Reference<'ValueSet'>;
    permittedDataType?: 'Quantity' | 'CodeableConcept' | 'string' | 'boolean' | 'integer' | 'Range' | 'Ratio' | 'SampledData' | 'time' | 'dateTime' | 'Period'[];
    _permittedDataType?: Element;
    preferredReportName?: string;
    _preferredReportName?: Element;
    qualifiedInterval?: ObservationDefinitionQualifiedInterval[];
    quantitativeDetails?: ObservationDefinitionQuantitativeDetails;
    validCodedValueSet?: Reference<'ValueSet'>;
}

