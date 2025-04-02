
namespace Aidbox.FHIR.R4.Core;

public class EpisodeOfCare : DomainResource
{
    public ResourceReference? Patient { get; set; }
    public EpisodeOfCareDiagnosis[]? Diagnosis { get; set; }
    public ResourceReference? ManagingOrganization { get; set; }
    public CodeableConcept[]? Type { get; set; }
    public ResourceReference[]? Account { get; set; }
    public ResourceReference[]? ReferralRequest { get; set; }
    public ResourceReference[]? Team { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public Period? Period { get; set; }
    public ResourceReference? CareManager { get; set; }
    public EpisodeOfCareStatusHistory[]? StatusHistory { get; set; }
    
    public class EpisodeOfCareDiagnosis : BackboneElement
    {
        public ResourceReference? Condition { get; set; }
        public CodeableConcept? Role { get; set; }
        public long? Rank { get; set; }
    }
    
    public class EpisodeOfCareStatusHistory : BackboneElement
    {
        public string? Status { get; set; }
        public Period? Period { get; set; }
    }
    
}

