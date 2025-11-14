/**
 * FHIR Extension value[x] Discriminated Union Types
 *
 * Per FHIR R4 Extensibility Specification (https://build.fhir.org/extensibility.html):
 * "The value[x] element has an actual name of 'value' and then the TitleCased name
 * of one of these defined types."
 *
 * Extensions use discriminated unions to enforce that ONLY ONE value type exists
 * at a time, matching the FHIR spec semantics of polymorphic elements.
 *
 * These types are used by Extension profiles to constrain which value types are allowed.
 */

import type { Address } from './types/hl7-fhir-r4-core/Address';
import type { Age } from './types/hl7-fhir-r4-core/Age';
import type { Annotation } from './types/hl7-fhir-r4-core/Annotation';
import type { Attachment } from './types/hl7-fhir-r4-core/Attachment';
import type { CodeableConcept } from './types/hl7-fhir-r4-core/CodeableConcept';
import type { Coding } from './types/hl7-fhir-r4-core/Coding';
import type { ContactDetail } from './types/hl7-fhir-r4-core/ContactDetail';
import type { ContactPoint } from './types/hl7-fhir-r4-core/ContactPoint';
import type { Contributor } from './types/hl7-fhir-r4-core/Contributor';
import type { Count } from './types/hl7-fhir-r4-core/Count';
import type { DataRequirement } from './types/hl7-fhir-r4-core/DataRequirement';
import type { Distance } from './types/hl7-fhir-r4-core/Distance';
import type { Dosage } from './types/hl7-fhir-r4-core/Dosage';
import type { Duration } from './types/hl7-fhir-r4-core/Duration';
import type { Expression } from './types/hl7-fhir-r4-core/Expression';
import type { HumanName } from './types/hl7-fhir-r4-core/HumanName';
import type { Identifier } from './types/hl7-fhir-r4-core/Identifier';
import type { Meta } from './types/hl7-fhir-r4-core/Meta';
import type { Money } from './types/hl7-fhir-r4-core/Money';
import type { ParameterDefinition } from './types/hl7-fhir-r4-core/ParameterDefinition';
import type { Period } from './types/hl7-fhir-r4-core/Period';
import type { Quantity } from './types/hl7-fhir-r4-core/Quantity';
import type { Range } from './types/hl7-fhir-r4-core/Range';
import type { Ratio } from './types/hl7-fhir-r4-core/Ratio';
import type { Reference } from './types/hl7-fhir-r4-core/Reference';
import type { RelatedArtifact } from './types/hl7-fhir-r4-core/RelatedArtifact';
import type { SampledData } from './types/hl7-fhir-r4-core/SampledData';
import type { Signature } from './types/hl7-fhir-r4-core/Signature';
import type { Timing } from './types/hl7-fhir-r4-core/Timing';
import type { TriggerDefinition } from './types/hl7-fhir-r4-core/TriggerDefinition';
import type { UsageContext } from './types/hl7-fhir-r4-core/UsageContext';

/**
 * Complete discriminated union of all possible Extension value[x] types
 *
 * Represents FHIR's polymorphic value element where exactly ONE of these
 * value types can be present. Extension profiles constrain this to specific
 * types using helper types below.
 *
 * @example
 * ```typescript
 * // Valid: exactly one value type
 * const ext: ExtensionValueAll = { valueString: "hello" };
 *
 * // Invalid: TypeScript prevents multiple values
 * const bad: ExtensionValueAll = {
 *   valueString: "hello",
 *   valueCoding: { code: "test" }  // Error!
 * };
 * ```
 */
