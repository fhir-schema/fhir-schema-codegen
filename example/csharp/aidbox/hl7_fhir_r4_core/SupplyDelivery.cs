
namespace Aidbox.FHIR.R4.Core;

public class SupplyDelivery : DomainResource
{
    public ResourceReference? Patient { get; set; }
    public ResourceReference? Supplier { get; set; }
    public SupplyDeliverySuppliedItem? SuppliedItem { get; set; }
    public CodeableConcept? Type { get; set; }
    public Timing? OccurrenceTiming { get; set; }
    public Period? OccurrencePeriod { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference[]? BasedOn { get; set; }
    public ResourceReference[]? PartOf { get; set; }
    public string? OccurrenceDateTime { get; set; }
    public ResourceReference[]? Receiver { get; set; }
    public ResourceReference? Destination { get; set; }
    
    public class SupplyDeliverySuppliedItem : BackboneElement
    {
        public Quantity? Quantity { get; set; }
        public CodeableConcept? ItemCodeableConcept { get; set; }
        public ResourceReference? ItemReference { get; set; }
    }
    
}

