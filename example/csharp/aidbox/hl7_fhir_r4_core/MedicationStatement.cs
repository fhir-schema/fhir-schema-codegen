
namespace Aidbox.FHIR.R4.Core;

public class MedicationStatement : DomainResource
{
    public CodeableConcept? Category { get; set; }
    public Dosage[]? Dosage { get; set; }
    public ResourceReference[]? DerivedFrom { get; set; }
    public CodeableConcept[]? ReasonCode { get; set; }
    public CodeableConcept? MedicationCodeableConcept { get; set; }
    public CodeableConcept[]? StatusReason { get; set; }
    public Annotation[]? Note { get; set; }
    public string? EffectiveDateTime { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference? Context { get; set; }
    public string? DateAsserted { get; set; }
    public ResourceReference[]? BasedOn { get; set; }
    public ResourceReference? MedicationReference { get; set; }
    public ResourceReference[]? PartOf { get; set; }
    public ResourceReference? InformationSource { get; set; }
    public ResourceReference? Subject { get; set; }
    public Period? EffectivePeriod { get; set; }
    public ResourceReference[]? ReasonReference { get; set; }
}

