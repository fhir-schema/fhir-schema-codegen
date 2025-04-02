
namespace Aidbox.FHIR.R4.Core;

public class Patient : DomainResource
{
    public bool? MultipleBirthBoolean { get; set; }
    public Address[]? Address { get; set; }
    public string? DeceasedDateTime { get; set; }
    public ResourceReference? ManagingOrganization { get; set; }
    public bool? DeceasedBoolean { get; set; }
    public HumanName[]? Name { get; set; }
    public string? BirthDate { get; set; }
    public int? MultipleBirthInteger { get; set; }
    public Attachment[]? Photo { get; set; }
    public PatientLink[]? Link { get; set; }
    public bool? Active { get; set; }
    public PatientCommunication[]? Communication { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ContactPoint[]? Telecom { get; set; }
    public ResourceReference[]? GeneralPractitioner { get; set; }
    public string? Gender { get; set; }
    public CodeableConcept? MaritalStatus { get; set; }
    public PatientContact[]? Contact { get; set; }
    
    public class PatientLink : BackboneElement
    {
        public ResourceReference? Other { get; set; }
        public string? Type { get; set; }
    }
    
    public class PatientCommunication : BackboneElement
    {
        public CodeableConcept? Language { get; set; }
        public bool? Preferred { get; set; }
    }
    
    public class PatientContact : BackboneElement
    {
        public CodeableConcept[]? Relationship { get; set; }
        public HumanName? Name { get; set; }
        public ContactPoint[]? Telecom { get; set; }
        public Address? Address { get; set; }
        public string? Gender { get; set; }
        public ResourceReference? Organization { get; set; }
        public Period? Period { get; set; }
    }
    
}

