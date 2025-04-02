
namespace Aidbox.FHIR.R4.Core;

public class GraphDefinition : DomainResource
{
    public string? Description { get; set; }
    public string? Date { get; set; }
    public string? Publisher { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public string? Purpose { get; set; }
    public string? Name { get; set; }
    public string? Start { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public bool? Experimental { get; set; }
    public string? Status { get; set; }
    public GraphDefinitionLink[]? Link { get; set; }
    public string? Url { get; set; }
    public string? Version { get; set; }
    public ContactDetail[]? Contact { get; set; }
    public string? Profile { get; set; }
    
    public class GraphDefinitionLinkTargetCompartment : BackboneElement
    {
        public string? Use { get; set; }
        public string? Code { get; set; }
        public string? Rule { get; set; }
        public string? Expression { get; set; }
        public string? Description { get; set; }
    }
    
    public class GraphDefinitionLinkTarget : BackboneElement
    {
        public string? Type { get; set; }
        public string? Params { get; set; }
        public string? Profile { get; set; }
        public GraphDefinitionLinkTargetCompartment[]? Compartment { get; set; }
        public GraphDefinitionLink[]? Link { get; set; }
    }
    
    public class GraphDefinitionLink : BackboneElement
    {
        public string? Path { get; set; }
        public string? SliceName { get; set; }
        public int? Min { get; set; }
        public string? Max { get; set; }
        public string? Description { get; set; }
        public GraphDefinitionLinkTarget[]? Target { get; set; }
    }
    
}

