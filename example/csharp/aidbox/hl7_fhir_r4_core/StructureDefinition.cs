
namespace Aidbox.FHIR.R4.Core;

public class StructureDefinition : DomainResource
{
    public string? Description { get; set; }
    public string? Date { get; set; }
    public string? Derivation { get; set; }
    public string? Publisher { get; set; }
    public string[]? ContextInvariant { get; set; }
    public string? FhirVersion { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public string? Purpose { get; set; }
    public string? Name { get; set; }
    public StructureDefinitionMapping[]? Mapping { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public bool? Abstract { get; set; }
    public string? Copyright { get; set; }
    public string? Type { get; set; }
    public bool? Experimental { get; set; }
    public string? Title { get; set; }
    public StructureDefinitionSnapshot? Snapshot { get; set; }
    public Coding[]? Keyword { get; set; }
    public string? Status { get; set; }
    public string? Kind { get; set; }
    public string? Url { get; set; }
    public Identifier[]? Identifier { get; set; }
    public StructureDefinitionContext[]? Context { get; set; }
    public string? Version { get; set; }
    public StructureDefinitionDifferential? Differential { get; set; }
    public ContactDetail[]? Contact { get; set; }
    public string? BaseDefinition { get; set; }
    
    public class StructureDefinitionMapping : BackboneElement
    {
        public string? Identity { get; set; }
        public string? Uri { get; set; }
        public string? Name { get; set; }
        public string? Comment { get; set; }
    }
    
    public class StructureDefinitionSnapshot : BackboneElement
    {
        public ElementDefinition[]? Element { get; set; }
    }
    
    public class StructureDefinitionContext : BackboneElement
    {
        public string? Type { get; set; }
        public string? Expression { get; set; }
    }
    
    public class StructureDefinitionDifferential : BackboneElement
    {
        public ElementDefinition[]? Element { get; set; }
    }
    
}

