
namespace Aidbox.FHIR.R4.Core;

public class ImplementationGuide : DomainResource
{
    public string? Description { get; set; }
    public ImplementationGuideDefinition? Definition { get; set; }
    public string? Date { get; set; }
    public string? Publisher { get; set; }
    public string[]? FhirVersion { get; set; }
    public string? License { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public ImplementationGuideGlobal[]? Global { get; set; }
    public ImplementationGuideDependsOn[]? DependsOn { get; set; }
    public string? Name { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public string? Copyright { get; set; }
    public bool? Experimental { get; set; }
    public ImplementationGuideManifest? Manifest { get; set; }
    public string? Title { get; set; }
    public string? Status { get; set; }
    public string? Url { get; set; }
    public string? Version { get; set; }
    public string? PackageId { get; set; }
    public ContactDetail[]? Contact { get; set; }
    
    public class ImplementationGuideDefinitionGrouping : BackboneElement
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
    
    public class ImplementationGuideDefinitionResource : BackboneElement
    {
        public ResourceReference? Reference { get; set; }
        public string[]? FhirVersion { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool? ExampleBoolean { get; set; }
        public string? ExampleCanonical { get; set; }
        public string? GroupingId { get; set; }
    }
    
    public class ImplementationGuideDefinitionPage : BackboneElement
    {
        public string? NameUrl { get; set; }
        public ResourceReference? NameReference { get; set; }
        public string? Title { get; set; }
        public string? Generation { get; set; }
        public ImplementationGuideDefinitionPage[]? Page { get; set; }
    }
    
    public class ImplementationGuideDefinitionParameter : BackboneElement
    {
        public string? Code { get; set; }
        public string? Value { get; set; }
    }
    
    public class ImplementationGuideDefinitionTemplate : BackboneElement
    {
        public string? Code { get; set; }
        public string? Source { get; set; }
        public string? Scope { get; set; }
    }
    
    public class ImplementationGuideDefinition : BackboneElement
    {
        public ImplementationGuideDefinitionGrouping[]? Grouping { get; set; }
        public ImplementationGuideDefinitionResource[]? Resource { get; set; }
        public ImplementationGuideDefinitionPage? Page { get; set; }
        public ImplementationGuideDefinitionParameter[]? Parameter { get; set; }
        public ImplementationGuideDefinitionTemplate[]? Template { get; set; }
    }
    
    public class ImplementationGuideGlobal : BackboneElement
    {
        public string? Type { get; set; }
        public string? Profile { get; set; }
    }
    
    public class ImplementationGuideDependsOn : BackboneElement
    {
        public string? Uri { get; set; }
        public string? PackageId { get; set; }
        public string? Version { get; set; }
    }
    
    public class ImplementationGuideManifestResource : BackboneElement
    {
        public ResourceReference? Reference { get; set; }
        public bool? ExampleBoolean { get; set; }
        public string? ExampleCanonical { get; set; }
        public string? RelativePath { get; set; }
    }
    
    public class ImplementationGuideManifestPage : BackboneElement
    {
        public string? Name { get; set; }
        public string? Title { get; set; }
        public string[]? Anchor { get; set; }
    }
    
    public class ImplementationGuideManifest : BackboneElement
    {
        public string? Rendering { get; set; }
        public ImplementationGuideManifestResource[]? Resource { get; set; }
        public ImplementationGuideManifestPage[]? Page { get; set; }
        public string[]? Image { get; set; }
        public string[]? Other { get; set; }
    }
    
}

