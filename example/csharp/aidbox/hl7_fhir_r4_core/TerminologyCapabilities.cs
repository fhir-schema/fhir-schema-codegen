
namespace Aidbox.FHIR.R4.Core;

public class TerminologyCapabilities : DomainResource
{
    public string? Description { get; set; }
    public string? Date { get; set; }
    public string? Publisher { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public string? Purpose { get; set; }
    public string? Name { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public string? Copyright { get; set; }
    public bool? Experimental { get; set; }
    public TerminologyCapabilitiesExpansion? Expansion { get; set; }
    public string? Title { get; set; }
    public string? Status { get; set; }
    public TerminologyCapabilitiesValidateCode? ValidateCode { get; set; }
    public string? Kind { get; set; }
    public TerminologyCapabilitiesTranslation? Translation { get; set; }
    public string? Url { get; set; }
    public TerminologyCapabilitiesCodeSystem[]? CodeSystem { get; set; }
    public TerminologyCapabilitiesSoftware? Software { get; set; }
    public string? Version { get; set; }
    public ContactDetail[]? Contact { get; set; }
    public TerminologyCapabilitiesImplementation? Implementation { get; set; }
    public string? CodeSearch { get; set; }
    public bool? LockedDate { get; set; }
    public TerminologyCapabilitiesClosure? Closure { get; set; }
    
    public class TerminologyCapabilitiesExpansionParameter : BackboneElement
    {
        public string? Name { get; set; }
        public string? Documentation { get; set; }
    }
    
    public class TerminologyCapabilitiesExpansion : BackboneElement
    {
        public bool? Hierarchical { get; set; }
        public bool? Paging { get; set; }
        public bool? Incomplete { get; set; }
        public TerminologyCapabilitiesExpansionParameter[]? Parameter { get; set; }
        public string? TextFilter { get; set; }
    }
    
    public class TerminologyCapabilitiesValidateCode : BackboneElement
    {
        public bool? Translations { get; set; }
    }
    
    public class TerminologyCapabilitiesTranslation : BackboneElement
    {
        public bool? NeedsMap { get; set; }
    }
    
    public class TerminologyCapabilitiesCodeSystemVersionFilter : BackboneElement
    {
        public string? Code { get; set; }
        public string[]? Op { get; set; }
    }
    
    public class TerminologyCapabilitiesCodeSystemVersion : BackboneElement
    {
        public string? Code { get; set; }
        public bool? IsDefault { get; set; }
        public bool? Compositional { get; set; }
        public string[]? Language { get; set; }
        public TerminologyCapabilitiesCodeSystemVersionFilter[]? Filter { get; set; }
        public string[]? Property { get; set; }
    }
    
    public class TerminologyCapabilitiesCodeSystem : BackboneElement
    {
        public string? Uri { get; set; }
        public TerminologyCapabilitiesCodeSystemVersion[]? Version { get; set; }
        public bool? Subsumption { get; set; }
    }
    
    public class TerminologyCapabilitiesSoftware : BackboneElement
    {
        public string? Name { get; set; }
        public string? Version { get; set; }
    }
    
    public class TerminologyCapabilitiesImplementation : BackboneElement
    {
        public string? Description { get; set; }
        public string? Url { get; set; }
    }
    
    public class TerminologyCapabilitiesClosure : BackboneElement
    {
        public bool? Translation { get; set; }
    }
    
}