export type ExtensionValueAll =
    | { valueBase64Binary: string }
    | { valueBoolean: boolean }
    | { valueCanonical: string }
    | { valueCode: string }
    | { valueDate: string }
    | { valueDateTime: string }
    | { valueDecimal: number }
    | { valueId: string }
    | { valueInstant: string }
    | { valueInteger: number }
    | { valueMarkdown: string }
    | { valueOid: string }
    | { valuePositiveInt: number }
    | { valueString: string }
    | { valueTime: string }
    | { valueUnsignedInt: number }
    | { valueUri: string }
    | { valueUrl: string }
    | { valueUuid: string }
    | { valueAddress: Address }
    | { valueAge: Age }
    | { valueAnnotation: Annotation }
    | { valueAttachment: Attachment }
    | { valueCodeableConcept: CodeableConcept }
    | { valueCoding: Coding }
    | { valueContactPoint: ContactPoint }
    | { valueCount: Count }
    | { valueDistance: Distance }
    | { valueDuration: Duration }
    | { valueHumanName: HumanName }
    | { valueIdentifier: Identifier }
    | { valueMoney: Money }
    | { valuePeriod: Period }
    | { valueQuantity: Quantity }
    | { valueRange: Range }
    | { valueRatio: Ratio }
    | { valueReference: Reference }
    | { valueSampledData: SampledData }
    | { valueSignature: Signature }
    | { valueTiming: Timing }
    | { valueContactDetail: ContactDetail }
    | { valueContributor: Contributor }
    | { valueDataRequirement: DataRequirement }
    | { valueExpression: Expression }
    | { valueParameterDefinition: ParameterDefinition }
    | { valueRelatedArtifact: RelatedArtifact }
    | { valueTriggerDefinition: TriggerDefinition }
    | { valueUsageContext: UsageContext }
    | { valueDosage: Dosage }
    | { valueMeta: Meta };

/**
 * Helper type to extract specific value types from the complete union
 *
 * Use this to create type-safe extension value constraints that reference
 * the canonical ExtensionValueAll union.
 *
 * @template K - The value[x] field name(s) to extract
 *
 * @example
 * ```typescript
 * // Single type constraint
 * type MunicipalityCodeValue = ExtractExtensionValue<'valueCoding'>;
 * // Result: { valueCoding: Coding }
 *
 * // Multiple type constraint
 * type FlexibleValue = ExtractExtensionValue<'valueString' | 'valueCoding'>;
 * // Result: { valueString: string } | { valueCoding: Coding }
 * ```
 */
export type ExtractExtensionValue<K extends keyof ExtensionValueTypes> = Extract<
    ExtensionValueAll,
    Record<K, any>
>;

/**
 * Mapping of value[x] field names to their TypeScript types
 *
 * Used by ExtractExtensionValue helper to enable type-safe extraction
 * of specific value types from the discriminated union.
 */
export interface ExtensionValueTypes {
    valueBase64Binary: string;
    valueBoolean: boolean;
    valueCanonical: string;
    valueCode: string;
    valueDate: string;
    valueDateTime: string;
    valueDecimal: number;
    valueId: string;
    valueInstant: string;
    valueInteger: number;
    valueMarkdown: string;
    valueOid: string;
    valuePositiveInt: number;
    valueString: string;
    valueTime: string;
    valueUnsignedInt: number;
    valueUri: string;
    valueUrl: string;
    valueUuid: string;
    valueAddress: Address;
    valueAge: Age;
    valueAnnotation: Annotation;
    valueAttachment: Attachment;
    valueCodeableConcept: CodeableConcept;
    valueCoding: Coding;
    valueContactPoint: ContactPoint;
    valueCount: Count;
    valueDistance: Distance;
    valueDuration: Duration;
    valueHumanName: HumanName;
    valueIdentifier: Identifier;
    valueMoney: Money;
    valuePeriod: Period;
    valueQuantity: Quantity;
    valueRange: Range;
    valueRatio: Ratio;
    valueReference: Reference;
    valueSampledData: SampledData;
    valueSignature: Signature;
    valueTiming: Timing;
    valueContactDetail: ContactDetail;
    valueContributor: Contributor;
    valueDataRequirement: DataRequirement;
    valueExpression: Expression;
    valueParameterDefinition: ParameterDefinition;
    valueRelatedArtifact: RelatedArtifact;
    valueTriggerDefinition: TriggerDefinition;
    valueUsageContext: UsageContext;
    valueDosage: Dosage;
    valueMeta: Meta;
}
