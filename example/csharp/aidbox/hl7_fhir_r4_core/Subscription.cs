
namespace Aidbox.FHIR.R4.Core;

public class Subscription : DomainResource
{
    public string? Status { get; set; }
    public ContactPoint[]? Contact { get; set; }
    public string? End { get; set; }
    public string? Reason { get; set; }
    public string? Criteria { get; set; }
    public string? Error { get; set; }
    public SubscriptionChannel? Channel { get; set; }
    
    public class SubscriptionChannel : BackboneElement
    {
        public string? Type { get; set; }
        public string? Endpoint { get; set; }
        public string? Payload { get; set; }
        public string[]? Header { get; set; }
    }
    
}

