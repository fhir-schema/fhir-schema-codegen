
namespace Aidbox.FHIR.R4.Core;

public class EvidenceVariable : DomainResource
{
    public string? Description { get; set; }
    public string? Date { get; set; }
    public ContactDetail[]? Endorser { get; set; }
    public string? Publisher { get; set; }
    public string? ApprovalDate { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public string? Name { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public string? Copyright { get; set; }
    public string? Type { get; set; }
    public CodeableConcept[]? Topic { get; set; }
    public string? Title { get; set; }
    public Annotation[]? Note { get; set; }
    public ContactDetail[]? Author { get; set; }
    public EvidenceVariableCharacteristic[]? Characteristic { get; set; }
    public string? Status { get; set; }
    public string? Subtitle { get; set; }
    public string? Url { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? LastReviewDate { get; set; }
    public ContactDetail[]? Editor { get; set; }
    public ContactDetail[]? Reviewer { get; set; }
    public string? ShortTitle { get; set; }
    public string? Version { get; set; }
    public RelatedArtifact[]? RelatedArtifact { get; set; }
    public ContactDetail[]? Contact { get; set; }
    public Period? EffectivePeriod { get; set; }
    
    public class EvidenceVariableCharacteristic : BackboneElement
    {
        public string? Description { get; set; }
        public bool? Exclude { get; set; }
        public string? GroupMeasure { get; set; }
        public ResourceExpression? DefinitionExpression { get; set; }
        public Duration? TimeFromStart { get; set; }
        public Duration? ParticipantEffectiveDuration { get; set; }
        public DataRequirement? DefinitionDataRequirement { get; set; }
        public TriggerDefinition? DefinitionTriggerDefinition { get; set; }
        public string? DefinitionCanonical { get; set; }
        public ResourceReference? DefinitionReference { get; set; }
        public Timing? ParticipantEffectiveTiming { get; set; }
        public string? ParticipantEffectiveDateTime { get; set; }
        public Period? ParticipantEffectivePeriod { get; set; }
        public CodeableConcept? DefinitionCodeableConcept { get; set; }
        public UsageContext[]? UsageContext { get; set; }
    }
    
}

