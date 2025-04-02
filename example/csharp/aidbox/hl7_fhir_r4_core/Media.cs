
namespace Aidbox.FHIR.R4.Core;

public class Media : DomainResource
{
    public string? DeviceName { get; set; }
    public ResourceReference? Encounter { get; set; }
    public Attachment? Content { get; set; }
    public long? Frames { get; set; }
    public long? Width { get; set; }
    public CodeableConcept[]? ReasonCode { get; set; }
    public CodeableConcept? Type { get; set; }
    public CodeableConcept? Modality { get; set; }
    public decimal? Duration { get; set; }
    public Annotation[]? Note { get; set; }
    public Period? CreatedPeriod { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference? Operator { get; set; }
    public CodeableConcept? BodySite { get; set; }
    public string? Issued { get; set; }
    public ResourceReference? Device { get; set; }
    public ResourceReference[]? BasedOn { get; set; }
    public ResourceReference[]? PartOf { get; set; }
    public string? CreatedDateTime { get; set; }
    public ResourceReference? Subject { get; set; }
    public CodeableConcept? View { get; set; }
    public long? Height { get; set; }
}

