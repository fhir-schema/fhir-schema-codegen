// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Address } from './Address';
import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { ContactPoint } from './ContactPoint';
import { DomainResource } from './DomainResource';
import { HumanName } from './HumanName';
import { Identifier } from './Identifier';
import { Money } from './Money';
import { Period } from './Period';
import { Quantity } from './Quantity';
import { Reference } from './Reference';


export interface InsurancePlanCoverageBenefitLimit extends BackboneElement {
    code?: CodeableConcept;
    value?: Quantity;
}

export interface InsurancePlanCoverageBenefit extends BackboneElement {
    limit?: InsurancePlanCoverageBenefitLimit[];
    requirement?: string;
    type?: CodeableConcept;
}

export interface InsurancePlanCoverage extends BackboneElement {
    benefit?: InsurancePlanCoverageBenefit[];
    network?: Reference<'Organization'>[];
    type?: CodeableConcept;
}

export interface InsurancePlanPlanGeneralCost extends BackboneElement {
    comment?: string;
    cost?: Money;
    groupSize?: number;
    type?: CodeableConcept;
}

export interface InsurancePlanPlanSpecificCostBenefitCost extends BackboneElement {
    applicability?: CodeableConcept;
    qualifiers?: CodeableConcept[];
    type?: CodeableConcept;
    value?: Quantity;
}

export interface InsurancePlanPlanSpecificCostBenefit extends BackboneElement {
    cost?: InsurancePlanPlanSpecificCostBenefitCost[];
    type?: CodeableConcept;
}

export interface InsurancePlanPlanSpecificCost extends BackboneElement {
    benefit?: InsurancePlanPlanSpecificCostBenefit[];
    category?: CodeableConcept;
}

export interface InsurancePlanPlan extends BackboneElement {
    coverageArea?: Reference<'Location'>[];
    generalCost?: InsurancePlanPlanGeneralCost[];
    identifier?: Identifier[];
    network?: Reference<'Organization'>[];
    specificCost?: InsurancePlanPlanSpecificCost[];
    type?: CodeableConcept;
}

export interface InsurancePlanContact extends BackboneElement {
    address?: Address;
    name?: HumanName;
    purpose?: CodeableConcept;
    telecom?: ContactPoint[];
}

export interface InsurancePlan extends DomainResource {
    administeredBy?: Reference<'Organization'>;
    alias?: string[];
    _alias?: Element;
    contact?: InsurancePlanContact[];
    coverage?: InsurancePlanCoverage[];
    coverageArea?: Reference<'Location'>[];
    endpoint?: Reference<'Endpoint'>[];
    identifier?: Identifier[];
    name?: string;
    _name?: Element;
    network?: Reference<'Organization'>[];
    ownedBy?: Reference<'Organization'>;
    period?: Period;
    plan?: InsurancePlanPlan[];
    status?: 'draft' | 'active' | 'retired' | 'unknown';
    _status?: Element;
    type?: CodeableConcept[];
}

