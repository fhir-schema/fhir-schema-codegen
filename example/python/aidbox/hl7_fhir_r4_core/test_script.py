# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import Optional, List as L, Literal, ForwardRef

from aidbox.hl7_fhir_r4_core.base import BackboneElement, CodeableConcept, Coding, ContactDetail, Identifier, Reference, UsageContext
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class TestScriptVariable(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    default_value: Optional[str] = Field(None, alias="defaultValue", serialization_alias="defaultValue")
    description: Optional[str] = Field(None, alias="description", serialization_alias="description")
    expression: Optional[str] = Field(None, alias="expression", serialization_alias="expression")
    header_field: Optional[str] = Field(None, alias="headerField", serialization_alias="headerField")
    hint: Optional[str] = Field(None, alias="hint", serialization_alias="hint")
    name: Optional[str] = Field(None, alias="name", serialization_alias="name")
    path: Optional[str] = Field(None, alias="path", serialization_alias="path")
    source_id: Optional[str] = Field(None, alias="sourceId", serialization_alias="sourceId")

class TestScriptSetupActionOperationRequestHeader(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    field: Optional[str] = Field(None, alias="field", serialization_alias="field")
    value: Optional[str] = Field(None, alias="value", serialization_alias="value")

class TestScriptSetupActionOperation(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    accept: Optional[str] = Field(None, alias="accept", serialization_alias="accept")
    content_type: Optional[str] = Field(None, alias="contentType", serialization_alias="contentType")
    description: Optional[str] = Field(None, alias="description", serialization_alias="description")
    destination: Optional[int] = Field(None, alias="destination", serialization_alias="destination")
    encode_request_url: Optional[bool] = Field(None, alias="encodeRequestUrl", serialization_alias="encodeRequestUrl")
    label: Optional[str] = Field(None, alias="label", serialization_alias="label")
    method: Optional[Literal["delete", "get", "options", "patch", "post", "put", "head"]] = Field(None, alias="method", serialization_alias="method")
    origin: Optional[int] = Field(None, alias="origin", serialization_alias="origin")
    params: Optional[str] = Field(None, alias="params", serialization_alias="params")
    request_header: Optional[L[TestScriptSetupActionOperationRequestHeader]] = Field(None, alias="requestHeader", serialization_alias="requestHeader")
    request_id: Optional[str] = Field(None, alias="requestId", serialization_alias="requestId")
    resource: Optional[Literal["Address", "Age", "Annotation", "Attachment", "BackboneElement", "CodeableConcept", "Coding", "ContactDetail", "ContactPoint", "Contributor", "Count", "DataRequirement", "Distance", "Dosage", "Duration", "Element", "ElementDefinition", "Expression", "Extension", "HumanName", "Identifier", "MarketingStatus", "Meta", "Money", "MoneyQuantity", "Narrative", "ParameterDefinition", "Period", "Population", "ProdCharacteristic", "ProductShelfLife", "Quantity", "Range", "Ratio", "Reference", "RelatedArtifact", "SampledData", "Signature", "SimpleQuantity", "SubstanceAmount", "Timing", "TriggerDefinition", "UsageContext", "base64Binary", "boolean", "canonical", "code", "date", "dateTime", "decimal", "id", "instant", "integer", "markdown", "oid", "positiveInt", "string", "time", "unsignedInt", "uri", "url", "uuid", "xhtml", "Account", "ActivityDefinition", "AdverseEvent", "AllergyIntolerance", "Appointment", "AppointmentResponse", "AuditEvent", "Basic", "Binary", "BiologicallyDerivedProduct", "BodyStructure", "Bundle", "CapabilityStatement", "CarePlan", "CareTeam", "CatalogEntry", "ChargeItem", "ChargeItemDefinition", "Claim", "ClaimResponse", "ClinicalImpression", "CodeSystem", "Communication", "CommunicationRequest", "CompartmentDefinition", "Composition", "ConceptMap", "Condition", "Consent", "Contract", "Coverage", "CoverageEligibilityRequest", "CoverageEligibilityResponse", "DetectedIssue", "Device", "DeviceDefinition", "DeviceMetric", "DeviceRequest", "DeviceUseStatement", "DiagnosticReport", "DocumentManifest", "DocumentReference", "DomainResource", "EffectEvidenceSynthesis", "Encounter", "Endpoint", "EnrollmentRequest", "EnrollmentResponse", "EpisodeOfCare", "EventDefinition", "Evidence", "EvidenceVariable", "ExampleScenario", "ExplanationOfBenefit", "FamilyMemberHistory", "Flag", "Goal", "GraphDefinition", "Group", "GuidanceResponse", "HealthcareService", "ImagingStudy", "Immunization", "ImmunizationEvaluation", "ImmunizationRecommendation", "ImplementationGuide", "InsurancePlan", "Invoice", "Library", "Linkage", "List", "Location", "Measure", "MeasureReport", "Media", "Medication", "MedicationAdministration", "MedicationDispense", "MedicationKnowledge", "MedicationRequest", "MedicationStatement", "MedicinalProduct", "MedicinalProductAuthorization", "MedicinalProductContraindication", "MedicinalProductIndication", "MedicinalProductIngredient", "MedicinalProductInteraction", "MedicinalProductManufactured", "MedicinalProductPackaged", "MedicinalProductPharmaceutical", "MedicinalProductUndesirableEffect", "MessageDefinition", "MessageHeader", "MolecularSequence", "NamingSystem", "NutritionOrder", "Observation", "ObservationDefinition", "OperationDefinition", "OperationOutcome", "Organization", "OrganizationAffiliation", "Parameters", "Patient", "PaymentNotice", "PaymentReconciliation", "Person", "PlanDefinition", "Practitioner", "PractitionerRole", "Procedure", "Provenance", "Questionnaire", "QuestionnaireResponse", "RelatedPerson", "RequestGroup", "ResearchDefinition", "ResearchElementDefinition", "ResearchStudy", "ResearchSubject", "Resource", "RiskAssessment", "RiskEvidenceSynthesis", "Schedule", "SearchParameter", "ServiceRequest", "Slot", "Specimen", "SpecimenDefinition", "StructureDefinition", "StructureMap", "Subscription", "Substance", "SubstanceNucleicAcid", "SubstancePolymer", "SubstanceProtein", "SubstanceReferenceInformation", "SubstanceSourceMaterial", "SubstanceSpecification", "SupplyDelivery", "SupplyRequest", "Task", "TerminologyCapabilities", "TestReport", "TestScript", "ValueSet", "VerificationResult", "VisionPrescription"]] = Field(None, alias="resource", serialization_alias="resource")
    response_id: Optional[str] = Field(None, alias="responseId", serialization_alias="responseId")
    source_id: Optional[str] = Field(None, alias="sourceId", serialization_alias="sourceId")
    target_id: Optional[str] = Field(None, alias="targetId", serialization_alias="targetId")
    type: Optional[Coding] = Field(None, alias="type", serialization_alias="type")
    url: Optional[str] = Field(None, alias="url", serialization_alias="url")

class TestScriptSetupActionAssert(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    compare_to_source_expression: Optional[str] = Field(None, alias="compareToSourceExpression", serialization_alias="compareToSourceExpression")
    compare_to_source_id: Optional[str] = Field(None, alias="compareToSourceId", serialization_alias="compareToSourceId")
    compare_to_source_path: Optional[str] = Field(None, alias="compareToSourcePath", serialization_alias="compareToSourcePath")
    content_type: Optional[str] = Field(None, alias="contentType", serialization_alias="contentType")
    description: Optional[str] = Field(None, alias="description", serialization_alias="description")
    direction: Optional[Literal["response", "request"]] = Field(None, alias="direction", serialization_alias="direction")
    expression: Optional[str] = Field(None, alias="expression", serialization_alias="expression")
    header_field: Optional[str] = Field(None, alias="headerField", serialization_alias="headerField")
    label: Optional[str] = Field(None, alias="label", serialization_alias="label")
    minimum_id: Optional[str] = Field(None, alias="minimumId", serialization_alias="minimumId")
    navigation_links: Optional[bool] = Field(None, alias="navigationLinks", serialization_alias="navigationLinks")
    operator: Optional[Literal["equals", "notEquals", "in", "notIn", "greaterThan", "lessThan", "empty", "notEmpty", "contains", "notContains", "eval"]] = Field(None, alias="operator", serialization_alias="operator")
    path: Optional[str] = Field(None, alias="path", serialization_alias="path")
    request_method: Optional[Literal["delete", "get", "options", "patch", "post", "put", "head"]] = Field(None, alias="requestMethod", serialization_alias="requestMethod")
    request_url: Optional[str] = Field(None, alias="requestURL", serialization_alias="requestURL")
    resource: Optional[Literal["Address", "Age", "Annotation", "Attachment", "BackboneElement", "CodeableConcept", "Coding", "ContactDetail", "ContactPoint", "Contributor", "Count", "DataRequirement", "Distance", "Dosage", "Duration", "Element", "ElementDefinition", "Expression", "Extension", "HumanName", "Identifier", "MarketingStatus", "Meta", "Money", "MoneyQuantity", "Narrative", "ParameterDefinition", "Period", "Population", "ProdCharacteristic", "ProductShelfLife", "Quantity", "Range", "Ratio", "Reference", "RelatedArtifact", "SampledData", "Signature", "SimpleQuantity", "SubstanceAmount", "Timing", "TriggerDefinition", "UsageContext", "base64Binary", "boolean", "canonical", "code", "date", "dateTime", "decimal", "id", "instant", "integer", "markdown", "oid", "positiveInt", "string", "time", "unsignedInt", "uri", "url", "uuid", "xhtml", "Account", "ActivityDefinition", "AdverseEvent", "AllergyIntolerance", "Appointment", "AppointmentResponse", "AuditEvent", "Basic", "Binary", "BiologicallyDerivedProduct", "BodyStructure", "Bundle", "CapabilityStatement", "CarePlan", "CareTeam", "CatalogEntry", "ChargeItem", "ChargeItemDefinition", "Claim", "ClaimResponse", "ClinicalImpression", "CodeSystem", "Communication", "CommunicationRequest", "CompartmentDefinition", "Composition", "ConceptMap", "Condition", "Consent", "Contract", "Coverage", "CoverageEligibilityRequest", "CoverageEligibilityResponse", "DetectedIssue", "Device", "DeviceDefinition", "DeviceMetric", "DeviceRequest", "DeviceUseStatement", "DiagnosticReport", "DocumentManifest", "DocumentReference", "DomainResource", "EffectEvidenceSynthesis", "Encounter", "Endpoint", "EnrollmentRequest", "EnrollmentResponse", "EpisodeOfCare", "EventDefinition", "Evidence", "EvidenceVariable", "ExampleScenario", "ExplanationOfBenefit", "FamilyMemberHistory", "Flag", "Goal", "GraphDefinition", "Group", "GuidanceResponse", "HealthcareService", "ImagingStudy", "Immunization", "ImmunizationEvaluation", "ImmunizationRecommendation", "ImplementationGuide", "InsurancePlan", "Invoice", "Library", "Linkage", "List", "Location", "Measure", "MeasureReport", "Media", "Medication", "MedicationAdministration", "MedicationDispense", "MedicationKnowledge", "MedicationRequest", "MedicationStatement", "MedicinalProduct", "MedicinalProductAuthorization", "MedicinalProductContraindication", "MedicinalProductIndication", "MedicinalProductIngredient", "MedicinalProductInteraction", "MedicinalProductManufactured", "MedicinalProductPackaged", "MedicinalProductPharmaceutical", "MedicinalProductUndesirableEffect", "MessageDefinition", "MessageHeader", "MolecularSequence", "NamingSystem", "NutritionOrder", "Observation", "ObservationDefinition", "OperationDefinition", "OperationOutcome", "Organization", "OrganizationAffiliation", "Parameters", "Patient", "PaymentNotice", "PaymentReconciliation", "Person", "PlanDefinition", "Practitioner", "PractitionerRole", "Procedure", "Provenance", "Questionnaire", "QuestionnaireResponse", "RelatedPerson", "RequestGroup", "ResearchDefinition", "ResearchElementDefinition", "ResearchStudy", "ResearchSubject", "Resource", "RiskAssessment", "RiskEvidenceSynthesis", "Schedule", "SearchParameter", "ServiceRequest", "Slot", "Specimen", "SpecimenDefinition", "StructureDefinition", "StructureMap", "Subscription", "Substance", "SubstanceNucleicAcid", "SubstancePolymer", "SubstanceProtein", "SubstanceReferenceInformation", "SubstanceSourceMaterial", "SubstanceSpecification", "SupplyDelivery", "SupplyRequest", "Task", "TerminologyCapabilities", "TestReport", "TestScript", "ValueSet", "VerificationResult", "VisionPrescription"]] = Field(None, alias="resource", serialization_alias="resource")
    response: Optional[Literal["okay", "created", "noContent", "notModified", "bad", "forbidden", "notFound", "methodNotAllowed", "conflict", "gone", "preconditionFailed", "unprocessable"]] = Field(None, alias="response", serialization_alias="response")
    response_code: Optional[str] = Field(None, alias="responseCode", serialization_alias="responseCode")
    source_id: Optional[str] = Field(None, alias="sourceId", serialization_alias="sourceId")
    validate_profile_id: Optional[str] = Field(None, alias="validateProfileId", serialization_alias="validateProfileId")
    value: Optional[str] = Field(None, alias="value", serialization_alias="value")
    warning_only: Optional[bool] = Field(None, alias="warningOnly", serialization_alias="warningOnly")

class TestScriptSetupAction(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    assert_: Optional[TestScriptSetupActionAssert] = Field(None, alias="assert", serialization_alias="assert")
    operation: Optional[TestScriptSetupActionOperation] = Field(None, alias="operation", serialization_alias="operation")

class TestScriptSetup(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    action: Optional[L[TestScriptSetupAction]] = Field(None, alias="action", serialization_alias="action")

class TestScriptOrigin(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    index: Optional[int] = Field(None, alias="index", serialization_alias="index")
    profile: Optional[Coding] = Field(None, alias="profile", serialization_alias="profile")

class TestScriptFixture(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    autocreate: Optional[bool] = Field(None, alias="autocreate", serialization_alias="autocreate")
    autodelete: Optional[bool] = Field(None, alias="autodelete", serialization_alias="autodelete")
    resource: Optional[Reference] = Field(None, alias="resource", serialization_alias="resource")

class TestScriptTeardownAction(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    operation: Optional[TestScriptSetupActionOperation] = Field(None, alias="operation", serialization_alias="operation")

class TestScriptTeardown(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    action: Optional[L[TestScriptTeardownAction]] = Field(None, alias="action", serialization_alias="action")

class TestScriptMetadataLink(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    description: Optional[str] = Field(None, alias="description", serialization_alias="description")
    url: Optional[str] = Field(None, alias="url", serialization_alias="url")

class TestScriptMetadataCapability(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    capabilities: Optional[str] = Field(None, alias="capabilities", serialization_alias="capabilities")
    description: Optional[str] = Field(None, alias="description", serialization_alias="description")
    destination: Optional[int] = Field(None, alias="destination", serialization_alias="destination")
    link: Optional[L[str]] = Field(None, alias="link", serialization_alias="link")
    origin: Optional[L[int]] = Field(None, alias="origin", serialization_alias="origin")
    required: Optional[bool] = Field(None, alias="required", serialization_alias="required")
    validated: Optional[bool] = Field(None, alias="validated", serialization_alias="validated")

class TestScriptMetadata(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    capability: Optional[L[TestScriptMetadataCapability]] = Field(None, alias="capability", serialization_alias="capability")
    link: Optional[L[TestScriptMetadataLink]] = Field(None, alias="link", serialization_alias="link")

class TestScriptDestination(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    index: Optional[int] = Field(None, alias="index", serialization_alias="index")
    profile: Optional[Coding] = Field(None, alias="profile", serialization_alias="profile")

class TestScriptTestAction(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    assert_: Optional[TestScriptSetupActionAssert] = Field(None, alias="assert", serialization_alias="assert")
    operation: Optional[TestScriptSetupActionOperation] = Field(None, alias="operation", serialization_alias="operation")

class TestScriptTest(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    action: Optional[L[TestScriptTestAction]] = Field(None, alias="action", serialization_alias="action")
    description: Optional[str] = Field(None, alias="description", serialization_alias="description")
    name: Optional[str] = Field(None, alias="name", serialization_alias="name")


class TestScript(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='TestScript',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='TestScript'
    )
    
    contact: Optional[L[ContactDetail]] = Field(None, alias="contact", serialization_alias="contact")
    copyright: Optional[str] = Field(None, alias="copyright", serialization_alias="copyright")
    date: Optional[str] = Field(None, alias="date", serialization_alias="date")
    description: Optional[str] = Field(None, alias="description", serialization_alias="description")
    destination: Optional[L[TestScriptDestination]] = Field(None, alias="destination", serialization_alias="destination")
    experimental: Optional[bool] = Field(None, alias="experimental", serialization_alias="experimental")
    fixture: Optional[L[TestScriptFixture]] = Field(None, alias="fixture", serialization_alias="fixture")
    identifier: Optional[Identifier] = Field(None, alias="identifier", serialization_alias="identifier")
    jurisdiction: Optional[L[CodeableConcept]] = Field(None, alias="jurisdiction", serialization_alias="jurisdiction")
    metadata: Optional[TestScriptMetadata] = Field(None, alias="metadata", serialization_alias="metadata")
    name: Optional[str] = Field(None, alias="name", serialization_alias="name")
    origin: Optional[L[TestScriptOrigin]] = Field(None, alias="origin", serialization_alias="origin")
    profile: Optional[L[Reference]] = Field(None, alias="profile", serialization_alias="profile")
    publisher: Optional[str] = Field(None, alias="publisher", serialization_alias="publisher")
    purpose: Optional[str] = Field(None, alias="purpose", serialization_alias="purpose")
    setup: Optional[TestScriptSetup] = Field(None, alias="setup", serialization_alias="setup")
    status: Optional[Literal["draft", "active", "retired", "unknown"]] = Field(None, alias="status", serialization_alias="status")
    teardown: Optional[TestScriptTeardown] = Field(None, alias="teardown", serialization_alias="teardown")
    test: Optional[L[TestScriptTest]] = Field(None, alias="test", serialization_alias="test")
    title: Optional[str] = Field(None, alias="title", serialization_alias="title")
    url: Optional[str] = Field(None, alias="url", serialization_alias="url")
    use_context: Optional[L[UsageContext]] = Field(None, alias="useContext", serialization_alias="useContext")
    variable: Optional[L[TestScriptVariable]] = Field(None, alias="variable", serialization_alias="variable")
    version: Optional[str] = Field(None, alias="version", serialization_alias="version")

