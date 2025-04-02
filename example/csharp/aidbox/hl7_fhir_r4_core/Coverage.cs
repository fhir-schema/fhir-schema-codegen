
namespace Aidbox.FHIR.R4.Core;

public class Coverage : DomainResource
{
    public ResourceReference? PolicyHolder { get; set; }
    public ResourceReference? Beneficiary { get; set; }
    public ResourceReference[]? Contract { get; set; }
    public CodeableConcept? Relationship { get; set; }
    public CodeableConcept? Type { get; set; }
    public CoverageCostToBeneficiary[]? CostToBeneficiary { get; set; }
    public bool? Subrogation { get; set; }
    public ResourceReference? Subscriber { get; set; }
    public ResourceReference[]? Payor { get; set; }
    public string? Status { get; set; }
    public CoverageClass[]? Class { get; set; }
    public Identifier[]? Identifier { get; set; }
    public long? Order { get; set; }
    public string? Network { get; set; }
    public Period? Period { get; set; }
    public string? Dependent { get; set; }
    public string? SubscriberId { get; set; }
    
    public class CoverageCostToBeneficiaryException : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public Period? Period { get; set; }
    }
    
    public class CoverageCostToBeneficiary : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public Quantity? ValueQuantity { get; set; }
        public Money? ValueMoney { get; set; }
        public CoverageCostToBeneficiaryException[]? Exception { get; set; }
    }
    
    public class CoverageClass : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public string? Value { get; set; }
        public string? Name { get; set; }
    }
    
}

