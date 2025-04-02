
namespace Aidbox.FHIR.R4.Core;

public class CoverageEligibilityResponse : DomainResource
{
    public ResourceReference? Patient { get; set; }
    public ResourceReference? Requestor { get; set; }
    public CoverageEligibilityResponseInsurance[]? Insurance { get; set; }
    public ResourceReference? Request { get; set; }
    public string? PreAuthRef { get; set; }
    public string[]? Purpose { get; set; }
    public string? Created { get; set; }
    public string? Outcome { get; set; }
    public string? Disposition { get; set; }
    public ResourceReference? Insurer { get; set; }
    public string? Status { get; set; }
    public string? ServicedDate { get; set; }
    public Identifier[]? Identifier { get; set; }
    public CoverageEligibilityResponseError[]? Error { get; set; }
    public CodeableConcept? Form { get; set; }
    public Period? ServicedPeriod { get; set; }
    
    public class CoverageEligibilityResponseInsuranceItemBenefit : BackboneElement
    {
        public string? UsedString { get; set; }
        public Money? AllowedMoney { get; set; }
        public CodeableConcept? Type { get; set; }
        public long? AllowedUnsignedInt { get; set; }
        public long? UsedUnsignedInt { get; set; }
        public string? AllowedString { get; set; }
        public Money? UsedMoney { get; set; }
    }
    
    public class CoverageEligibilityResponseInsuranceItem : BackboneElement
    {
        public string? Description { get; set; }
        public CodeableConcept? Category { get; set; }
        public bool? AuthorizationRequired { get; set; }
        public CodeableConcept[]? Modifier { get; set; }
        public CodeableConcept[]? AuthorizationSupporting { get; set; }
        public CodeableConcept? Unit { get; set; }
        public bool? Excluded { get; set; }
        public string? Name { get; set; }
        public CodeableConcept? ProductOrService { get; set; }
        public CodeableConcept? Term { get; set; }
        public CoverageEligibilityResponseInsuranceItemBenefit[]? Benefit { get; set; }
        public string? AuthorizationUrl { get; set; }
        public CodeableConcept? Network { get; set; }
        public ResourceReference? Provider { get; set; }
    }
    
    public class CoverageEligibilityResponseInsurance : BackboneElement
    {
        public ResourceReference? Coverage { get; set; }
        public bool? Inforce { get; set; }
        public Period? BenefitPeriod { get; set; }
        public CoverageEligibilityResponseInsuranceItem[]? Item { get; set; }
    }
    
    public class CoverageEligibilityResponseError : BackboneElement
    {
        public CodeableConcept? Code { get; set; }
    }
    
}

