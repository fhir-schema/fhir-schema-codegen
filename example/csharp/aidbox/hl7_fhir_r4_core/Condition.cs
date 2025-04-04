
namespace Aidbox.FHIR.R4.Core;

public class Condition : DomainResource
{
    public CodeableConcept[]? Category { get; set; }
    public CodeableConcept? ClinicalStatus { get; set; }
    public Age? AbatementAge { get; set; }
    public Range? OnsetRange { get; set; }
    public Age? OnsetAge { get; set; }
    public ConditionStage[]? Stage { get; set; }
    public ResourceReference? Encounter { get; set; }
    public ConditionEvidence[]? Evidence { get; set; }
    public Period? OnsetPeriod { get; set; }
    public Period? AbatementPeriod { get; set; }
    public ResourceReference? Asserter { get; set; }
    public Annotation[]? Note { get; set; }
    public string? AbatementString { get; set; }
    public Range? AbatementRange { get; set; }
    public string? RecordedDate { get; set; }
    public string? OnsetString { get; set; }
    public ResourceReference? Recorder { get; set; }
    public CodeableConcept? Severity { get; set; }
    public CodeableConcept? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? OnsetDateTime { get; set; }
    public CodeableConcept[]? BodySite { get; set; }
    public string? AbatementDateTime { get; set; }
    public CodeableConcept? VerificationStatus { get; set; }
    public ResourceReference? Subject { get; set; }
    
    public class ConditionStage : BackboneElement
    {
        public CodeableConcept? Summary { get; set; }
        public ResourceReference[]? Assessment { get; set; }
        public CodeableConcept? Type { get; set; }
    }
    
    public class ConditionEvidence : BackboneElement
    {
        public CodeableConcept[]? Code { get; set; }
        public ResourceReference[]? Detail { get; set; }
    }
    
}

