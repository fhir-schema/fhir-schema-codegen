// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Annotation } from './Annotation';
import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { Coding } from './Coding';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Reference } from './Reference';


export interface ImagingStudySeriesInstance extends BackboneElement {
    number?: number;
    sopClass?: Coding;
    title?: string;
    uid?: string;
}

export interface ImagingStudySeriesPerformer extends BackboneElement {
    actor?: Reference<'CareTeam' | 'Device' | 'Organization' | 'Patient' | 'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>;
    function?: CodeableConcept;
}

export interface ImagingStudySeries extends BackboneElement {
    bodySite?: Coding;
    description?: string;
    endpoint?: Reference<'Endpoint'>[];
    instance?: ImagingStudySeriesInstance[];
    laterality?: Coding;
    modality?: Coding;
    number?: number;
    numberOfInstances?: number;
    performer?: ImagingStudySeriesPerformer[];
    specimen?: Reference<'Specimen'>[];
    started?: string;
    uid?: string;
}

export interface ImagingStudy extends DomainResource {
    basedOn?: Reference<'Appointment' | 'AppointmentResponse' | 'CarePlan' | 'ServiceRequest' | 'Task'>[];
    description?: string;
    _description?: Element;
    encounter?: Reference<'Encounter'>;
    endpoint?: Reference<'Endpoint'>[];
    identifier?: Identifier[];
    interpreter?: Reference<'Practitioner' | 'PractitionerRole'>[];
    location?: Reference<'Location'>;
    modality?: Coding[];
    note?: Annotation[];
    numberOfInstances?: number;
    _numberOfInstances?: Element;
    numberOfSeries?: number;
    _numberOfSeries?: Element;
    procedureCode?: CodeableConcept[];
    procedureReference?: Reference<'Procedure'>;
    reasonCode?: CodeableConcept[];
    reasonReference?: Reference<'Condition' | 'DiagnosticReport' | 'DocumentReference' | 'Media' | 'Observation'>[];
    referrer?: Reference<'Practitioner' | 'PractitionerRole'>;
    series?: ImagingStudySeries[];
    started?: string;
    _started?: Element;
    status?: 'registered' | 'available' | 'cancelled' | 'entered-in-error' | 'unknown';
    _status?: Element;
    subject?: Reference<'Device' | 'Group' | 'Patient'>;
}

