
namespace Aidbox.FHIR.R4.Core;

public class RelatedPerson : DomainResource
{
    public ResourceReference? Patient { get; set; }
    public Address[]? Address { get; set; }
    public HumanName[]? Name { get; set; }
    public string? BirthDate { get; set; }
    public CodeableConcept[]? Relationship { get; set; }
    public Attachment[]? Photo { get; set; }
    public bool? Active { get; set; }
    public RelatedPersonCommunication[]? Communication { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ContactPoint[]? Telecom { get; set; }
    public string? Gender { get; set; }
    public Period? Period { get; set; }
    
    public class RelatedPersonCommunication : BackboneElement
    {
        public CodeableConcept? Language { get; set; }
        public bool? Preferred { get; set; }
    }
    
}

