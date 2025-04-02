
namespace Aidbox.FHIR.R4.Core;

public class Account : DomainResource
{
    public string? Description { get; set; }
    public string? Name { get; set; }
    public Period? ServicePeriod { get; set; }
    public AccountCoverage[]? Coverage { get; set; }
    public CodeableConcept? Type { get; set; }
    public AccountGuarantor[]? Guarantor { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference? PartOf { get; set; }
    public ResourceReference[]? Subject { get; set; }
    public ResourceReference? Owner { get; set; }
    
    public class AccountCoverage : BackboneElement
    {
        public ResourceReference? Coverage { get; set; }
        public long? Priority { get; set; }
    }
    
    public class AccountGuarantor : BackboneElement
    {
        public ResourceReference? Party { get; set; }
        public bool? OnHold { get; set; }
        public Period? Period { get; set; }
    }
    
}

