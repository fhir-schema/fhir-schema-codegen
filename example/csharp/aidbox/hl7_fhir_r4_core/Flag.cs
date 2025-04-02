
namespace Aidbox.FHIR.R4.Core;

public class Flag : DomainResource
{
    public Identifier[]? Identifier { get; set; }
    public string? Status { get; set; }
    public CodeableConcept[]? Category { get; set; }
    public CodeableConcept? Code { get; set; }
    public ResourceReference? Subject { get; set; }
    public Period? Period { get; set; }
    public ResourceReference? Encounter { get; set; }
    public ResourceReference? Author { get; set; }
}

