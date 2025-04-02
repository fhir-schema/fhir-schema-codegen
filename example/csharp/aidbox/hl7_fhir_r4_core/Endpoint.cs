
namespace Aidbox.FHIR.R4.Core;

public class Endpoint : DomainResource
{
    public Coding? ConnectionType { get; set; }
    public string? Address { get; set; }
    public ResourceReference? ManagingOrganization { get; set; }
    public string? Name { get; set; }
    public string[]? PayloadMimeType { get; set; }
    public CodeableConcept[]? PayloadType { get; set; }
    public string[]? Header { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public Period? Period { get; set; }
    public ContactPoint[]? Contact { get; set; }
}

