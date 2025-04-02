
namespace Aidbox.FHIR.R4.Core;

public class Provenance : DomainResource
{
    public Signature[]? Signature { get; set; }
    public string? OccurredDateTime { get; set; }
    public string? Recorded { get; set; }
    public ProvenanceAgent[]? Agent { get; set; }
    public string[]? Policy { get; set; }
    public CodeableConcept[]? Reason { get; set; }
    public CodeableConcept? Activity { get; set; }
    public ResourceReference[]? Target { get; set; }
    public ResourceReference? Location { get; set; }
    public ProvenanceEntity[]? Entity { get; set; }
    public Period? OccurredPeriod { get; set; }
    
    public class ProvenanceAgent : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public CodeableConcept[]? Role { get; set; }
        public ResourceReference? Who { get; set; }
        public ResourceReference? OnBehalfOf { get; set; }
    }
    
    public class ProvenanceEntity : BackboneElement
    {
        public string? Role { get; set; }
        public ResourceReference? What { get; set; }
        public ProvenanceAgent[]? Agent { get; set; }
    }
    
}

