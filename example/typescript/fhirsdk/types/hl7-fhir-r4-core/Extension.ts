// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Address } from './Address';
import { Age } from './Age';
import { Annotation } from './Annotation';
import { Attachment } from './Attachment';
import { CodeableConcept } from './CodeableConcept';
import { Coding } from './Coding';
import { ContactDetail } from './ContactDetail';
import { ContactPoint } from './ContactPoint';
import { Contributor } from './Contributor';
import { Count } from './Count';
import { DataRequirement } from './DataRequirement';
import { Distance } from './Distance';
import { Dosage } from './Dosage';
import { Duration } from './Duration';
import { Element } from './Element';
import { Expression } from './Expression';
import { HumanName } from './HumanName';
import { Identifier } from './Identifier';
import { Meta } from './Meta';
import { Money } from './Money';
import { ParameterDefinition } from './ParameterDefinition';
import { Period } from './Period';
import { Quantity } from './Quantity';
import { Range } from './Range';
import { Ratio } from './Ratio';
import { Reference } from './Reference';
import { RelatedArtifact } from './RelatedArtifact';
import { SampledData } from './SampledData';
import { Signature } from './Signature';
import { Timing } from './Timing';
import { TriggerDefinition } from './TriggerDefinition';
import { UsageContext } from './UsageContext';

export interface Extension extends Element {
    url: string;
    _url?: Element;
    valueAddress?: Address;
    valueAge?: Age;
    valueAnnotation?: Annotation;
    valueAttachment?: Attachment;
    valueBase64Binary?: string;
    _valueBase64Binary?: Element;
    valueBoolean?: boolean;
    _valueBoolean?: Element;
    valueCanonical?: string;
    _valueCanonical?: Element;
    valueCode?: string;
    _valueCode?: Element;
    valueCodeableConcept?: CodeableConcept;
    valueCoding?: Coding;
    valueContactDetail?: ContactDetail;
    valueContactPoint?: ContactPoint;
    valueContributor?: Contributor;
    valueCount?: Count;
    valueDataRequirement?: DataRequirement;
    valueDate?: string;
    _valueDate?: Element;
    valueDateTime?: string;
    _valueDateTime?: Element;
    valueDecimal?: number;
    _valueDecimal?: Element;
    valueDistance?: Distance;
    valueDosage?: Dosage;
    valueDuration?: Duration;
    valueExpression?: Expression;
    valueHumanName?: HumanName;
    valueId?: string;
    _valueId?: Element;
    valueIdentifier?: Identifier;
    valueInstant?: string;
    _valueInstant?: Element;
    valueInteger?: number;
    _valueInteger?: Element;
    valueMarkdown?: string;
    _valueMarkdown?: Element;
    valueMeta?: Meta;
    valueMoney?: Money;
    valueOid?: string;
    _valueOid?: Element;
    valueParameterDefinition?: ParameterDefinition;
    valuePeriod?: Period;
    valuePositiveInt?: number;
    _valuePositiveInt?: Element;
    valueQuantity?: Quantity;
    valueRange?: Range;
    valueRatio?: Ratio;
    valueReference?: Reference;
    valueRelatedArtifact?: RelatedArtifact;
    valueSampledData?: SampledData;
    valueSignature?: Signature;
    valueString?: string;
    _valueString?: Element;
    valueTime?: string;
    _valueTime?: Element;
    valueTiming?: Timing;
    valueTriggerDefinition?: TriggerDefinition;
    valueUnsignedInt?: number;
    _valueUnsignedInt?: Element;
    valueUri?: string;
    _valueUri?: Element;
    valueUrl?: string;
    _valueUrl?: Element;
    valueUsageContext?: UsageContext;
    valueUuid?: string;
    _valueUuid?: Element;
}

