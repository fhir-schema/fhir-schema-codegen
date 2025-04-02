
namespace Aidbox.FHIR.R4.Core;

public class EnrollmentResponse : DomainResource
{
    public Identifier[]? Identifier { get; set; }
    public string? Status { get; set; }
    public ResourceReference? Request { get; set; }
    public string? Outcome { get; set; }
    public string? Disposition { get; set; }
    public string? Created { get; set; }
    public ResourceReference? Organization { get; set; }
    public ResourceReference? RequestProvider { get; set; }
}

