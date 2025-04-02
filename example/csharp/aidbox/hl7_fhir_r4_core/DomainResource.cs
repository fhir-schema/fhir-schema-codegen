
namespace Aidbox.FHIR.R4.Core;

public class DomainResource : Resource
{
    public Narrative? Text { get; set; }
    public Resource[]? Contained { get; set; }
    public Extension[]? Extension { get; set; }
    public Extension[]? ModifierExtension { get; set; }
}

