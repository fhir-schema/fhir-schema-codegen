
namespace Aidbox.FHIR.R4.Core;

public class SearchParameter : DomainResource
{
    public string? Description { get; set; }
    public string? Date { get; set; }
    public string? Expression { get; set; }
    public string[]? Modifier { get; set; }
    public string? Publisher { get; set; }
    public bool? MultipleAnd { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public string? DerivedFrom { get; set; }
    public string? Purpose { get; set; }
    public bool? MultipleOr { get; set; }
    public string? Name { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public string? Xpath { get; set; }
    public string? XpathUsage { get; set; }
    public string? Type { get; set; }
    public bool? Experimental { get; set; }
    public SearchParameterComponent[]? Component { get; set; }
    public string? Status { get; set; }
    public string[]? Chain { get; set; }
    public string? Url { get; set; }
    public string? Code { get; set; }
    public string[]? Comparator { get; set; }
    public string[]? Target { get; set; }
    public string[]? Base { get; set; }
    public string? Version { get; set; }
    public ContactDetail[]? Contact { get; set; }
    
    public class SearchParameterComponent : BackboneElement
    {
        public string? Definition { get; set; }
        public string? Expression { get; set; }
    }
    
}

