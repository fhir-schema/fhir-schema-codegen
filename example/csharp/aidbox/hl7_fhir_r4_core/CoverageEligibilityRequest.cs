
namespace Aidbox.FHIR.R4.Core;

public class CoverageEligibilityRequest : DomainResource
{
    public ResourceReference? Patient { get; set; }
    public CoverageEligibilityRequestInsurance[]? Insurance { get; set; }
    public ResourceReference? Facility { get; set; }
    public ResourceReference? Enterer { get; set; }
    public CoverageEligibilityRequestSupportingInfo[]? SupportingInfo { get; set; }
    public string[]? Purpose { get; set; }
    public CoverageEligibilityRequestItem[]? Item { get; set; }
    public string? Created { get; set; }
    public ResourceReference? Insurer { get; set; }
    public CodeableConcept? Priority { get; set; }
    public string? Status { get; set; }
    public string? ServicedDate { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference? Provider { get; set; }
    public Period? ServicedPeriod { get; set; }
    
    public class CoverageEligibilityRequestInsurance : BackboneElement
    {
        public bool? Focal { get; set; }
        public ResourceReference? Coverage { get; set; }
        public string? BusinessArrangement { get; set; }
    }
    
    public class CoverageEligibilityRequestSupportingInfo : BackboneElement
    {
        public long? Sequence { get; set; }
        public ResourceReference? Information { get; set; }
        public bool? AppliesToAll { get; set; }
    }
    
    public class CoverageEligibilityRequestItemDiagnosis : BackboneElement
    {
        public CodeableConcept? DiagnosisCodeableConcept { get; set; }
        public ResourceReference? DiagnosisReference { get; set; }
    }
    
    public class CoverageEligibilityRequestItem : BackboneElement
    {
        public CodeableConcept? Category { get; set; }
        public ResourceReference? Facility { get; set; }
        public CoverageEligibilityRequestItemDiagnosis[]? Diagnosis { get; set; }
        public CodeableConcept[]? Modifier { get; set; }
        public CodeableConcept? ProductOrService { get; set; }
        public Quantity? Quantity { get; set; }
        public ResourceReference? Provider { get; set; }
        public long[]? SupportingInfoSequence { get; set; }
        public Money? UnitPrice { get; set; }
        public ResourceReference[]? Detail { get; set; }
    }
    
}

