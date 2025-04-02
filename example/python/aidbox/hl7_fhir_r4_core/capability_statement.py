# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .domain_resource import DomainResource


class CapabilityStatementDocument(BackboneElement):
    documentation: Optional[str] = None
    mode: Optional[Literal["producer", "consumer"]] = None
    profile: Optional[str] = None

class CapabilityStatementMessagingEndpoint(BackboneElement):
    address: Optional[str] = None
    protocol: Optional[Coding] = None

class CapabilityStatementMessagingSupportedMessage(BackboneElement):
    definition: Optional[str] = None
    mode: Optional[Literal["sender", "receiver"]] = None

class CapabilityStatementMessaging(BackboneElement):
    documentation: Optional[str] = None
    endpoint: Optional[L[CapabilityStatementMessagingEndpoint]] = None
    reliable_cache: Optional[int] = None
    supported_message: Optional[L[CapabilityStatementMessagingSupportedMessage]] = None

class CapabilityStatementSoftware(BackboneElement):
    name: Optional[str] = None
    release_date: Optional[str] = None
    version: Optional[str] = None

class CapabilityStatementImplementation(BackboneElement):
    custodian: Optional[Reference] = None
    description: Optional[str] = None
    url: Optional[str] = None

class CapabilityStatementRestSecurity(BackboneElement):
    cors: Optional[bool] = None
    description: Optional[str] = None
    service: Optional[L[CodeableConcept]] = None

class CapabilityStatementRestResourceSearchParam(BackboneElement):
    definition: Optional[str] = None
    documentation: Optional[str] = None
    name: Optional[str] = None
    type: Optional[Literal["number", "date", "string", "token", "reference", "composite", "quantity", "uri", "special"]] = None

class CapabilityStatementRestResourceOperation(BackboneElement):
    definition: Optional[str] = None
    documentation: Optional[str] = None
    name: Optional[str] = None

class CapabilityStatementRestResourceInteraction(BackboneElement):
    code: Optional[Literal["read", "vread", "update", "patch", "delete", "history-instance", "history-type", "create", "search-type", "read", "vread", "update", "patch", "delete", "history", "create", "search", "capabilities", "transaction", "batch", "operation"]] = None
    documentation: Optional[str] = None

class CapabilityStatementRestResource(BackboneElement):
    conditional_create: Optional[bool] = None
    conditional_delete: Optional[Literal["not-supported", "single", "multiple"]] = None
    conditional_read: Optional[Literal["not-supported", "modified-since", "not-match", "full-support"]] = None
    conditional_update: Optional[bool] = None
    documentation: Optional[str] = None
    interaction: Optional[L[CapabilityStatementRestResourceInteraction]] = None
    operation: Optional[L[CapabilityStatementRestResourceOperation]] = None
    profile: Optional[str] = None
    read_history: Optional[bool] = None
    reference_policy: Optional[L[Literal["literal", "logical", "resolves", "enforced", "local"]]] = None
    search_include: Optional[L[str]] = None
    search_param: Optional[L[CapabilityStatementRestResourceSearchParam]] = None
    search_rev_include: Optional[L[str]] = None
    supported_profile: Optional[L[str]] = None
    type: Optional[Literal["Account", "ActivityDefinition", "AdverseEvent", "AllergyIntolerance", "Appointment", "AppointmentResponse", "AuditEvent", "Basic", "Binary", "BiologicallyDerivedProduct", "BodyStructure", "Bundle", "CapabilityStatement", "CarePlan", "CareTeam", "CatalogEntry", "ChargeItem", "ChargeItemDefinition", "Claim", "ClaimResponse", "ClinicalImpression", "CodeSystem", "Communication", "CommunicationRequest", "CompartmentDefinition", "Composition", "ConceptMap", "Condition", "Consent", "Contract", "Coverage", "CoverageEligibilityRequest", "CoverageEligibilityResponse", "DetectedIssue", "Device", "DeviceDefinition", "DeviceMetric", "DeviceRequest", "DeviceUseStatement", "DiagnosticReport", "DocumentManifest", "DocumentReference", "DomainResource", "EffectEvidenceSynthesis", "Encounter", "Endpoint", "EnrollmentRequest", "EnrollmentResponse", "EpisodeOfCare", "EventDefinition", "Evidence", "EvidenceVariable", "ExampleScenario", "ExplanationOfBenefit", "FamilyMemberHistory", "Flag", "Goal", "GraphDefinition", "Group", "GuidanceResponse", "HealthcareService", "ImagingStudy", "Immunization", "ImmunizationEvaluation", "ImmunizationRecommendation", "ImplementationGuide", "InsurancePlan", "Invoice", "Library", "Linkage", "List", "Location", "Measure", "MeasureReport", "Media", "Medication", "MedicationAdministration", "MedicationDispense", "MedicationKnowledge", "MedicationRequest", "MedicationStatement", "MedicinalProduct", "MedicinalProductAuthorization", "MedicinalProductContraindication", "MedicinalProductIndication", "MedicinalProductIngredient", "MedicinalProductInteraction", "MedicinalProductManufactured", "MedicinalProductPackaged", "MedicinalProductPharmaceutical", "MedicinalProductUndesirableEffect", "MessageDefinition", "MessageHeader", "MolecularSequence", "NamingSystem", "NutritionOrder", "Observation", "ObservationDefinition", "OperationDefinition", "OperationOutcome", "Organization", "OrganizationAffiliation", "Parameters", "Patient", "PaymentNotice", "PaymentReconciliation", "Person", "PlanDefinition", "Practitioner", "PractitionerRole", "Procedure", "Provenance", "Questionnaire", "QuestionnaireResponse", "RelatedPerson", "RequestGroup", "ResearchDefinition", "ResearchElementDefinition", "ResearchStudy", "ResearchSubject", "Resource", "RiskAssessment", "RiskEvidenceSynthesis", "Schedule", "SearchParameter", "ServiceRequest", "Slot", "Specimen", "SpecimenDefinition", "StructureDefinition", "StructureMap", "Subscription", "Substance", "SubstanceNucleicAcid", "SubstancePolymer", "SubstanceProtein", "SubstanceReferenceInformation", "SubstanceSourceMaterial", "SubstanceSpecification", "SupplyDelivery", "SupplyRequest", "Task", "TerminologyCapabilities", "TestReport", "TestScript", "ValueSet", "VerificationResult", "VisionPrescription"]] = None
    update_create: Optional[bool] = None
    versioning: Optional[Literal["no-version", "versioned", "versioned-update"]] = None

