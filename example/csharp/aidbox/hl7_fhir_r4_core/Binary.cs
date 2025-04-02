
namespace Aidbox.FHIR.R4.Core;

public class Binary : Resource
{
    public string? ContentType { get; set; }
    public ResourceReference? SecurityContext { get; set; }
    public string? Data { get; set; }
}

