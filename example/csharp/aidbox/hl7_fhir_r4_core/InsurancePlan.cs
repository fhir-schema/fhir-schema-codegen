
namespace Aidbox.FHIR.R4.Core;

public class InsurancePlan : DomainResource
{
    public ResourceReference[]? CoverageArea { get; set; }
    public string? Name { get; set; }
    public InsurancePlanCoverage[]? Coverage { get; set; }
    public CodeableConcept[]? Type { get; set; }
    public string[]? Alias { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference? AdministeredBy { get; set; }
    public ResourceReference? OwnedBy { get; set; }
    public ResourceReference[]? Network { get; set; }
    public Period? Period { get; set; }
    public InsurancePlanPlan[]? Plan { get; set; }
    public ResourceReference[]? Endpoint { get; set; }
    public InsurancePlanContact[]? Contact { get; set; }
    
    public class InsurancePlanCoverageBenefitLimit : BackboneElement
    {
        public Quantity? Value { get; set; }
        public CodeableConcept? Code { get; set; }
    }
    
    public class InsurancePlanCoverageBenefit : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public string? Requirement { get; set; }
        public InsurancePlanCoverageBenefitLimit[]? Limit { get; set; }
    }
    
    public class InsurancePlanCoverage : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public ResourceReference[]? Network { get; set; }
        public InsurancePlanCoverageBenefit[]? Benefit { get; set; }
    }
    
    public class InsurancePlanPlanGeneralCost : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public long? GroupSize { get; set; }
        public Money? Cost { get; set; }
        public string? Comment { get; set; }
    }
    
    public class InsurancePlanPlanSpecificCostBenefitCost : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public CodeableConcept? Applicability { get; set; }
        public CodeableConcept[]? Qualifiers { get; set; }
        public Quantity? Value { get; set; }
    }
    
    public class InsurancePlanPlanSpecificCostBenefit : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public InsurancePlanPlanSpecificCostBenefitCost[]? Cost { get; set; }
    }
    
    public class InsurancePlanPlanSpecificCost : BackboneElement
    {
        public CodeableConcept? Category { get; set; }
        public InsurancePlanPlanSpecificCostBenefit[]? Benefit { get; set; }
    }
    
    public class InsurancePlanPlan : BackboneElement
    {
        public Identifier[]? Identifier { get; set; }
        public CodeableConcept? Type { get; set; }
        public ResourceReference[]? CoverageArea { get; set; }
        public ResourceReference[]? Network { get; set; }
        public InsurancePlanPlanGeneralCost[]? GeneralCost { get; set; }
        public InsurancePlanPlanSpecificCost[]? SpecificCost { get; set; }
    }
    
    public class InsurancePlanContact : BackboneElement
    {
        public CodeableConcept? Purpose { get; set; }
        public HumanName? Name { get; set; }
        public ContactPoint[]? Telecom { get; set; }
        public Address? Address { get; set; }
    }
    
}

