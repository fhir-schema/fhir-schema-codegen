
namespace Aidbox.FHIR.R4.Core;

public class ResearchSubject : DomainResource
{
    public Identifier[]? Identifier { get; set; }
    public string? Status { get; set; }
    public Period? Period { get; set; }
    public ResourceReference? Study { get; set; }
    public ResourceReference? Individual { get; set; }
    public string? AssignedArm { get; set; }
    public string? ActualArm { get; set; }
    public ResourceReference? Consent { get; set; }
}

