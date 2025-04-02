
namespace Aidbox.FHIR.R4.Core;

public class Linkage : DomainResource
{
    public bool? Active { get; set; }
    public ResourceReference? Author { get; set; }
    public LinkageItem[]? Item { get; set; }
    
    public class LinkageItem : BackboneElement
    {
        public string? Type { get; set; }
        public ResourceReference? Resource { get; set; }
    }
    
}

