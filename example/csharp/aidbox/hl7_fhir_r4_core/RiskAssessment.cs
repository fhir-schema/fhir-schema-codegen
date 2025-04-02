
namespace Aidbox.FHIR.R4.Core;

public class RiskAssessment : DomainResource
{
    public ResourceReference? Parent { get; set; }
    public ResourceReference? Encounter { get; set; }
    public RiskAssessmentPrediction[]? Prediction { get; set; }
    public CodeableConcept? Method { get; set; }
    public ResourceReference[]? Basis { get; set; }
    public CodeableConcept[]? ReasonCode { get; set; }
    public string? Mitigation { get; set; }
    public Annotation[]? Note { get; set; }
    public Period? OccurrencePeriod { get; set; }
    public string? Status { get; set; }
    public ResourceReference? Condition { get; set; }
    public CodeableConcept? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference? BasedOn { get; set; }
    public string? OccurrenceDateTime { get; set; }
    public ResourceReference? Subject { get; set; }
    public ResourceReference? Performer { get; set; }
    public ResourceReference[]? ReasonReference { get; set; }
    
    public class RiskAssessmentPrediction : BackboneElement
    {
        public decimal? RelativeRisk { get; set; }
        public Range? WhenRange { get; set; }
        public CodeableConcept? Outcome { get; set; }
        public Period? WhenPeriod { get; set; }
        public string? Rationale { get; set; }
        public Range? ProbabilityRange { get; set; }
        public CodeableConcept? QualitativeRisk { get; set; }
        public decimal? ProbabilityDecimal { get; set; }
    }
    
}

