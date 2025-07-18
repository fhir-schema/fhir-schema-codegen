// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Attachment } from './Attachment';
import { BackboneElement } from './BackboneElement';
import { Coding } from './Coding';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { Quantity } from './Quantity';
import { Reference } from './Reference';


export interface QuestionnaireResponseItem extends BackboneElement {
    answer?: QuestionnaireResponseItemAnswer[];
    definition?: string;
    item?: QuestionnaireResponseItem[];
    linkId: string;
    text?: string;
}

export interface QuestionnaireResponseItemAnswer extends BackboneElement {
    item?: QuestionnaireResponseItem[];
    valueAttachment?: Attachment;
    valueBoolean?: boolean;
    valueCoding?: Coding;
    valueDate?: string;
    valueDateTime?: string;
    valueDecimal?: number;
    valueInteger?: number;
    valueQuantity?: Quantity;
    valueReference?: Reference<'Resource'>;
    valueString?: string;
    valueTime?: string;
    valueUri?: string;
}

export interface QuestionnaireResponse extends DomainResource {
    author?: Reference<'Device' | 'Organization' | 'Patient' | 'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>;
    authored?: string;
    _authored?: Element;
    basedOn?: Reference<'CarePlan' | 'ServiceRequest'>[];
    encounter?: Reference<'Encounter'>;
    identifier?: Identifier;
    item?: QuestionnaireResponseItem[];
    partOf?: Reference<'Observation' | 'Procedure'>[];
    questionnaire?: string;
    _questionnaire?: Element;
    source?: Reference<'Patient' | 'Practitioner' | 'PractitionerRole' | 'RelatedPerson'>;
    status: 'in-progress' | 'completed' | 'amended' | 'entered-in-error' | 'stopped';
    _status?: Element;
    subject?: Reference<'Resource'>;
}

