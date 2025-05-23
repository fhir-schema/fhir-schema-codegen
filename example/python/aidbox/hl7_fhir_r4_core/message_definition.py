# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field, PositiveInt
from typing import Optional, List as L, Literal, ForwardRef

from aidbox.hl7_fhir_r4_core.base import BackboneElement, CodeableConcept, Coding, ContactDetail, Identifier, UsageContext
from aidbox.hl7_fhir_r4_core.domain_resource import DomainResource
from aidbox.hl7_fhir_r4_core.resource_families import DomainResourceFamily


class MessageDefinitionAllowedResponse(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    message: Optional[str] = Field(None, alias="message", serialization_alias="message")
    situation: Optional[str] = Field(None, alias="situation", serialization_alias="situation")

class MessageDefinitionFocus(BackboneElement):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    code: Optional[Literal["Account", "ActivityDefinition", "AdverseEvent", "AllergyIntolerance", "Appointment", "AppointmentResponse", "AuditEvent", "Basic", "Binary", "BiologicallyDerivedProduct", "BodyStructure", "Bundle", "CapabilityStatement", "CarePlan", "CareTeam", "CatalogEntry", "ChargeItem", "ChargeItemDefinition", "Claim", "ClaimResponse", "ClinicalImpression", "CodeSystem", "Communication", "CommunicationRequest", "CompartmentDefinition", "Composition", "ConceptMap", "Condition", "Consent", "Contract", "Coverage", "CoverageEligibilityRequest", "CoverageEligibilityResponse", "DetectedIssue", "Device", "DeviceDefinition", "DeviceMetric", "DeviceRequest", "DeviceUseStatement", "DiagnosticReport", "DocumentManifest", "DocumentReference", "DomainResource", "EffectEvidenceSynthesis", "Encounter", "Endpoint", "EnrollmentRequest", "EnrollmentResponse", "EpisodeOfCare", "EventDefinition", "Evidence", "EvidenceVariable", "ExampleScenario", "ExplanationOfBenefit", "FamilyMemberHistory", "Flag", "Goal", "GraphDefinition", "Group", "GuidanceResponse", "HealthcareService", "ImagingStudy", "Immunization", "ImmunizationEvaluation", "ImmunizationRecommendation", "ImplementationGuide", "InsurancePlan", "Invoice", "Library", "Linkage", "List", "Location", "Measure", "MeasureReport", "Media", "Medication", "MedicationAdministration", "MedicationDispense", "MedicationKnowledge", "MedicationRequest", "MedicationStatement", "MedicinalProduct", "MedicinalProductAuthorization", "MedicinalProductContraindication", "MedicinalProductIndication", "MedicinalProductIngredient", "MedicinalProductInteraction", "MedicinalProductManufactured", "MedicinalProductPackaged", "MedicinalProductPharmaceutical", "MedicinalProductUndesirableEffect", "MessageDefinition", "MessageHeader", "MolecularSequence", "NamingSystem", "NutritionOrder", "Observation", "ObservationDefinition", "OperationDefinition", "OperationOutcome", "Organization", "OrganizationAffiliation", "Parameters", "Patient", "PaymentNotice", "PaymentReconciliation", "Person", "PlanDefinition", "Practitioner", "PractitionerRole", "Procedure", "Provenance", "Questionnaire", "QuestionnaireResponse", "RelatedPerson", "RequestGroup", "ResearchDefinition", "ResearchElementDefinition", "ResearchStudy", "ResearchSubject", "Resource", "RiskAssessment", "RiskEvidenceSynthesis", "Schedule", "SearchParameter", "ServiceRequest", "Slot", "Specimen", "SpecimenDefinition", "StructureDefinition", "StructureMap", "Subscription", "Substance", "SubstanceNucleicAcid", "SubstancePolymer", "SubstanceProtein", "SubstanceReferenceInformation", "SubstanceSourceMaterial", "SubstanceSpecification", "SupplyDelivery", "SupplyRequest", "Task", "TerminologyCapabilities", "TestReport", "TestScript", "ValueSet", "VerificationResult", "VisionPrescription"]] = Field(None, alias="code", serialization_alias="code")
    max: Optional[str] = Field(None, alias="max", serialization_alias="max")
    min: Optional[int] = Field(None, alias="min", serialization_alias="min")
    profile: Optional[str] = Field(None, alias="profile", serialization_alias="profile")


class MessageDefinition(DomainResource):
    model_config = ConfigDict(validate_by_name=True, serialize_by_alias=True, extra="forbid")
    
    resource_type: str = Field(
        default='MessageDefinition',
        alias='resourceType',
        serialization_alias='resourceType',
        frozen=True,
        pattern='MessageDefinition'
    )
    
    allowed_response: Optional[L[MessageDefinitionAllowedResponse]] = Field(None, alias="allowedResponse", serialization_alias="allowedResponse")
    base: Optional[str] = Field(None, alias="base", serialization_alias="base")
    category: Optional[Literal["consequence", "currency", "notification"]] = Field(None, alias="category", serialization_alias="category")
    contact: Optional[L[ContactDetail]] = Field(None, alias="contact", serialization_alias="contact")
    copyright: Optional[str] = Field(None, alias="copyright", serialization_alias="copyright")
    date: Optional[str] = Field(None, alias="date", serialization_alias="date")
    description: Optional[str] = Field(None, alias="description", serialization_alias="description")
    event_coding: Optional[Coding] = Field(None, alias="eventCoding", serialization_alias="eventCoding")
    event_uri: Optional[str] = Field(None, alias="eventUri", serialization_alias="eventUri")
    experimental: Optional[bool] = Field(None, alias="experimental", serialization_alias="experimental")
    focus: Optional[L[MessageDefinitionFocus]] = Field(None, alias="focus", serialization_alias="focus")
    graph: Optional[L[str]] = Field(None, alias="graph", serialization_alias="graph")
    identifier: Optional[L[Identifier]] = Field(None, alias="identifier", serialization_alias="identifier")
    jurisdiction: Optional[L[CodeableConcept]] = Field(None, alias="jurisdiction", serialization_alias="jurisdiction")
    name: Optional[str] = Field(None, alias="name", serialization_alias="name")
    parent: Optional[L[str]] = Field(None, alias="parent", serialization_alias="parent")
    publisher: Optional[str] = Field(None, alias="publisher", serialization_alias="publisher")
    purpose: Optional[str] = Field(None, alias="purpose", serialization_alias="purpose")
    replaces: Optional[L[str]] = Field(None, alias="replaces", serialization_alias="replaces")
    response_required: Optional[Literal["always", "on-error", "never", "on-success"]] = Field(None, alias="responseRequired", serialization_alias="responseRequired")
    status: Optional[Literal["draft", "active", "retired", "unknown"]] = Field(None, alias="status", serialization_alias="status")
    title: Optional[str] = Field(None, alias="title", serialization_alias="title")
    url: Optional[str] = Field(None, alias="url", serialization_alias="url")
    use_context: Optional[L[UsageContext]] = Field(None, alias="useContext", serialization_alias="useContext")
    version: Optional[str] = Field(None, alias="version", serialization_alias="version")

