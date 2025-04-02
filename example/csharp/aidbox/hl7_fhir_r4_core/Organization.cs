
namespace Aidbox.FHIR.R4.Core;

public class Organization : DomainResource
{
    public Address[]? Address { get; set; }
    public string? Name { get; set; }
    public CodeableConcept[]? Type { get; set; }
    public string[]? Alias { get; set; }
    public bool? Active { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ContactPoint[]? Telecom { get; set; }
    public ResourceReference? PartOf { get; set; }
    public ResourceReference[]? Endpoint { get; set; }
    public OrganizationContact[]? Contact { get; set; }
    
    public class OrganizationContact : BackboneElement
    {
        public CodeableConcept? Purpose { get; set; }
        public HumanName? Name { get; set; }
        public ContactPoint[]? Telecom { get; set; }
        public Address? Address { get; set; }
    }
    
}

