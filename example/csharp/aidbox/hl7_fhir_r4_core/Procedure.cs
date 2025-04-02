
namespace Aidbox.FHIR.R4.Core;

public class Procedure : DomainResource
{
    public CodeableConcept? Category { get; set; }
    public ResourceReference[]? Report { get; set; }
    public CodeableConcept[]? UsedCode { get; set; }
    public ResourceReference[]? UsedReference { get; set; }
    public string[]? InstantiatesCanonical { get; set; }
    public string[]? InstantiatesUri { get; set; }
    public ProcedureFocalDevice[]? FocalDevice { get; set; }
    public ResourceReference? Encounter { get; set; }
    public Age? PerformedAge { get; set; }
    public ResourceReference[]? ComplicationDetail { get; set; }
    public CodeableConcept[]? ReasonCode { get; set; }
    public string? PerformedString { get; set; }
    public CodeableConcept? StatusReason { get; set; }
    public CodeableConcept? Outcome { get; set; }
    public ResourceReference? Asserter { get; set; }
    public Annotation[]? Note { get; set; }
    public Range? PerformedRange { get; set; }
    public CodeableConcept[]? Complication { get; set; }
    public string? Status { get; set; }
    public string? PerformedDateTime { get; set; }
    public ResourceReference? Recorder { get; set; }
    public CodeableConcept? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public CodeableConcept[]? BodySite { get; set; }
    public ResourceReference[]? BasedOn { get; set; }
    public ResourceReference[]? PartOf { get; set; }
    public Period? PerformedPeriod { get; set; }
    public ResourceReference? Location { get; set; }
    public CodeableConcept[]? FollowUp { get; set; }
    public ResourceReference? Subject { get; set; }
    public ProcedurePerformer[]? Performer { get; set; }
    public ResourceReference[]? ReasonReference { get; set; }
    
    public class ProcedureFocalDevice : BackboneElement
    {
        public CodeableConcept? Action { get; set; }
        public ResourceReference? Manipulated { get; set; }
    }
    
    public class ProcedurePerformer : BackboneElement
    {
        public CodeableConcept? Function { get; set; }
        public ResourceReference? Actor { get; set; }
        public ResourceReference? OnBehalfOf { get; set; }
    }
    
}

