
namespace Aidbox.FHIR.R4.Core;

public class MessageDefinition : DomainResource
{
    public string? Description { get; set; }
    public string? Category { get; set; }
    public string? Date { get; set; }
    public string? Publisher { get; set; }
    public string[]? Parent { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public string? Purpose { get; set; }
    public string? Name { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public string? Copyright { get; set; }
    public bool? Experimental { get; set; }
    public string? Title { get; set; }
    public string? Status { get; set; }
    public MessageDefinitionAllowedResponse[]? AllowedResponse { get; set; }
    public string[]? Graph { get; set; }
    public string? Url { get; set; }
    public Identifier[]? Identifier { get; set; }
    public MessageDefinitionFocus[]? Focus { get; set; }
    public string[]? Replaces { get; set; }
    public string? ResponseRequired { get; set; }
    public string? Base { get; set; }
    public string? Version { get; set; }
    public ContactDetail[]? Contact { get; set; }
    public string? EventUri { get; set; }
    public Coding? EventCoding { get; set; }
    
    public class MessageDefinitionAllowedResponse : BackboneElement
    {
        public string? Message { get; set; }
        public string? Situation { get; set; }
    }
    
    public class MessageDefinitionFocus : BackboneElement
    {
        public string? Code { get; set; }
        public string? Profile { get; set; }
        public long? Min { get; set; }
        public string? Max { get; set; }
    }
    
}

