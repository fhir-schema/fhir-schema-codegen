// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Annotation } from './Annotation';
import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Reference } from './Reference';


export interface ListEntry extends BackboneElement {
    date?: string;
    deleted?: boolean;
    flag?: CodeableConcept;
    item?: Reference<'Resource'>;
}

export interface List extends DomainResource {
    code?: CodeableConcept;
    date?: string;
    _date?: Element;
    emptyReason?: CodeableConcept;
    encounter?: Reference<'Encounter'>;
    entry?: ListEntry[];
    identifier?: Identifier[];
    mode?: 'working' | 'snapshot' | 'changes';
    _mode?: Element;
    note?: Annotation[];
    orderedBy?: CodeableConcept;
    source?: Reference<'Device' | 'Patient' | 'Practitioner' | 'PractitionerRole'>;
    status?: 'current' | 'retired' | 'entered-in-error';
    _status?: Element;
    subject?: Reference<'Device' | 'Group' | 'Location' | 'Patient'>;
    title?: string;
    _title?: Element;
}

