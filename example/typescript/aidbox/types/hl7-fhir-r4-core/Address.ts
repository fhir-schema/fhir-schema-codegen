// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Element } from './Element';
import { Period } from './Period';

export interface Address extends Element {
    city?: string;
    _city?: Element;
    country?: string;
    _country?: Element;
    district?: string;
    _district?: Element;
    line?: string[];
    _line?: Element;
    period?: Period;
    postalCode?: string;
    _postalCode?: Element;
    state?: string;
    _state?: Element;
    text?: string;
    _text?: Element;
    type?: 'postal' | 'physical' | 'both';
    _type?: Element;
    use?: 'home' | 'work' | 'temp' | 'old' | 'billing';
    _use?: Element;
}

