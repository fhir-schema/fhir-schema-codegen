
namespace Aidbox.FHIR.R4.Core;

public class MessageHeader : DomainResource
{
    public MessageHeaderResponse? Response { get; set; }
    public string? Definition { get; set; }
    public ResourceReference? Enterer { get; set; }
    public MessageHeaderSource? Source { get; set; }
    public ResourceReference? Author { get; set; }
    public CodeableConcept? Reason { get; set; }
    public ResourceReference? Responsible { get; set; }
    public ResourceReference? Sender { get; set; }
    public ResourceReference[]? Focus { get; set; }
    public string? EventUri { get; set; }
    public MessageHeaderDestination[]? Destination { get; set; }
    public Coding? EventCoding { get; set; }
    
    public class MessageHeaderResponse : BackboneElement
    {
        public string? Identifier { get; set; }
        public string? Code { get; set; }
        public ResourceReference? Details { get; set; }
    }
    
    public class MessageHeaderSource : BackboneElement
    {
        public string? Name { get; set; }
        public string? Software { get; set; }
        public string? Version { get; set; }
        public ContactPoint? Contact { get; set; }
        public string? Endpoint { get; set; }
    }
    
    public class MessageHeaderDestination : BackboneElement
    {
        public string? Name { get; set; }
        public ResourceReference? Target { get; set; }
        public string? Endpoint { get; set; }
        public ResourceReference? Receiver { get; set; }
    }
    
}

