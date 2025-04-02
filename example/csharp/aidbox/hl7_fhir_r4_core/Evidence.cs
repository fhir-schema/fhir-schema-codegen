
namespace Aidbox.FHIR.R4.Core;

public class Evidence : DomainResource
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
    public ResourceReference[]? Outcome { get; set; }
    public CodeableConcept[]? Topic { get; set; }
    public string? Title { get; set; }
    public Annotation[]? Note { get; set; }
    public ContactDetail[]? Author { get; set; }
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
    public ResourceReference? ExposureBackground { get; set; }
    public Period? EffectivePeriod { get; set; }
    public ResourceReference[]? ExposureVariant { get; set; }
}

