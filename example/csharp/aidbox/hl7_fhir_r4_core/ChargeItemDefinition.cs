
namespace Aidbox.FHIR.R4.Core;

public class ChargeItemDefinition : DomainResource
{
    public string? Description { get; set; }
    public string? Date { get; set; }
    public string? Publisher { get; set; }
    public string? ApprovalDate { get; set; }
    public ChargeItemDefinitionPropertyGroup[]? PropertyGroup { get; set; }
    public ResourceReference[]? Instance { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public string? Copyright { get; set; }
    public bool? Experimental { get; set; }
    public string? Title { get; set; }
    public string[]? DerivedFromUri { get; set; }
    public string? Status { get; set; }
    public string? Url { get; set; }
    public CodeableConcept? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? LastReviewDate { get; set; }
    public string[]? Replaces { get; set; }
    public string[]? PartOf { get; set; }
    public string? Version { get; set; }
    public ContactDetail[]? Contact { get; set; }
    public ChargeItemDefinitionApplicability[]? Applicability { get; set; }
    public Period? EffectivePeriod { get; set; }
    
    public class ChargeItemDefinitionPropertyGroupPriceComponent : BackboneElement
    {
        public string? Type { get; set; }
        public CodeableConcept? Code { get; set; }
        public decimal? Factor { get; set; }
        public Money? Amount { get; set; }
    }
    
    public class ChargeItemDefinitionPropertyGroup : BackboneElement
    {
        public ChargeItemDefinitionApplicability[]? Applicability { get; set; }
        public ChargeItemDefinitionPropertyGroupPriceComponent[]? PriceComponent { get; set; }
    }
    
    public class ChargeItemDefinitionApplicability : BackboneElement
    {
        public string? Description { get; set; }
        public string? Language { get; set; }
        public string? Expression { get; set; }
    }
    
}

