
namespace Aidbox.FHIR.R4.Core;

public class RequestGroup : DomainResource
{
    public string[]? InstantiatesCanonical { get; set; }
    public string[]? InstantiatesUri { get; set; }
    public ResourceReference? Encounter { get; set; }
    public CodeableConcept[]? ReasonCode { get; set; }
    public string? AuthoredOn { get; set; }
    public Annotation[]? Note { get; set; }
    public ResourceReference? Author { get; set; }
    public string? Priority { get; set; }
    public string? Status { get; set; }
    public Identifier? GroupIdentifier { get; set; }
    public CodeableConcept? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? Intent { get; set; }
    public RequestGroupAction[]? Action { get; set; }
    public ResourceReference[]? Replaces { get; set; }
    public ResourceReference[]? BasedOn { get; set; }
    public ResourceReference? Subject { get; set; }
    public ResourceReference[]? ReasonReference { get; set; }
    
    public class RequestGroupActionRelatedAction : BackboneElement
    {
        public string? ActionId { get; set; }
        public string? Relationship { get; set; }
        public Duration? OffsetDuration { get; set; }
        public Range? OffsetRange { get; set; }
    }
    
    public class RequestGroupActionCondition : BackboneElement
    {
        public string? Kind { get; set; }
        public ResourceExpression? Expression { get; set; }
    }
    
    public class RequestGroupAction : BackboneElement
    {
        public Range? TimingRange { get; set; }
        public string? Description { get; set; }
        public string? TextEquivalent { get; set; }
        public Period? TimingPeriod { get; set; }
        public RequestGroupActionRelatedAction[]? RelatedAction { get; set; }
        public CodeableConcept? Type { get; set; }
        public ResourceReference[]? Participant { get; set; }
        public string? Title { get; set; }
        public RelatedArtifact[]? Documentation { get; set; }
        public string? Prefix { get; set; }
        public string? SelectionBehavior { get; set; }
        public string? TimingDateTime { get; set; }
        public Timing? TimingTiming { get; set; }
        public Duration? TimingDuration { get; set; }
        public string? Priority { get; set; }
        public string? RequiredBehavior { get; set; }
        public RequestGroupActionCondition[]? Condition { get; set; }
        public ResourceReference? Resource { get; set; }
        public string? GroupingBehavior { get; set; }
        public CodeableConcept[]? Code { get; set; }
        public Age? TimingAge { get; set; }
        public RequestGroupAction[]? Action { get; set; }
        public string? PrecheckBehavior { get; set; }
        public string? CardinalityBehavior { get; set; }
    }
    
}

