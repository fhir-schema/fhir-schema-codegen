
namespace Aidbox.FHIR.R4.Core;

public class DeviceRequest : DomainResource
{
    public CodeableConcept? PerformerType { get; set; }
    public ResourceReference[]? Insurance { get; set; }
    public string[]? InstantiatesCanonical { get; set; }
    public string[]? InstantiatesUri { get; set; }
    public ResourceReference[]? RelevantHistory { get; set; }
    public ResourceReference[]? SupportingInfo { get; set; }
    public ResourceReference? Encounter { get; set; }
    public ResourceReference[]? PriorRequest { get; set; }
    public CodeableConcept[]? ReasonCode { get; set; }
    public string? AuthoredOn { get; set; }
    public Timing? OccurrenceTiming { get; set; }
    public Annotation[]? Note { get; set; }
    public ResourceReference? CodeReference { get; set; }
    public ResourceReference? Requester { get; set; }
    public string? Priority { get; set; }
    public Period? OccurrencePeriod { get; set; }
    public string? Status { get; set; }
    public CodeableConcept? CodeCodeableConcept { get; set; }
    public Identifier? GroupIdentifier { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? Intent { get; set; }
    public ResourceReference[]? BasedOn { get; set; }
    public string? OccurrenceDateTime { get; set; }
    public ResourceReference? Subject { get; set; }
    public DeviceRequestParameter[]? Parameter { get; set; }
    public ResourceReference? Performer { get; set; }
    public ResourceReference[]? ReasonReference { get; set; }
    
    public class DeviceRequestParameter : BackboneElement
    {
        public CodeableConcept? Code { get; set; }
        public CodeableConcept? ValueCodeableConcept { get; set; }
        public Quantity? ValueQuantity { get; set; }
        public Range? ValueRange { get; set; }
        public bool? ValueBoolean { get; set; }
    }
    
}

