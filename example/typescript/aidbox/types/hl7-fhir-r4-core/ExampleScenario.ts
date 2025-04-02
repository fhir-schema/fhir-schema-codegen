// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { ContactDetail } from './ContactDetail';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { UsageContext } from './UsageContext';


export interface ExampleScenarioInstanceVersion extends BackboneElement {
    description?: string;
    versionId?: string;
}

export interface ExampleScenarioInstanceContainedInstance extends BackboneElement {
    resourceId?: string;
    versionId?: string;
}

export interface ExampleScenarioInstance extends BackboneElement {
    containedInstance?: ExampleScenarioInstanceContainedInstance[];
    description?: string;
    name?: string;
    resourceId?: string;
    resourceType?: 'Account' | 'ActivityDefinition' | 'AdverseEvent' | 'AllergyIntolerance' | 'Appointment' | 'AppointmentResponse' | 'AuditEvent' | 'Basic' | 'Binary' | 'BiologicallyDerivedProduct' | 'BodyStructure' | 'Bundle' | 'CapabilityStatement' | 'CarePlan' | 'CareTeam' | 'CatalogEntry' | 'ChargeItem' | 'ChargeItemDefinition' | 'Claim' | 'ClaimResponse' | 'ClinicalImpression' | 'CodeSystem' | 'Communication' | 'CommunicationRequest' | 'CompartmentDefinition' | 'Composition' | 'ConceptMap' | 'Condition' | 'Consent' | 'Contract' | 'Coverage' | 'CoverageEligibilityRequest' | 'CoverageEligibilityResponse' | 'DetectedIssue' | 'Device' | 'DeviceDefinition' | 'DeviceMetric' | 'DeviceRequest' | 'DeviceUseStatement' | 'DiagnosticReport' | 'DocumentManifest' | 'DocumentReference' | 'DomainResource' | 'EffectEvidenceSynthesis' | 'Encounter' | 'Endpoint' | 'EnrollmentRequest' | 'EnrollmentResponse' | 'EpisodeOfCare' | 'EventDefinition' | 'Evidence' | 'EvidenceVariable' | 'ExampleScenario' | 'ExplanationOfBenefit' | 'FamilyMemberHistory' | 'Flag' | 'Goal' | 'GraphDefinition' | 'Group' | 'GuidanceResponse' | 'HealthcareService' | 'ImagingStudy' | 'Immunization' | 'ImmunizationEvaluation' | 'ImmunizationRecommendation' | 'ImplementationGuide' | 'InsurancePlan' | 'Invoice' | 'Library' | 'Linkage' | 'List' | 'Location' | 'Measure' | 'MeasureReport' | 'Media' | 'Medication' | 'MedicationAdministration' | 'MedicationDispense' | 'MedicationKnowledge' | 'MedicationRequest' | 'MedicationStatement' | 'MedicinalProduct' | 'MedicinalProductAuthorization' | 'MedicinalProductContraindication' | 'MedicinalProductIndication' | 'MedicinalProductIngredient' | 'MedicinalProductInteraction' | 'MedicinalProductManufactured' | 'MedicinalProductPackaged' | 'MedicinalProductPharmaceutical' | 'MedicinalProductUndesirableEffect' | 'MessageDefinition' | 'MessageHeader' | 'MolecularSequence' | 'NamingSystem' | 'NutritionOrder' | 'Observation' | 'ObservationDefinition' | 'OperationDefinition' | 'OperationOutcome' | 'Organization' | 'OrganizationAffiliation' | 'Parameters' | 'Patient' | 'PaymentNotice' | 'PaymentReconciliation' | 'Person' | 'PlanDefinition' | 'Practitioner' | 'PractitionerRole' | 'Procedure' | 'Provenance' | 'Questionnaire' | 'QuestionnaireResponse' | 'RelatedPerson' | 'RequestGroup' | 'ResearchDefinition' | 'ResearchElementDefinition' | 'ResearchStudy' | 'ResearchSubject' | 'Resource' | 'RiskAssessment' | 'RiskEvidenceSynthesis' | 'Schedule' | 'SearchParameter' | 'ServiceRequest' | 'Slot' | 'Specimen' | 'SpecimenDefinition' | 'StructureDefinition' | 'StructureMap' | 'Subscription' | 'Substance' | 'SubstanceNucleicAcid' | 'SubstancePolymer' | 'SubstanceProtein' | 'SubstanceReferenceInformation' | 'SubstanceSourceMaterial' | 'SubstanceSpecification' | 'SupplyDelivery' | 'SupplyRequest' | 'Task' | 'TerminologyCapabilities' | 'TestReport' | 'TestScript' | 'ValueSet' | 'VerificationResult' | 'VisionPrescription';
    version?: ExampleScenarioInstanceVersion[];
}

export interface ExampleScenarioProcessStepOperation extends BackboneElement {
    description?: string;
    initiator?: string;
    initiatorActive?: boolean;
    name?: string;
    number?: string;
    receiver?: string;
    receiverActive?: boolean;
    request?: ExampleScenarioInstanceContainedInstance;
    response?: ExampleScenarioInstanceContainedInstance;
    type?: string;
}

export interface ExampleScenarioProcessStepAlternative extends BackboneElement {
    description?: string;
    step?: ExampleScenarioProcessStep[];
    title?: string;
}

export interface ExampleScenarioProcessStep extends BackboneElement {
    alternative?: ExampleScenarioProcessStepAlternative[];
    operation?: ExampleScenarioProcessStepOperation;
    pause?: boolean;
    process?: ExampleScenarioProcess[];
}

export interface ExampleScenarioProcess extends BackboneElement {
    description?: string;
    postConditions?: string;
    preConditions?: string;
    step?: ExampleScenarioProcessStep[];
    title?: string;
}

export interface ExampleScenarioActor extends BackboneElement {
    actorId?: string;
    description?: string;
    name?: string;
    type?: 'person' | 'entity';
}

export interface ExampleScenario extends DomainResource {
    actor?: ExampleScenarioActor[];
    contact?: ContactDetail[];
    copyright?: string;
    _copyright?: Element;
    date?: string;
    _date?: Element;
    experimental?: boolean;
    _experimental?: Element;
    identifier?: Identifier[];
    instance?: ExampleScenarioInstance[];
    jurisdiction?: CodeableConcept[];
    name?: string;
    _name?: Element;
    process?: ExampleScenarioProcess[];
    publisher?: string;
    _publisher?: Element;
    purpose?: string;
    _purpose?: Element;
    status?: 'draft' | 'active' | 'retired' | 'unknown';
    _status?: Element;
    url?: string;
    _url?: Element;
    useContext?: UsageContext[];
    version?: string;
    _version?: Element;
    workflow?: string[];
    _workflow?: Element;
}

