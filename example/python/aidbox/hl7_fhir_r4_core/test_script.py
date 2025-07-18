# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import List as PyList, Literal

from aidbox.hl7_fhir_r4_core.base import \
    BackboneElement, CodeableConcept, Coding, ContactDetail, Identifier, Reference, UsageContext
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class TestScriptDestination(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    index: int = Field(alias="index", serialization_alias="index")
    profile: Coding = Field(alias="profile", serialization_alias="profile")

class TestScriptFixture(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    autocreate: bool = Field(alias="autocreate", serialization_alias="autocreate")
    autodelete: bool = Field(alias="autodelete", serialization_alias="autodelete")
    resource: Reference | None = Field(None, alias="resource", serialization_alias="resource")

class TestScriptMetadata(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    capability: PyList[TestScriptMetadataCapability] = Field(alias="capability", serialization_alias="capability")
    link: PyList[TestScriptMetadataLink] | None = Field(None, alias="link", serialization_alias="link")

class TestScriptMetadataCapability(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    capabilities: str = Field(alias="capabilities", serialization_alias="capabilities")
    description: str | None = Field(None, alias="description", serialization_alias="description")
    destination: int | None = Field(None, alias="destination", serialization_alias="destination")
    link: PyList[str] | None = Field(None, alias="link", serialization_alias="link")
    origin: PyList[int] | None = Field(None, alias="origin", serialization_alias="origin")
    required: bool = Field(alias="required", serialization_alias="required")
    validated: bool = Field(alias="validated", serialization_alias="validated")

class TestScriptMetadataLink(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    description: str | None = Field(None, alias="description", serialization_alias="description")
    url: str = Field(alias="url", serialization_alias="url")

class TestScriptOrigin(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    index: int = Field(alias="index", serialization_alias="index")
    profile: Coding = Field(alias="profile", serialization_alias="profile")

class TestScriptSetup(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    action: PyList[TestScriptSetupAction] = Field(alias="action", serialization_alias="action")

class TestScriptSetupAction(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    assert_: TestScriptSetupActionAssert | None = Field(None, alias="assert", serialization_alias="assert")
    operation: TestScriptSetupActionOperation | None = Field(None, alias="operation", serialization_alias="operation")

class TestScriptSetupActionAssert(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    compare_to_source_expression: str | None = Field(None, alias="compareToSourceExpression", serialization_alias="compareToSourceExpression")
    compare_to_source_id: str | None = Field(None, alias="compareToSourceId", serialization_alias="compareToSourceId")
    compare_to_source_path: str | None = Field(None, alias="compareToSourcePath", serialization_alias="compareToSourcePath")
    content_type: str | None = Field(None, alias="contentType", serialization_alias="contentType")
    description: str | None = Field(None, alias="description", serialization_alias="description")
    direction: Literal["response", "request"] | None = Field(None, alias="direction", serialization_alias="direction")
    expression: str | None = Field(None, alias="expression", serialization_alias="expression")
    header_field: str | None = Field(None, alias="headerField", serialization_alias="headerField")
    label: str | None = Field(None, alias="label", serialization_alias="label")
    minimum_id: str | None = Field(None, alias="minimumId", serialization_alias="minimumId")
    navigation_links: bool | None = Field(None, alias="navigationLinks", serialization_alias="navigationLinks")
    operator: Literal["equals", "notEquals", "in", "notIn", "greaterThan", "lessThan", "empty", "notEmpty", "contains", "notContains", "eval"] | None = Field(None, alias="operator", serialization_alias="operator")
    path: str | None = Field(None, alias="path", serialization_alias="path")
    request_method: Literal["delete", "get", "options", "patch", "post", "put", "head"] | None = Field(None, alias="requestMethod", serialization_alias="requestMethod")
    request_url: str | None = Field(None, alias="requestURL", serialization_alias="requestURL")
    resource: Literal["Address", "Age", "Annotation", "Attachment", "BackboneElement", "CodeableConcept", "Coding", "ContactDetail", "ContactPoint", "Contributor", "Count", "DataRequirement", "Distance", "Dosage", "Duration", "Element", "ElementDefinition", "Expression", "Extension", "HumanName", "Identifier", "MarketingStatus", "Meta", "Money", "MoneyQuantity", "Narrative", "ParameterDefinition", "Period", "Population", "ProdCharacteristic", "ProductShelfLife", "Quantity", "Range", "Ratio", "Reference", "RelatedArtifact", "SampledData", "Signature", "SimpleQuantity", "SubstanceAmount", "Timing", "TriggerDefinition", "UsageContext", "base64Binary", "boolean", "canonical", "code", "date", "dateTime", "decimal", "id", "instant", "integer", "markdown", "oid", "positiveInt", "string", "time", "unsignedInt", "uri", "url", "uuid", "xhtml", "Account", "ActivityDefinition", "AdverseEvent", "AllergyIntolerance", "Appointment", "AppointmentResponse", "AuditEvent", "Basic", "Binary", "BiologicallyDerivedProduct", "BodyStructure", "Bundle", "CapabilityStatement", "CarePlan", "CareTeam", "CatalogEntry", "ChargeItem", "ChargeItemDefinition", "Claim", "ClaimResponse", "ClinicalImpression", "CodeSystem", "Communication", "CommunicationRequest", "CompartmentDefinition", "Composition", "ConceptMap", "Condition", "Consent", "Contract", "Coverage", "CoverageEligibilityRequest", "CoverageEligibilityResponse", "DetectedIssue", "Device", "DeviceDefinition", "DeviceMetric", "DeviceRequest", "DeviceUseStatement", "DiagnosticReport", "DocumentManifest", "DocumentReference", "DomainResource", "EffectEvidenceSynthesis", "Encounter", "Endpoint", "EnrollmentRequest", "EnrollmentResponse", "EpisodeOfCare", "EventDefinition", "Evidence", "EvidenceVariable", "ExampleScenario", "ExplanationOfBenefit", "FamilyMemberHistory", "Flag", "Goal", "GraphDefinition", "Group", "GuidanceResponse", "HealthcareService", "ImagingStudy", "Immunization", "ImmunizationEvaluation", "ImmunizationRecommendation", "ImplementationGuide", "InsurancePlan", "Invoice", "Library", "Linkage", "List", "Location", "Measure", "MeasureReport", "Media", "Medication", "MedicationAdministration", "MedicationDispense", "MedicationKnowledge", "MedicationRequest", "MedicationStatement", "MedicinalProduct", "MedicinalProductAuthorization", "MedicinalProductContraindication", "MedicinalProductIndication", "MedicinalProductIngredient", "MedicinalProductInteraction", "MedicinalProductManufactured", "MedicinalProductPackaged", "MedicinalProductPharmaceutical", "MedicinalProductUndesirableEffect", "MessageDefinition", "MessageHeader", "MolecularSequence", "NamingSystem", "NutritionOrder", "Observation", "ObservationDefinition", "OperationDefinition", "OperationOutcome", "Organization", "OrganizationAffiliation", "Parameters", "Patient", "PaymentNotice", "PaymentReconciliation", "Person", "PlanDefinition", "Practitioner", "PractitionerRole", "Procedure", "Provenance", "Questionnaire", "QuestionnaireResponse", "RelatedPerson", "RequestGroup", "ResearchDefinition", "ResearchElementDefinition", "ResearchStudy", "ResearchSubject", "Resource", "RiskAssessment", "RiskEvidenceSynthesis", "Schedule", "SearchParameter", "ServiceRequest", "Slot", "Specimen", "SpecimenDefinition", "StructureDefinition", "StructureMap", "Subscription", "Substance", "SubstanceNucleicAcid", "SubstancePolymer", "SubstanceProtein", "SubstanceReferenceInformation", "SubstanceSourceMaterial", "SubstanceSpecification", "SupplyDelivery", "SupplyRequest", "Task", "TerminologyCapabilities", "TestReport", "TestScript", "ValueSet", "VerificationResult", "VisionPrescription"] | None = Field(None, alias="resource", serialization_alias="resource")
    response: Literal["okay", "created", "noContent", "notModified", "bad", "forbidden", "notFound", "methodNotAllowed", "conflict", "gone", "preconditionFailed", "unprocessable"] | None = Field(None, alias="response", serialization_alias="response")
    response_code: str | None = Field(None, alias="responseCode", serialization_alias="responseCode")
    source_id: str | None = Field(None, alias="sourceId", serialization_alias="sourceId")
    validate_profile_id: str | None = Field(None, alias="validateProfileId", serialization_alias="validateProfileId")
    value: str | None = Field(None, alias="value", serialization_alias="value")
    warning_only: bool = Field(alias="warningOnly", serialization_alias="warningOnly")

class TestScriptSetupActionOperation(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    accept: str | None = Field(None, alias="accept", serialization_alias="accept")
    content_type: str | None = Field(None, alias="contentType", serialization_alias="contentType")
    description: str | None = Field(None, alias="description", serialization_alias="description")
    destination: int | None = Field(None, alias="destination", serialization_alias="destination")
    encode_request_url: bool = Field(alias="encodeRequestUrl", serialization_alias="encodeRequestUrl")
    label: str | None = Field(None, alias="label", serialization_alias="label")
    method: Literal["delete", "get", "options", "patch", "post", "put", "head"] | None = Field(None, alias="method", serialization_alias="method")
    origin: int | None = Field(None, alias="origin", serialization_alias="origin")
    params: str | None = Field(None, alias="params", serialization_alias="params")
    request_header: PyList[TestScriptSetupActionOperationRequestHeader] | None = Field(None, alias="requestHeader", serialization_alias="requestHeader")
    request_id: str | None = Field(None, alias="requestId", serialization_alias="requestId")
    resource: Literal["Address", "Age", "Annotation", "Attachment", "BackboneElement", "CodeableConcept", "Coding", "ContactDetail", "ContactPoint", "Contributor", "Count", "DataRequirement", "Distance", "Dosage", "Duration", "Element", "ElementDefinition", "Expression", "Extension", "HumanName", "Identifier", "MarketingStatus", "Meta", "Money", "MoneyQuantity", "Narrative", "ParameterDefinition", "Period", "Population", "ProdCharacteristic", "ProductShelfLife", "Quantity", "Range", "Ratio", "Reference", "RelatedArtifact", "SampledData", "Signature", "SimpleQuantity", "SubstanceAmount", "Timing", "TriggerDefinition", "UsageContext", "base64Binary", "boolean", "canonical", "code", "date", "dateTime", "decimal", "id", "instant", "integer", "markdown", "oid", "positiveInt", "string", "time", "unsignedInt", "uri", "url", "uuid", "xhtml", "Account", "ActivityDefinition", "AdverseEvent", "AllergyIntolerance", "Appointment", "AppointmentResponse", "AuditEvent", "Basic", "Binary", "BiologicallyDerivedProduct", "BodyStructure", "Bundle", "CapabilityStatement", "CarePlan", "CareTeam", "CatalogEntry", "ChargeItem", "ChargeItemDefinition", "Claim", "ClaimResponse", "ClinicalImpression", "CodeSystem", "Communication", "CommunicationRequest", "CompartmentDefinition", "Composition", "ConceptMap", "Condition", "Consent", "Contract", "Coverage", "CoverageEligibilityRequest", "CoverageEligibilityResponse", "DetectedIssue", "Device", "DeviceDefinition", "DeviceMetric", "DeviceRequest", "DeviceUseStatement", "DiagnosticReport", "DocumentManifest", "DocumentReference", "DomainResource", "EffectEvidenceSynthesis", "Encounter", "Endpoint", "EnrollmentRequest", "EnrollmentResponse", "EpisodeOfCare", "EventDefinition", "Evidence", "EvidenceVariable", "ExampleScenario", "ExplanationOfBenefit", "FamilyMemberHistory", "Flag", "Goal", "GraphDefinition", "Group", "GuidanceResponse", "HealthcareService", "ImagingStudy", "Immunization", "ImmunizationEvaluation", "ImmunizationRecommendation", "ImplementationGuide", "InsurancePlan", "Invoice", "Library", "Linkage", "List", "Location", "Measure", "MeasureReport", "Media", "Medication", "MedicationAdministration", "MedicationDispense", "MedicationKnowledge", "MedicationRequest", "MedicationStatement", "MedicinalProduct", "MedicinalProductAuthorization", "MedicinalProductContraindication", "MedicinalProductIndication", "MedicinalProductIngredient", "MedicinalProductInteraction", "MedicinalProductManufactured", "MedicinalProductPackaged", "MedicinalProductPharmaceutical", "MedicinalProductUndesirableEffect", "MessageDefinition", "MessageHeader", "MolecularSequence", "NamingSystem", "NutritionOrder", "Observation", "ObservationDefinition", "OperationDefinition", "OperationOutcome", "Organization", "OrganizationAffiliation", "Parameters", "Patient", "PaymentNotice", "PaymentReconciliation", "Person", "PlanDefinition", "Practitioner", "PractitionerRole", "Procedure", "Provenance", "Questionnaire", "QuestionnaireResponse", "RelatedPerson", "RequestGroup", "ResearchDefinition", "ResearchElementDefinition", "ResearchStudy", "ResearchSubject", "Resource", "RiskAssessment", "RiskEvidenceSynthesis", "Schedule", "SearchParameter", "ServiceRequest", "Slot", "Specimen", "SpecimenDefinition", "StructureDefinition", "StructureMap", "Subscription", "Substance", "SubstanceNucleicAcid", "SubstancePolymer", "SubstanceProtein", "SubstanceReferenceInformation", "SubstanceSourceMaterial", "SubstanceSpecification", "SupplyDelivery", "SupplyRequest", "Task", "TerminologyCapabilities", "TestReport", "TestScript", "ValueSet", "VerificationResult", "VisionPrescription"] | None = Field(None, alias="resource", serialization_alias="resource")
    response_id: str | None = Field(None, alias="responseId", serialization_alias="responseId")
    source_id: str | None = Field(None, alias="sourceId", serialization_alias="sourceId")
    target_id: str | None = Field(None, alias="targetId", serialization_alias="targetId")
    type: Coding | None = Field(None, alias="type", serialization_alias="type")
    url: str | None = Field(None, alias="url", serialization_alias="url")

class TestScriptSetupActionOperationRequestHeader(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    field: str = Field(alias="field", serialization_alias="field")
    value: str = Field(alias="value", serialization_alias="value")

class TestScriptTeardown(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    action: PyList[TestScriptTeardownAction] = Field(alias="action", serialization_alias="action")

class TestScriptTeardownAction(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    operation: TestScriptSetupActionOperation = Field(alias="operation", serialization_alias="operation")

class TestScriptTest(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    action: PyList[TestScriptTestAction] = Field(alias="action", serialization_alias="action")
    description: str | None = Field(None, alias="description", serialization_alias="description")
    name: str | None = Field(None, alias="name", serialization_alias="name")

class TestScriptTestAction(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    assert_: TestScriptSetupActionAssert | None = Field(None, alias="assert", serialization_alias="assert")
    operation: TestScriptSetupActionOperation | None = Field(None, alias="operation", serialization_alias="operation")

class TestScriptVariable(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    default_value: str | None = Field(None, alias="defaultValue", serialization_alias="defaultValue")
    description: str | None = Field(None, alias="description", serialization_alias="description")
    expression: str | None = Field(None, alias="expression", serialization_alias="expression")
    header_field: str | None = Field(None, alias="headerField", serialization_alias="headerField")
    hint: str | None = Field(None, alias="hint", serialization_alias="hint")
    name: str = Field(alias="name", serialization_alias="name")
    path: str | None = Field(None, alias="path", serialization_alias="path")
    source_id: str | None = Field(None, alias="sourceId", serialization_alias="sourceId")


class TestScript(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='TestScript',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='TestScript'
    )
    
    contact: PyList[ContactDetail] | None = Field(None, alias="contact", serialization_alias="contact")
    copyright: str | None = Field(None, alias="copyright", serialization_alias="copyright")
    date: str | None = Field(None, alias="date", serialization_alias="date")
    description: str | None = Field(None, alias="description", serialization_alias="description")
    destination: PyList[TestScriptDestination] | None = Field(None, alias="destination", serialization_alias="destination")
    experimental: bool | None = Field(None, alias="experimental", serialization_alias="experimental")
    fixture: PyList[TestScriptFixture] | None = Field(None, alias="fixture", serialization_alias="fixture")
    identifier: Identifier | None = Field(None, alias="identifier", serialization_alias="identifier")
    jurisdiction: PyList[CodeableConcept] | None = Field(None, alias="jurisdiction", serialization_alias="jurisdiction")
    metadata: TestScriptMetadata | None = Field(None, alias="metadata", serialization_alias="metadata")
    name: str = Field(alias="name", serialization_alias="name")
    origin: PyList[TestScriptOrigin] | None = Field(None, alias="origin", serialization_alias="origin")
    profile: PyList[Reference] | None = Field(None, alias="profile", serialization_alias="profile")
    publisher: str | None = Field(None, alias="publisher", serialization_alias="publisher")
    purpose: str | None = Field(None, alias="purpose", serialization_alias="purpose")
    setup: TestScriptSetup | None = Field(None, alias="setup", serialization_alias="setup")
    status: Literal["draft", "active", "retired", "unknown"] = Field(alias="status", serialization_alias="status")
    teardown: TestScriptTeardown | None = Field(None, alias="teardown", serialization_alias="teardown")
    test: PyList[TestScriptTest] | None = Field(None, alias="test", serialization_alias="test")
    title: str | None = Field(None, alias="title", serialization_alias="title")
    url: str = Field(alias="url", serialization_alias="url")
    use_context: PyList[UsageContext] | None = Field(None, alias="useContext", serialization_alias="useContext")
    variable: PyList[TestScriptVariable] | None = Field(None, alias="variable", serialization_alias="variable")
    version: str | None = Field(None, alias="version", serialization_alias="version")
    
    def to_json(self, indent: int | None = None) -> str:
        return self.model_dump_json(exclude_unset=True, exclude_none=True, indent=indent)
    
    @classmethod
    def from_json(cls, json: str) -> TestScript:
        return cls.model_validate_json(json)

