
namespace Aidbox.FHIR.R4.Core;

public class Schedule : DomainResource
{
    public Identifier[]? Identifier { get; set; }
    public bool? Active { get; set; }
    public CodeableConcept[]? ServiceCategory { get; set; }
    public CodeableConcept[]? ServiceType { get; set; }
    public CodeableConcept[]? Specialty { get; set; }
    public ResourceReference[]? Actor { get; set; }
    public Period? PlanningHorizon { get; set; }
    public string? Comment { get; set; }
}

