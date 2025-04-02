
namespace Aidbox.FHIR.R4.Core;

public class Practitioner : DomainResource
{
    public Address[]? Address { get; set; }
    public HumanName[]? Name { get; set; }
    public string? BirthDate { get; set; }
    public Attachment[]? Photo { get; set; }
    public bool? Active { get; set; }
    public CodeableConcept[]? Communication { get; set; }
    public Identifier[]? Identifier { get; set; }
    public PractitionerQualification[]? Qualification { get; set; }
    public ContactPoint[]? Telecom { get; set; }
    public string? Gender { get; set; }
    
    public class PractitionerQualification : BackboneElement
    {
        public Identifier[]? Identifier { get; set; }
        public CodeableConcept? Code { get; set; }
        public Period? Period { get; set; }
        public ResourceReference? Issuer { get; set; }
    }
    
}

