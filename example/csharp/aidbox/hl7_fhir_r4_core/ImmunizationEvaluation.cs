
namespace Aidbox.FHIR.R4.Core;

public class ImmunizationEvaluation : DomainResource
{
    public ResourceReference? Patient { get; set; }
    public string? Description { get; set; }
    public long? SeriesDosesPositiveInt { get; set; }
    public string? Date { get; set; }
    public long? DoseNumberPositiveInt { get; set; }
    public string? Series { get; set; }
    public ResourceReference? Authority { get; set; }
    public string? DoseNumberString { get; set; }
    public string? SeriesDosesString { get; set; }
    public CodeableConcept[]? DoseStatusReason { get; set; }
    public ResourceReference? ImmunizationEvent { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public CodeableConcept? TargetDisease { get; set; }
    public CodeableConcept? DoseStatus { get; set; }
}

