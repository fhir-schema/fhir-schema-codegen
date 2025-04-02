
namespace Aidbox.FHIR.R4.Core;

public class ConceptMap : DomainResource
{
    public string? Description { get; set; }
    public string? SourceCanonical { get; set; }
    public string? Date { get; set; }
    public string? TargetUri { get; set; }
    public ConceptMapGroup[]? Group { get; set; }
    public string? Publisher { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public string? Purpose { get; set; }
    public string? Name { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public string? Copyright { get; set; }
    public bool? Experimental { get; set; }
    public string? Title { get; set; }
    public string? TargetCanonical { get; set; }
    public string? Status { get; set; }
    public string? SourceUri { get; set; }
    public string? Url { get; set; }
    public Identifier? Identifier { get; set; }
    public string? Version { get; set; }
    public ContactDetail[]? Contact { get; set; }
    
    public class ConceptMapGroupElementTargetDependsOn : BackboneElement
    {
        public string? Property { get; set; }
        public string? System { get; set; }
        public string? Value { get; set; }
        public string? Display { get; set; }
    }
    
    public class ConceptMapGroupElementTarget : BackboneElement
    {
        public string? Code { get; set; }
        public string? Display { get; set; }
        public string? Equivalence { get; set; }
        public string? Comment { get; set; }
        public ConceptMapGroupElementTargetDependsOn[]? DependsOn { get; set; }
        public ConceptMapGroupElementTargetDependsOn[]? Product { get; set; }
    }
    
    public class ConceptMapGroupElement : BackboneElement
    {
        public string? Code { get; set; }
        public string? Display { get; set; }
        public ConceptMapGroupElementTarget[]? Target { get; set; }
    }
    
    public class ConceptMapGroupUnmapped : BackboneElement
    {
        public string? Mode { get; set; }
        public string? Code { get; set; }
        public string? Display { get; set; }
        public string? Url { get; set; }
    }
    
    public class ConceptMapGroup : BackboneElement
    {
        public string? Source { get; set; }
        public string? SourceVersion { get; set; }
        public string? Target { get; set; }
        public string? TargetVersion { get; set; }
        public ConceptMapGroupElement[]? Element { get; set; }
        public ConceptMapGroupUnmapped? Unmapped { get; set; }
    }
    
}

