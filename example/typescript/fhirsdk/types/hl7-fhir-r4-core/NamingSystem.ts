// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { ContactDetail } from './ContactDetail';
import { DomainResource } from './DomainResource';
import { Period } from './Period';
import { UsageContext } from './UsageContext';


export interface NamingSystemUniqueId extends BackboneElement {
    comment?: string;
    period?: Period;
    preferred?: boolean;
    type: 'oid' | 'uuid' | 'uri' | 'other';
    value: string;
}

export interface NamingSystem extends DomainResource {
    contact?: ContactDetail[];
    date: string;
    _date?: Element;
    description?: string;
    _description?: Element;
    jurisdiction?: CodeableConcept[];
    kind: 'codesystem' | 'identifier' | 'root';
    _kind?: Element;
    name: string;
    _name?: Element;
    publisher?: string;
    _publisher?: Element;
    responsible?: string;
    _responsible?: Element;
    status: 'draft' | 'active' | 'retired' | 'unknown';
    _status?: Element;
    type?: CodeableConcept;
    uniqueId: NamingSystemUniqueId[];
    usage?: string;
    _usage?: Element;
    useContext?: UsageContext[];
}

