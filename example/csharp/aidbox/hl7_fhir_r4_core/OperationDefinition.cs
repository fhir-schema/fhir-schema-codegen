
namespace Aidbox.FHIR.R4.Core;

public class OperationDefinition : DomainResource
{
    public string? Description { get; set; }
    public string? Date { get; set; }
    public bool? System { get; set; }
    public string? Publisher { get; set; }
    public bool? Instance { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public string? Purpose { get; set; }
    public string? Name { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public bool? Type { get; set; }
    public OperationDefinitionOverload[]? Overload { get; set; }
    public bool? Experimental { get; set; }
    public string? OutputProfile { get; set; }
    public string? Title { get; set; }
    public string? Status { get; set; }
    public string[]? Resource { get; set; }
    public bool? AffectsState { get; set; }
    public string? Kind { get; set; }
    public string? Comment { get; set; }
    public string? Url { get; set; }
    public string? Code { get; set; }
    public string? Base { get; set; }
    public string? Version { get; set; }
    public ContactDetail[]? Contact { get; set; }
    public string? InputProfile { get; set; }
    public OperationDefinitionParameter[]? Parameter { get; set; }
    
    public class OperationDefinitionOverload : BackboneElement
    {
        public string[]? ParameterName { get; set; }
        public string? Comment { get; set; }
    }
    
    public class OperationDefinitionParameterReferencedFrom : BackboneElement
    {
        public string? Source { get; set; }
        public string? SourceId { get; set; }
    }
    
    public class OperationDefinitionParameterBinding : BackboneElement
    {
        public string? Strength { get; set; }
        public string? ValueSet { get; set; }
    }
    
    public class OperationDefinitionParameter : BackboneElement
    {
        public int? Min { get; set; }
        public string? SearchType { get; set; }
        public string? Use { get; set; }
        public string? Name { get; set; }
        public OperationDefinitionParameter[]? Part { get; set; }
        public string? Type { get; set; }
        public OperationDefinitionParameterReferencedFrom[]? ReferencedFrom { get; set; }
        public string? Documentation { get; set; }
        public OperationDefinitionParameterBinding? Binding { get; set; }
        public string? Max { get; set; }
        public string[]? TargetProfile { get; set; }
    }
    
}

