
namespace Aidbox.FHIR.R4.Core;

public class OrganizationAffiliation : DomainResource
{
    public CodeableConcept[]? Specialty { get; set; }
    public ResourceReference? Organization { get; set; }
    public ResourceReference? ParticipatingOrganization { get; set; }
    public bool? Active { get; set; }
    public CodeableConcept[]? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ContactPoint[]? Telecom { get; set; }
    public ResourceReference[]? Network { get; set; }
    public Period? Period { get; set; }
    public ResourceReference[]? Location { get; set; }
    public ResourceReference[]? Endpoint { get; set; }
    public ResourceReference[]? HealthcareService { get; set; }
}