class CapabilityStatementRestInteraction(BackboneElement):
    code: Optional[Literal["transaction", "batch", "search-system", "history-system", "read", "vread", "update", "patch", "delete", "history", "create", "search", "capabilities", "transaction", "batch", "operation"]] = None
    documentation: Optional[str] = None

class CapabilityStatementRest(BackboneElement):
    compartment: Optional[L[str]] = None
    documentation: Optional[str] = None
    interaction: Optional[L[CapabilityStatementRestInteraction]] = None
    mode: Optional[Literal["client", "server"]] = None
    operation: Optional[L[CapabilityStatementRestResourceOperation]] = None
    resource: Optional[L[CapabilityStatementRestResource]] = None
    search_param: Optional[L[CapabilityStatementRestResourceSearchParam]] = None
    security: Optional[CapabilityStatementRestSecurity] = None


class CapabilityStatement(DomainResource):
    contact: Optional[L[ContactDetail]] = None
    copyright: Optional[str] = None
    date: Optional[str] = None
    description: Optional[str] = None
    document: Optional[L[CapabilityStatementDocument]] = None
    experimental: Optional[bool] = None
    fhir_version: Optional[Literal["0.01", "0.05", "0.06", "0.11", "0.0.80", "0.0.81", "0.0.82", "0.4.0", "0.5.0", "1.0.0", "1.0.1", "1.0.2", "1.1.0", "1.4.0", "1.6.0", "1.8.0", "3.0.0", "3.0.1", "3.3.0", "3.5.0", "4.0.0", "4.0.1"]] = None
    format: Optional[L[str]] = None
    implementation: Optional[CapabilityStatementImplementation] = None
    implementation_guide: Optional[L[str]] = None
    imports: Optional[L[str]] = None
    instantiates: Optional[L[str]] = None
    jurisdiction: Optional[L[CodeableConcept]] = None
    kind: Optional[Literal["instance", "capability", "requirements"]] = None
    messaging: Optional[L[CapabilityStatementMessaging]] = None
    name: Optional[str] = None
    patch_format: Optional[L[str]] = None
    publisher: Optional[str] = None
    purpose: Optional[str] = None
    rest: Optional[L[CapabilityStatementRest]] = None
    software: Optional[CapabilityStatementSoftware] = None
    status: Optional[Literal["draft", "active", "retired", "unknown"]] = None
    title: Optional[str] = None
    url: Optional[str] = None
    use_context: Optional[L[UsageContext]] = None
    version: Optional[str] = None

