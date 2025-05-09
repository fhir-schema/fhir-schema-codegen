
namespace Aidbox.FHIR.R4.Core;

public class ServiceRequest : DomainResource
{
    public CodeableConcept? PerformerType { get; set; }
    public CodeableConcept[]? Category { get; set; }
    public ResourceReference[]? Insurance { get; set; }
    public string[]? InstantiatesCanonical { get; set; }
    public string[]? InstantiatesUri { get; set; }
    public ResourceReference[]? RelevantHistory { get; set; }
    public ResourceReference[]? SupportingInfo { get; set; }
    public ResourceReference? Encounter { get; set; }
    public string? PatientInstruction { get; set; }
    public ResourceReference[]? Specimen { get; set; }
    public CodeableConcept[]? ReasonCode { get; set; }
    public string? AuthoredOn { get; set; }
    public Timing? OccurrenceTiming { get; set; }
    public Annotation[]? Note { get; set; }
    public bool? AsNeededBoolean { get; set; }
    public Identifier? Requisition { get; set; }
    public ResourceReference[]? LocationReference { get; set; }
    public ResourceReference? Requester { get; set; }
    public string? Priority { get; set; }
    public Period? OccurrencePeriod { get; set; }
    public string? Status { get; set; }
    public Ratio? QuantityRatio { get; set; }
    public CodeableConcept? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public bool? DoNotPerform { get; set; }
    public CodeableConcept[]? BodySite { get; set; }
    public string? Intent { get; set; }
    public Range? QuantityRange { get; set; }
    public Quantity? QuantityQuantity { get; set; }
    public ResourceReference[]? Replaces { get; set; }
    public CodeableConcept[]? OrderDetail { get; set; }
    public ResourceReference[]? BasedOn { get; set; }
    public CodeableConcept[]? LocationCode { get; set; }
    public string? OccurrenceDateTime { get; set; }
    public ResourceReference? Subject { get; set; }
    public CodeableConcept? AsNeededCodeableConcept { get; set; }
    public ResourceReference[]? Performer { get; set; }
    public ResourceReference[]? ReasonReference { get; set; }
}

