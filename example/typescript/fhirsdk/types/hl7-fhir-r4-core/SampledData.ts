// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Element } from './Element';
import { Quantity } from './Quantity';

export interface SampledData extends Element {
    data?: string;
    _data?: Element;
    dimensions: number;
    _dimensions?: Element;
    factor?: number;
    _factor?: Element;
    lowerLimit?: number;
    _lowerLimit?: Element;
    origin: Quantity;
    period: number;
    _period?: Element;
    upperLimit?: number;
    _upperLimit?: Element;
}

