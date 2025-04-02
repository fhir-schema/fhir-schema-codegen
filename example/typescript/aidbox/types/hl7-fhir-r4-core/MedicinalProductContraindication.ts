// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { DomainResource } from './DomainResource';
import { Population } from './Population';
import { Reference } from './Reference';


export interface MedicinalProductContraindicationOtherTherapy extends BackboneElement {
    medicationCodeableConcept?: CodeableConcept;
    medicationReference?: Reference<'Medication' | 'MedicinalProduct' | 'Substance' | 'SubstanceSpecification'>;
    therapyRelationshipType?: CodeableConcept;
}

export interface MedicinalProductContraindication extends DomainResource {
    comorbidity?: CodeableConcept[];
    disease?: CodeableConcept;
    diseaseStatus?: CodeableConcept;
    otherTherapy?: MedicinalProductContraindicationOtherTherapy[];
    population?: Population[];
    subject?: Reference<'Medication' | 'MedicinalProduct'>[];
    therapeuticIndication?: Reference<'MedicinalProductIndication'>[];
}

