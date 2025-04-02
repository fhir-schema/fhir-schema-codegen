// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { BackboneElement } from './BackboneElement';
import { DomainResource } from './DomainResource';
import { Reference } from './Reference';


export interface LinkageItem extends BackboneElement {
    resource?: Reference<'Resource'>;
    type?: 'source' | 'alternate' | 'historical';
}

export interface Linkage extends DomainResource {
    active?: boolean;
    _active?: Element;
    author?: Reference<'Organization' | 'Practitioner' | 'PractitionerRole'>;
    item?: LinkageItem[];
}

