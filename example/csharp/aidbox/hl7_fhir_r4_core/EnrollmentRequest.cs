
namespace Aidbox.FHIR.R4.Core;

public class EnrollmentRequest : DomainResource
{
    public Identifier[]? Identifier { get; set; }
    public string? Status { get; set; }
    public string? Created { get; set; }
    public ResourceReference? Insurer { get; set; }
    public ResourceReference? Provider { get; set; }
    public ResourceReference? Candidate { get; set; }
    public ResourceReference? Coverage { get; set; }
}

