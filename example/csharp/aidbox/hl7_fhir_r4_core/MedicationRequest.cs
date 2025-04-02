
namespace Aidbox.FHIR.R4.Core;

public class MedicationRequest : DomainResource
{
    public CodeableConcept? PerformerType { get; set; }
    public CodeableConcept[]? Category { get; set; }
    public ResourceReference[]? Insurance { get; set; }
    public string[]? InstantiatesCanonical { get; set; }
    public ResourceReference[]? EventHistory { get; set; }
    public string[]? InstantiatesUri { get; set; }
    public MedicationRequestSubstitution? Substitution { get; set; }
    public ResourceReference[]? DetectedIssue { get; set; }
    public ResourceReference? Encounter { get; set; }
    public MedicationRequestDispenseRequest? DispenseRequest { get; set; }
    public CodeableConcept[]? ReasonCode { get; set; }
    public CodeableConcept? MedicationCodeableConcept { get; set; }
    public CodeableConcept? StatusReason { get; set; }
    public string? AuthoredOn { get; set; }
    public Annotation[]? Note { get; set; }
    public ResourceReference? Requester { get; set; }
    public ResourceReference[]? SupportingInformation { get; set; }
    public ResourceReference? ReportedReference { get; set; }
    public string? Priority { get; set; }
    public string? Status { get; set; }
    public Dosage[]? DosageInstruction { get; set; }
    public Identifier? GroupIdentifier { get; set; }
    public ResourceReference? Recorder { get; set; }
    public bool? ReportedBoolean { get; set; }
    public Identifier[]? Identifier { get; set; }
    public bool? DoNotPerform { get; set; }
    public string? Intent { get; set; }
    public ResourceReference[]? BasedOn { get; set; }
    public ResourceReference? PriorPrescription { get; set; }
    public ResourceReference? MedicationReference { get; set; }
    public CodeableConcept? CourseOfTherapyType { get; set; }
    public ResourceReference? Subject { get; set; }
    public ResourceReference? Performer { get; set; }
    public ResourceReference[]? ReasonReference { get; set; }
    
    public class MedicationRequestSubstitution : BackboneElement
    {
        public bool? AllowedBoolean { get; set; }
        public CodeableConcept? AllowedCodeableConcept { get; set; }
        public CodeableConcept? Reason { get; set; }
    }
    
    public class MedicationRequestDispenseRequestInitialFill : BackboneElement
    {
        public Quantity? Quantity { get; set; }
        public Duration? Duration { get; set; }
    }
    
    public class MedicationRequestDispenseRequest : BackboneElement
    {
        public MedicationRequestDispenseRequestInitialFill? InitialFill { get; set; }
        public Duration? DispenseInterval { get; set; }
        public Period? ValidityPeriod { get; set; }
        public long? NumberOfRepeatsAllowed { get; set; }
        public Quantity? Quantity { get; set; }
        public Duration? ExpectedSupplyDuration { get; set; }
        public ResourceReference? Performer { get; set; }
    }
    
}

