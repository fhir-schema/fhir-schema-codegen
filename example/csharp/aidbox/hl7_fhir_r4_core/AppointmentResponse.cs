
namespace Aidbox.FHIR.R4.Core;

public class AppointmentResponse : DomainResource
{
    public Identifier[]? Identifier { get; set; }
    public ResourceReference? Appointment { get; set; }
    public string? Start { get; set; }
    public string? End { get; set; }
    public CodeableConcept[]? ParticipantType { get; set; }
    public ResourceReference? Actor { get; set; }
    public string? ParticipantStatus { get; set; }
    public string? Comment { get; set; }
}

