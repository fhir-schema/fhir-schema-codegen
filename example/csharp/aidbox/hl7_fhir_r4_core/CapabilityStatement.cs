
namespace Aidbox.FHIR.R4.Core;

public class CapabilityStatement : DomainResource
{
    public string? Description { get; set; }
    public string[]? Format { get; set; }
    public string? Date { get; set; }
    public string? Publisher { get; set; }
    public string[]? PatchFormat { get; set; }
    public string? FhirVersion { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public string[]? Instantiates { get; set; }
    public string? Purpose { get; set; }
    public string? Name { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public string? Copyright { get; set; }
    public bool? Experimental { get; set; }
    public string[]? Imports { get; set; }
    public string? Title { get; set; }
    public CapabilityStatementDocument[]? Document { get; set; }
    public string? Status { get; set; }
    public CapabilityStatementMessaging[]? Messaging { get; set; }
    public string? Kind { get; set; }
    public string[]? ImplementationGuide { get; set; }
    public string? Url { get; set; }
    public CapabilityStatementSoftware? Software { get; set; }
    public string? Version { get; set; }
    public ContactDetail[]? Contact { get; set; }
    public CapabilityStatementImplementation? Implementation { get; set; }
    public CapabilityStatementRest[]? Rest { get; set; }
    
    public class CapabilityStatementDocument : BackboneElement
    {
        public string? Mode { get; set; }
        public string? Documentation { get; set; }
        public string? Profile { get; set; }
    }
    
    public class CapabilityStatementMessagingEndpoint : BackboneElement
    {
        public Coding? Protocol { get; set; }
        public string? Address { get; set; }
    }
    
    public class CapabilityStatementMessagingSupportedMessage : BackboneElement
    {
        public string? Mode { get; set; }
        public string? Definition { get; set; }
    }
    
    public class CapabilityStatementMessaging : BackboneElement
    {
        public CapabilityStatementMessagingEndpoint[]? Endpoint { get; set; }
        public long? ReliableCache { get; set; }
        public string? Documentation { get; set; }
        public CapabilityStatementMessagingSupportedMessage[]? SupportedMessage { get; set; }
    }
    
    public class CapabilityStatementSoftware : BackboneElement
    {
        public string? Name { get; set; }
        public string? Version { get; set; }
        public string? ReleaseDate { get; set; }
    }
    
    public class CapabilityStatementImplementation : BackboneElement
    {
        public string? Description { get; set; }
        public string? Url { get; set; }
        public ResourceReference? Custodian { get; set; }
    }
    
    public class CapabilityStatementRestSecurity : BackboneElement
    {
        public bool? Cors { get; set; }
        public CodeableConcept[]? Service { get; set; }
        public string? Description { get; set; }
    }
    
    public class CapabilityStatementRestResourceSearchParam : BackboneElement
    {
        public string? Name { get; set; }
        public string? Definition { get; set; }
        public string? Type { get; set; }
        public string? Documentation { get; set; }
    }
    
    public class CapabilityStatementRestResourceOperation : BackboneElement
    {
        public string? Name { get; set; }
        public string? Definition { get; set; }
        public string? Documentation { get; set; }
    }
    
    public class CapabilityStatementRestResourceInteraction : BackboneElement
    {
        public string? Code { get; set; }
        public string? Documentation { get; set; }
    }
    
    public class CapabilityStatementRestResource : BackboneElement
    {
        public string[]? SearchRevInclude { get; set; }
        public CapabilityStatementRestResourceSearchParam[]? SearchParam { get; set; }
        public bool? ConditionalUpdate { get; set; }
        public string? ConditionalRead { get; set; }
        public CapabilityStatementRestResourceOperation[]? Operation { get; set; }
        public string[]? ReferencePolicy { get; set; }
        public bool? ReadHistory { get; set; }
        public string? Type { get; set; }
        public CapabilityStatementRestResourceInteraction[]? Interaction { get; set; }
        public string? Documentation { get; set; }
        public bool? UpdateCreate { get; set; }
        public bool? ConditionalCreate { get; set; }
        public string[]? SupportedProfile { get; set; }
        public string[]? SearchInclude { get; set; }
        public string? Versioning { get; set; }
        public string? Profile { get; set; }
        public string? ConditionalDelete { get; set; }
    }
    
    public class CapabilityStatementRestInteraction : BackboneElement
    {
        public string? Code { get; set; }
        public string? Documentation { get; set; }
    }
    
    public class CapabilityStatementRest : BackboneElement
    {
        public string? Mode { get; set; }
        public string? Documentation { get; set; }
        public CapabilityStatementRestSecurity? Security { get; set; }
        public CapabilityStatementRestResource[]? Resource { get; set; }
        public CapabilityStatementRestInteraction[]? Interaction { get; set; }
        public CapabilityStatementRestResourceSearchParam[]? SearchParam { get; set; }
        public CapabilityStatementRestResourceOperation[]? Operation { get; set; }
        public string[]? Compartment { get; set; }
    }
    
}

