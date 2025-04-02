
namespace Aidbox.FHIR.R4.Core;

public class ValueSet : DomainResource
{
    public string? Description { get; set; }
    public ValueSetCompose? Compose { get; set; }
    public string? Date { get; set; }
    public string? Publisher { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public string? Purpose { get; set; }
    public string? Name { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public string? Copyright { get; set; }
    public bool? Experimental { get; set; }
    public ValueSetExpansion? Expansion { get; set; }
    public string? Title { get; set; }
    public string? Status { get; set; }
    public string? Url { get; set; }
    public Identifier[]? Identifier { get; set; }
    public bool? Immutable { get; set; }
    public string? Version { get; set; }
    public ContactDetail[]? Contact { get; set; }
    
    public class ValueSetComposeIncludeConceptDesignation : BackboneElement
    {
        public string? Language { get; set; }
        public Coding? Use { get; set; }
        public string? Value { get; set; }
    }
    
    public class ValueSetComposeIncludeConcept : BackboneElement
    {
        public string? Code { get; set; }
        public string? Display { get; set; }
        public ValueSetComposeIncludeConceptDesignation[]? Designation { get; set; }
    }
    
    public class ValueSetComposeIncludeFilter : BackboneElement
    {
        public string? Property { get; set; }
        public string? Op { get; set; }
        public string? Value { get; set; }
    }
    
    public class ValueSetComposeInclude : BackboneElement
    {
        public string? System { get; set; }
        public string? Version { get; set; }
        public ValueSetComposeIncludeConcept[]? Concept { get; set; }
        public ValueSetComposeIncludeFilter[]? Filter { get; set; }
        public string[]? ValueSet { get; set; }
    }
    
    public class ValueSetCompose : BackboneElement
    {
        public string? LockedDate { get; set; }
        public bool? Inactive { get; set; }
        public ValueSetComposeInclude[]? Include { get; set; }
        public ValueSetComposeInclude[]? Exclude { get; set; }
    }
    
    public class ValueSetExpansionParameter : BackboneElement
    {
        public string? ValueCode { get; set; }
        public string? ValueUri { get; set; }
        public decimal? ValueDecimal { get; set; }
        public string? Name { get; set; }
        public string? ValueString { get; set; }
        public bool? ValueBoolean { get; set; }
        public string? ValueDateTime { get; set; }
        public int? ValueInteger { get; set; }
    }
    
    public class ValueSetExpansionContains : BackboneElement
    {
        public string? System { get; set; }
        public bool? Abstract { get; set; }
        public bool? Inactive { get; set; }
        public string? Version { get; set; }
        public string? Code { get; set; }
        public string? Display { get; set; }
        public ValueSetComposeIncludeConceptDesignation[]? Designation { get; set; }
        public ValueSetExpansionContains[]? Contains { get; set; }
    }
    
    public class ValueSetExpansion : BackboneElement
    {
        public string? Identifier { get; set; }
        public string? Timestamp { get; set; }
        public int? Total { get; set; }
        public int? Offset { get; set; }
        public ValueSetExpansionParameter[]? Parameter { get; set; }
        public ValueSetExpansionContains[]? Contains { get; set; }
    }
    
}

