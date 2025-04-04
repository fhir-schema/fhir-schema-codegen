
namespace Aidbox.FHIR.R4.Core;

public class ChargeItem : DomainResource
{
    public ResourceReference[]? Service { get; set; }
    public string[]? DefinitionUri { get; set; }
    public ResourceReference? Enterer { get; set; }
    public ResourceReference? RequestingOrganization { get; set; }
    public CodeableConcept? ProductCodeableConcept { get; set; }
    public ResourceReference? ProductReference { get; set; }
    public string[]? DefinitionCanonical { get; set; }
    public CodeableConcept[]? Bodysite { get; set; }
    public Timing? OccurrenceTiming { get; set; }
    public ResourceReference? CostCenter { get; set; }
    public Annotation[]? Note { get; set; }
    public ResourceReference[]? Account { get; set; }
    public CodeableConcept[]? Reason { get; set; }
    public ResourceReference[]? SupportingInformation { get; set; }
    public Period? OccurrencePeriod { get; set; }
    public string? Status { get; set; }
    public CodeableConcept? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference? Context { get; set; }
    public Quantity? Quantity { get; set; }
    public ResourceReference[]? PartOf { get; set; }
    public Money? PriceOverride { get; set; }
    public string? EnteredDate { get; set; }
    public string? OccurrenceDateTime { get; set; }
    public string? OverrideReason { get; set; }
    public ResourceReference? PerformingOrganization { get; set; }
    public ResourceReference? Subject { get; set; }
    public decimal? FactorOverride { get; set; }
    public ChargeItemPerformer[]? Performer { get; set; }
    
    public class ChargeItemPerformer : BackboneElement
    {
        public CodeableConcept? Function { get; set; }
        public ResourceReference? Actor { get; set; }
    }
    
}

