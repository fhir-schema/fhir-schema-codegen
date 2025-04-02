
namespace Aidbox.FHIR.R4.Core;

public class CompartmentDefinition : DomainResource
{
    public string? Description { get; set; }
    public string? Date { get; set; }
    public string? Publisher { get; set; }
    public string? Purpose { get; set; }
    public string? Name { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public bool? Experimental { get; set; }
    public bool? Search { get; set; }
    public string? Status { get; set; }
    public CompartmentDefinitionResource[]? Resource { get; set; }
    public string? Url { get; set; }
    public string? Code { get; set; }
    public string? Version { get; set; }
    public ContactDetail[]? Contact { get; set; }
    
    public class CompartmentDefinitionResource : BackboneElement
    {
        public string? Code { get; set; }
        public string[]? Param { get; set; }
        public string? Documentation { get; set; }
    }
    
}

