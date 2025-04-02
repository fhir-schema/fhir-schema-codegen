
namespace Aidbox.FHIR.R4.Core;

public class AllergyIntolerance : DomainResource
{
    public ResourceReference? Patient { get; set; }
    public string[]? Category { get; set; }
    public string? Criticality { get; set; }
    public CodeableConcept? ClinicalStatus { get; set; }
    public Range? OnsetRange { get; set; }
    public Age? OnsetAge { get; set; }
    public ResourceReference? Encounter { get; set; }
    public Period? OnsetPeriod { get; set; }
    public string? Type { get; set; }
    public ResourceReference? Asserter { get; set; }
    public Annotation[]? Note { get; set; }
    public string? RecordedDate { get; set; }
    public string? OnsetString { get; set; }
    public ResourceReference? Recorder { get; set; }
    public CodeableConcept? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? OnsetDateTime { get; set; }
    public string? LastOccurrence { get; set; }
    public CodeableConcept? VerificationStatus { get; set; }
    public AllergyIntoleranceReaction[]? Reaction { get; set; }
    
    public class AllergyIntoleranceReaction : BackboneElement
    {
        public CodeableConcept? Substance { get; set; }
        public CodeableConcept[]? Manifestation { get; set; }
        public string? Description { get; set; }
        public string? Onset { get; set; }
        public string? Severity { get; set; }
        public CodeableConcept? ExposureRoute { get; set; }
        public Annotation[]? Note { get; set; }
    }
    
}

