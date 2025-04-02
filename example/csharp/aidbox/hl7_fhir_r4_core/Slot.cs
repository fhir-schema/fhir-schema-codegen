
namespace Aidbox.FHIR.R4.Core;

public class Slot : DomainResource
{
    public ResourceReference? Schedule { get; set; }
    public CodeableConcept[]? ServiceCategory { get; set; }
    public CodeableConcept[]? Specialty { get; set; }
    public string? Start { get; set; }
    public CodeableConcept[]? ServiceType { get; set; }
    public CodeableConcept? AppointmentType { get; set; }
    public string? Status { get; set; }
    public string? Comment { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? End { get; set; }
    public bool? Overbooked { get; set; }
}

