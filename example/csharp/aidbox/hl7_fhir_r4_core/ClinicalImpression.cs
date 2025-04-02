
namespace Aidbox.FHIR.R4.Core;

public class ClinicalImpression : DomainResource
{
    public string? Description { get; set; }
    public string? Date { get; set; }
    public ClinicalImpressionInvestigation[]? Investigation { get; set; }
    public string[]? Protocol { get; set; }
    public ResourceReference? Assessor { get; set; }
    public ResourceReference[]? SupportingInfo { get; set; }
    public ResourceReference? Encounter { get; set; }
    public ResourceReference[]? Problem { get; set; }
    public CodeableConcept? StatusReason { get; set; }
    public Annotation[]? Note { get; set; }
    public string? Summary { get; set; }
    public string? EffectiveDateTime { get; set; }
    public CodeableConcept[]? PrognosisCodeableConcept { get; set; }
    public string? Status { get; set; }
    public ResourceReference? Previous { get; set; }
    public CodeableConcept? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ClinicalImpressionFinding[]? Finding { get; set; }
    public ResourceReference[]? PrognosisReference { get; set; }
    public ResourceReference? Subject { get; set; }
    public Period? EffectivePeriod { get; set; }
    
    public class ClinicalImpressionInvestigation : BackboneElement
    {
        public CodeableConcept? Code { get; set; }
        public ResourceReference[]? Item { get; set; }
    }
    
    public class ClinicalImpressionFinding : BackboneElement
    {
        public CodeableConcept? ItemCodeableConcept { get; set; }
        public ResourceReference? ItemReference { get; set; }
        public string? Basis { get; set; }
    }
    
}

