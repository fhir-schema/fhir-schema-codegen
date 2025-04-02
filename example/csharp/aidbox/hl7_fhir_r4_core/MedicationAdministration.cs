
namespace Aidbox.FHIR.R4.Core;

public class MedicationAdministration : DomainResource
{
    public CodeableConcept? Category { get; set; }
    public ResourceReference? Request { get; set; }
    public ResourceReference[]? EventHistory { get; set; }
    public MedicationAdministrationDosage? Dosage { get; set; }
    public string[]? Instantiates { get; set; }
    public CodeableConcept[]? ReasonCode { get; set; }
    public CodeableConcept? MedicationCodeableConcept { get; set; }
    public CodeableConcept[]? StatusReason { get; set; }
    public Annotation[]? Note { get; set; }
    public ResourceReference[]? SupportingInformation { get; set; }
    public string? EffectiveDateTime { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference? Context { get; set; }
    public ResourceReference[]? Device { get; set; }
    public ResourceReference? MedicationReference { get; set; }
    public ResourceReference[]? PartOf { get; set; }
    public ResourceReference? Subject { get; set; }
    public MedicationAdministrationPerformer[]? Performer { get; set; }
    public Period? EffectivePeriod { get; set; }
    public ResourceReference[]? ReasonReference { get; set; }
    
    public class MedicationAdministrationDosage : BackboneElement
    {
        public string? Text { get; set; }
        public CodeableConcept? Site { get; set; }
        public CodeableConcept? Route { get; set; }
        public CodeableConcept? Method { get; set; }
        public Quantity? Dose { get; set; }
        public Ratio? RateRatio { get; set; }
        public Quantity? RateQuantity { get; set; }
    }
    
    public class MedicationAdministrationPerformer : BackboneElement
    {
        public CodeableConcept? Function { get; set; }
        public ResourceReference? Actor { get; set; }
    }
    
}

