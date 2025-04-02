
namespace Aidbox.FHIR.R4.Core;

public class Basic : DomainResource
{
    public Identifier[]? Identifier { get; set; }
    public CodeableConcept? Code { get; set; }
    public ResourceReference? Subject { get; set; }
    public string? Created { get; set; }
    public ResourceReference? Author { get; set; }
}

