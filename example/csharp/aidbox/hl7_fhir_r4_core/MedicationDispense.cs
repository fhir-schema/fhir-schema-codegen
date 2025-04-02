
namespace Aidbox.FHIR.R4.Core;

public class MedicationDispense : DomainResource
{
    public ResourceReference? StatusReasonReference { get; set; }
    public CodeableConcept? Category { get; set; }
    public string? WhenHandedOver { get; set; }
    public string? WhenPrepared { get; set; }
    public ResourceReference[]? EventHistory { get; set; }
    public MedicationDispenseSubstitution? Substitution { get; set; }
    public ResourceReference[]? DetectedIssue { get; set; }
    public CodeableConcept? MedicationCodeableConcept { get; set; }
    public CodeableConcept? Type { get; set; }
    public Annotation[]? Note { get; set; }
    public CodeableConcept? StatusReasonCodeableConcept { get; set; }
    public ResourceReference[]? SupportingInformation { get; set; }
    public string? Status { get; set; }
    public Dosage[]? DosageInstruction { get; set; }
    public Quantity? DaysSupply { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference? Context { get; set; }
    public ResourceReference? MedicationReference { get; set; }
    public Quantity? Quantity { get; set; }
    public ResourceReference[]? PartOf { get; set; }
    public ResourceReference? Location { get; set; }
    public ResourceReference[]? AuthorizingPrescription { get; set; }
    public ResourceReference[]? Receiver { get; set; }
    public ResourceReference? Subject { get; set; }
    public ResourceReference? Destination { get; set; }
    public MedicationDispensePerformer[]? Performer { get; set; }
    
    public class MedicationDispenseSubstitution : BackboneElement
    {
        public bool? WasSubstituted { get; set; }
        public CodeableConcept? Type { get; set; }
        public CodeableConcept[]? Reason { get; set; }
        public ResourceReference[]? ResponsibleParty { get; set; }
    }
    
    public class MedicationDispensePerformer : BackboneElement
    {
        public CodeableConcept? Function { get; set; }
        public ResourceReference? Actor { get; set; }
    }
    
}

