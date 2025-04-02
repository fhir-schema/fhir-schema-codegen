
namespace Aidbox.FHIR.R4.Core;

public class ResearchElementDefinition : DomainResource
{
    public string? Description { get; set; }
    public string? Date { get; set; }
    public ContactDetail[]? Endorser { get; set; }
    public string? Publisher { get; set; }
    public string? ApprovalDate { get; set; }
    public string? VariableType { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public string? Purpose { get; set; }
    public CodeableConcept? SubjectCodeableConcept { get; set; }
    public string? Name { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public string? Copyright { get; set; }
    public string? Type { get; set; }
    public bool? Experimental { get; set; }
    public CodeableConcept[]? Topic { get; set; }
    public string? Title { get; set; }
    public string[]? Library { get; set; }
    public ContactDetail[]? Author { get; set; }
    public ResearchElementDefinitionCharacteristic[]? Characteristic { get; set; }
    public string? Usage { get; set; }
    public string? Status { get; set; }
    public string? Subtitle { get; set; }
    public string[]? Comment { get; set; }
    public string? Url { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? LastReviewDate { get; set; }
    public ContactDetail[]? Editor { get; set; }
    public ContactDetail[]? Reviewer { get; set; }
    public string? ShortTitle { get; set; }
    public string? Version { get; set; }
    public RelatedArtifact[]? RelatedArtifact { get; set; }
    public ContactDetail[]? Contact { get; set; }
    public ResourceReference? SubjectReference { get; set; }
    public Period? EffectivePeriod { get; set; }
    
    public class ResearchElementDefinitionCharacteristic : BackboneElement
    {
        public Timing? StudyEffectiveTiming { get; set; }
        public bool? Exclude { get; set; }
        public ResourceExpression? DefinitionExpression { get; set; }
        public Duration? ParticipantEffectiveDuration { get; set; }
        public Duration? StudyEffectiveDuration { get; set; }
        public DataRequirement? DefinitionDataRequirement { get; set; }
        public string? DefinitionCanonical { get; set; }
        public string? StudyEffectiveGroupMeasure { get; set; }
        public Timing? ParticipantEffectiveTiming { get; set; }
        public string? ParticipantEffectiveGroupMeasure { get; set; }
        public string? StudyEffectiveDescription { get; set; }
        public string? ParticipantEffectiveDateTime { get; set; }
        public Duration? StudyEffectiveTimeFromStart { get; set; }
        public CodeableConcept? UnitOfMeasure { get; set; }
        public Period? ParticipantEffectivePeriod { get; set; }
        public string? ParticipantEffectiveDescription { get; set; }
        public CodeableConcept? DefinitionCodeableConcept { get; set; }
        public UsageContext[]? UsageContext { get; set; }
        public Period? StudyEffectivePeriod { get; set; }
        public Duration? ParticipantEffectiveTimeFromStart { get; set; }
        public string? StudyEffectiveDateTime { get; set; }
    }
    
}

