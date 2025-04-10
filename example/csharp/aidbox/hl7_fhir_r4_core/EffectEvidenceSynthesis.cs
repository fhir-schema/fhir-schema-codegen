
namespace Aidbox.FHIR.R4.Core;

public class EffectEvidenceSynthesis : DomainResource
{
    public string? Description { get; set; }
    public ResourceReference? ExposureAlternative { get; set; }
    public string? Date { get; set; }
    public EffectEvidenceSynthesisEffectEstimate[]? EffectEstimate { get; set; }
    public ContactDetail[]? Endorser { get; set; }
    public string? Publisher { get; set; }
    public string? ApprovalDate { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public EffectEvidenceSynthesisSampleSize? SampleSize { get; set; }
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
    public EffectEvidenceSynthesisCertainty[]? Certainty { get; set; }
    public ContactDetail[]? Reviewer { get; set; }
    public ResourceReference? Exposure { get; set; }
    public EffectEvidenceSynthesisResultsByExposure[]? ResultsByExposure { get; set; }
    public string? Version { get; set; }
    public RelatedArtifact[]? RelatedArtifact { get; set; }
    public ContactDetail[]? Contact { get; set; }
    public Period? EffectivePeriod { get; set; }
    
    public class EffectEvidenceSynthesisEffectEstimatePrecisionEstimate : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public decimal? Level { get; set; }
        public decimal? From { get; set; }
        public decimal? To { get; set; }
    }
    
    public class EffectEvidenceSynthesisEffectEstimate : BackboneElement
    {
        public string? Description { get; set; }
        public CodeableConcept? Type { get; set; }
        public CodeableConcept? VariantState { get; set; }
        public decimal? Value { get; set; }
        public CodeableConcept? UnitOfMeasure { get; set; }
        public EffectEvidenceSynthesisEffectEstimatePrecisionEstimate[]? PrecisionEstimate { get; set; }
    }
    
    public class EffectEvidenceSynthesisSampleSize : BackboneElement
    {
        public string? Description { get; set; }
        public int? NumberOfStudies { get; set; }
        public int? NumberOfParticipants { get; set; }
    }
    
    public class EffectEvidenceSynthesisCertaintyCertaintySubcomponent : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public CodeableConcept[]? Rating { get; set; }
        public Annotation[]? Note { get; set; }
    }
    
    public class EffectEvidenceSynthesisCertainty : BackboneElement
    {
        public CodeableConcept[]? Rating { get; set; }
        public Annotation[]? Note { get; set; }
        public EffectEvidenceSynthesisCertaintyCertaintySubcomponent[]? CertaintySubcomponent { get; set; }
    }
    
    public class EffectEvidenceSynthesisResultsByExposure : BackboneElement
    {
        public string? Description { get; set; }
        public string? ExposureState { get; set; }
        public CodeableConcept? VariantState { get; set; }
        public ResourceReference? RiskEvidenceSynthesis { get; set; }
    }
    
}

