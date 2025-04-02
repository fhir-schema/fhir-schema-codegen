
namespace Aidbox.FHIR.R4.Core;

public class Person : DomainResource
{
    public Address[]? Address { get; set; }
    public ResourceReference? ManagingOrganization { get; set; }
    public HumanName[]? Name { get; set; }
    public string? BirthDate { get; set; }
    public Attachment? Photo { get; set; }
    public PersonLink[]? Link { get; set; }
    public bool? Active { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ContactPoint[]? Telecom { get; set; }
    public string? Gender { get; set; }
    
    public class PersonLink : BackboneElement
    {
        public ResourceReference? Target { get; set; }
        public string? Assurance { get; set; }
    }
    
}

