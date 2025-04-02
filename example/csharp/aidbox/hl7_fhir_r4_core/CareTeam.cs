
namespace Aidbox.FHIR.R4.Core;

public class CareTeam : DomainResource
{
    public CodeableConcept[]? Category { get; set; }
    public ResourceReference[]? ManagingOrganization { get; set; }
    public ResourceReference? Encounter { get; set; }
    public string? Name { get; set; }
    public CodeableConcept[]? ReasonCode { get; set; }
    public CareTeamParticipant[]? Participant { get; set; }
    public Annotation[]? Note { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ContactPoint[]? Telecom { get; set; }
    public Period? Period { get; set; }
    public ResourceReference? Subject { get; set; }
    public ResourceReference[]? ReasonReference { get; set; }
    
    public class CareTeamParticipant : BackboneElement
    {
        public CodeableConcept[]? Role { get; set; }
        public ResourceReference? Member { get; set; }
        public ResourceReference? OnBehalfOf { get; set; }
        public Period? Period { get; set; }
    }
    
}

