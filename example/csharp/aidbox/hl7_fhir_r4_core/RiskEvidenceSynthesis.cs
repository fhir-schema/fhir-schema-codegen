
namespace Aidbox.FHIR.R4.Core;

public class RiskEvidenceSynthesis : DomainResource
{
    public string? Description { get; set; }
    public string? Date { get; set; }
    public ContactDetail[]? Endorser { get; set; }
    public string? Publisher { get; set; }
    public string? ApprovalDate { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public RiskEvidenceSynthesisSampleSize? SampleSize { get; set; }
    public string? Name { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public string? Copyright { get; set; }
    public CodeableConcept? StudyType { get; set; }
    public ResourceReference? Outcome { get; set; }
    public CodeableConcept[]? Topic { get; set; }
    public string? Title { get; set; }
    public Annotation[]? Note { get; set; }
    public ContactDetail[]? Author { get; set; }
    public CodeableConcept? SynthesisType { get; set; }
    public string? Status { get; set; }
    public ResourceReference? Population { get; set; }
    public string? Url { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? LastReviewDate { get; set; }
    public ContactDetail[]? Editor { get; set; }
    public RiskEvidenceSynthesisCertainty[]? Certainty { get; set; }
    public ContactDetail[]? Reviewer { get; set; }
    public ResourceReference? Exposure { get; set; }
    public string? Version { get; set; }
    public RelatedArtifact[]? RelatedArtifact { get; set; }
    public ContactDetail[]? Contact { get; set; }
    public RiskEvidenceSynthesisRiskEstimate? RiskEstimate { get; set; }
    public Period? EffectivePeriod { get; set; }
    
    public class RiskEvidenceSynthesisSampleSize : BackboneElement
    {
        public string? Description { get; set; }
        public int? NumberOfStudies { get; set; }
        public int? NumberOfParticipants { get; set; }
    }
    
    public class RiskEvidenceSynthesisCertaintyCertaintySubcomponent : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public CodeableConcept[]? Rating { get; set; }
        public Annotation[]? Note { get; set; }
    }
    
    public class RiskEvidenceSynthesisCertainty : BackboneElement
    {
        public CodeableConcept[]? Rating { get; set; }
        public Annotation[]? Note { get; set; }
        public RiskEvidenceSynthesisCertaintyCertaintySubcomponent[]? CertaintySubcomponent { get; set; }
    }
    
    public class RiskEvidenceSynthesisRiskEstimatePrecisionEstimate : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public decimal? Level { get; set; }
        public decimal? From { get; set; }
        public decimal? To { get; set; }
    }
    
    public class RiskEvidenceSynthesisRiskEstimate : BackboneElement
    {
        public string? Description { get; set; }
        public CodeableConcept? Type { get; set; }
        public decimal? Value { get; set; }
        public CodeableConcept? UnitOfMeasure { get; set; }
        public int? DenominatorCount { get; set; }
        public int? NumeratorCount { get; set; }
        public RiskEvidenceSynthesisRiskEstimatePrecisionEstimate[]? PrecisionEstimate { get; set; }
    }
    
}

