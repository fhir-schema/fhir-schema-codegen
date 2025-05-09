
namespace Aidbox.FHIR.R4.Core;

public class PractitionerRole : DomainResource
{
    public PractitionerRoleAvailableTime[]? AvailableTime { get; set; }
    public CodeableConcept[]? Specialty { get; set; }
    public PractitionerRoleNotAvailable[]? NotAvailable { get; set; }
    public ResourceReference? Organization { get; set; }
    public bool? Active { get; set; }
    public CodeableConcept[]? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? AvailabilityExceptions { get; set; }
    public ResourceReference? Practitioner { get; set; }
    public ContactPoint[]? Telecom { get; set; }
    public Period? Period { get; set; }
    public ResourceReference[]? Location { get; set; }
    public ResourceReference[]? Endpoint { get; set; }
    public ResourceReference[]? HealthcareService { get; set; }
    
    public class PractitionerRoleAvailableTime : BackboneElement
    {
        public string[]? DaysOfWeek { get; set; }
        public bool? AllDay { get; set; }
        public string? AvailableStartTime { get; set; }
        public string? AvailableEndTime { get; set; }
    }
    
    public class PractitionerRoleNotAvailable : BackboneElement
    {
        public string? Description { get; set; }
        public Period? During { get; set; }
    }
    
}

