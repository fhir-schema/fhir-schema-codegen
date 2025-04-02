
namespace Aidbox.FHIR.R4.Core;

public class BodyStructure : DomainResource
{
    public Identifier[]? Identifier { get; set; }
    public bool? Active { get; set; }
    public CodeableConcept? Morphology { get; set; }
    public CodeableConcept? Location { get; set; }
    public CodeableConcept[]? LocationQualifier { get; set; }
    public string? Description { get; set; }
    public Attachment[]? Image { get; set; }
    public ResourceReference? Patient { get; set; }
}

