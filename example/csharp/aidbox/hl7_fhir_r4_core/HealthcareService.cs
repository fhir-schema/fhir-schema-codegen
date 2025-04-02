
namespace Aidbox.FHIR.R4.Core;

public class HealthcareService : DomainResource
{
    public ResourceReference[]? CoverageArea { get; set; }
    public CodeableConcept[]? Category { get; set; }
    public HealthcareServiceAvailableTime[]? AvailableTime { get; set; }
    public CodeableConcept[]? Specialty { get; set; }
    public string? Name { get; set; }
    public HealthcareServiceNotAvailable[]? NotAvailable { get; set; }
    public ResourceReference? ProvidedBy { get; set; }
    public CodeableConcept[]? Type { get; set; }
    public HealthcareServiceEligibility[]? Eligibility { get; set; }
    public string? ExtraDetails { get; set; }
    public CodeableConcept[]? Characteristic { get; set; }
    public Attachment? Photo { get; set; }
    public bool? Active { get; set; }
    public CodeableConcept[]? Communication { get; set; }
    public string? Comment { get; set; }
    public Identifier[]? Identifier { get; set; }
    public CodeableConcept[]? ServiceProvisionCode { get; set; }
    public string? AvailabilityExceptions { get; set; }
    public bool? AppointmentRequired { get; set; }
    public CodeableConcept[]? ReferralMethod { get; set; }
    public ContactPoint[]? Telecom { get; set; }
    public ResourceReference[]? Location { get; set; }
    public CodeableConcept[]? Program { get; set; }
    public ResourceReference[]? Endpoint { get; set; }
    
    public class HealthcareServiceAvailableTime : BackboneElement
    {
        public string[]? DaysOfWeek { get; set; }
        public bool? AllDay { get; set; }
        public string? AvailableStartTime { get; set; }
        public string? AvailableEndTime { get; set; }
    }
    
    public class HealthcareServiceNotAvailable : BackboneElement
    {
        public string? Description { get; set; }
        public Period? During { get; set; }
    }
    
    public class HealthcareServiceEligibility : BackboneElement
    {
        public CodeableConcept? Code { get; set; }
        public string? Comment { get; set; }
    }
    
}

