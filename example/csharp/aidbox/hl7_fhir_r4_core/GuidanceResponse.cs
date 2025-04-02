
namespace Aidbox.FHIR.R4.Core;

public class GuidanceResponse : DomainResource
{
    public DataRequirement[]? DataRequirement { get; set; }
    public string? ModuleCanonical { get; set; }
    public ResourceReference? Encounter { get; set; }
    public CodeableConcept[]? ReasonCode { get; set; }
    public ResourceReference? OutputParameters { get; set; }
    public ResourceReference[]? EvaluationMessage { get; set; }
    public Identifier? RequestIdentifier { get; set; }
    public Annotation[]? Note { get; set; }
    public string? Status { get; set; }
    public ResourceReference? Result { get; set; }
    public Identifier[]? Identifier { get; set; }
    public CodeableConcept? ModuleCodeableConcept { get; set; }
    public string? ModuleUri { get; set; }
    public string? OccurrenceDateTime { get; set; }
    public ResourceReference? Subject { get; set; }
    public ResourceReference? Performer { get; set; }
    public ResourceReference[]? ReasonReference { get; set; }
}

