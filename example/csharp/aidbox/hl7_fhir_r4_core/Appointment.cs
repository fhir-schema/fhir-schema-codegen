
namespace Aidbox.FHIR.R4.Core;

public class Appointment : DomainResource
{
    public string? Description { get; set; }
    public CodeableConcept[]? ServiceCategory { get; set; }
    public ResourceReference[]? Slot { get; set; }
    public CodeableConcept[]? Specialty { get; set; }
    public CodeableConcept? CancelationReason { get; set; }
    public Period[]? RequestedPeriod { get; set; }
    public string? PatientInstruction { get; set; }
    public string? Start { get; set; }
    public CodeableConcept[]? ReasonCode { get; set; }
    public string? Created { get; set; }
    public AppointmentParticipant[]? Participant { get; set; }
    public CodeableConcept[]? ServiceType { get; set; }
    public ResourceReference[]? SupportingInformation { get; set; }
    public long? Priority { get; set; }
    public CodeableConcept? AppointmentType { get; set; }
    public string? Status { get; set; }
    public string? Comment { get; set; }
    public long? MinutesDuration { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference[]? BasedOn { get; set; }
    public string? End { get; set; }
    public ResourceReference[]? ReasonReference { get; set; }
    
    public class AppointmentParticipant : BackboneElement
    {
        public CodeableConcept[]? Type { get; set; }
        public ResourceReference? Actor { get; set; }
        public string? Required { get; set; }
        public string? Status { get; set; }
        public Period? Period { get; set; }
    }
    
}

