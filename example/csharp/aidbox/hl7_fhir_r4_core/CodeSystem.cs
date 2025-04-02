
namespace Aidbox.FHIR.R4.Core;

public class CodeSystem : DomainResource
{
    public string? Description { get; set; }
    public string? Date { get; set; }
    public bool? VersionNeeded { get; set; }
    public string? Publisher { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public string? Purpose { get; set; }
    public string? Content { get; set; }
    public CodeSystemProperty[]? Property { get; set; }
    public string? Name { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public string? Copyright { get; set; }
    public bool? Experimental { get; set; }
    public string? Title { get; set; }
    public CodeSystemFilter[]? Filter { get; set; }
    public string? Supplements { get; set; }
    public bool? Compositional { get; set; }
    public string? Status { get; set; }
    public string? HierarchyMeaning { get; set; }
    public string? ValueSet { get; set; }
    public long? Count { get; set; }
    public string? Url { get; set; }
    public Identifier[]? Identifier { get; set; }
    public CodeSystemConcept[]? Concept { get; set; }
    public bool? CaseSensitive { get; set; }
    public string? Version { get; set; }
    public ContactDetail[]? Contact { get; set; }
    
    public class CodeSystemProperty : BackboneElement
    {
        public string? Code { get; set; }
        public string? Uri { get; set; }
        public string? Description { get; set; }
        public string? Type { get; set; }
    }
    
    public class CodeSystemFilter : BackboneElement
    {
        public string? Code { get; set; }
        public string? Description { get; set; }
        public string[]? Operator { get; set; }
        public string? Value { get; set; }
    }
    
    public class CodeSystemConceptDesignation : BackboneElement
    {
        public string? Language { get; set; }
        public Coding? Use { get; set; }
        public string? Value { get; set; }
    }
    
    public class CodeSystemConceptProperty : BackboneElement
    {
        public string? ValueCode { get; set; }
        public decimal? ValueDecimal { get; set; }
        public string? ValueString { get; set; }
        public bool? ValueBoolean { get; set; }
        public string? ValueDateTime { get; set; }
        public Coding? ValueCoding { get; set; }
        public string? Code { get; set; }
        public int? ValueInteger { get; set; }
    }
    
    public class CodeSystemConcept : BackboneElement
    {
        public string? Code { get; set; }
        public string? Display { get; set; }
        public string? Definition { get; set; }
        public CodeSystemConceptDesignation[]? Designation { get; set; }
        public CodeSystemConceptProperty[]? Property { get; set; }
        public CodeSystemConcept[]? Concept { get; set; }
    }
    
}

