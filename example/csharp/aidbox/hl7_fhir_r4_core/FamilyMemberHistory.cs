
namespace Aidbox.FHIR.R4.Core;

public class FamilyMemberHistory : DomainResource
{
    public Age? DeceasedAge { get; set; }
    public ResourceReference? Patient { get; set; }
    public string? Date { get; set; }
    public string[]? InstantiatesCanonical { get; set; }
    public string[]? InstantiatesUri { get; set; }
    public CodeableConcept? Sex { get; set; }
    public Range? AgeRange { get; set; }
    public string? BornString { get; set; }
    public bool? DeceasedBoolean { get; set; }
    public string? Name { get; set; }
    public CodeableConcept? Relationship { get; set; }
    public CodeableConcept[]? ReasonCode { get; set; }
    public Annotation[]? Note { get; set; }
    public string? Status { get; set; }
    public FamilyMemberHistoryCondition[]? Condition { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? AgeString { get; set; }
    public Range? DeceasedRange { get; set; }
    public string? DeceasedDate { get; set; }
    public Period? BornPeriod { get; set; }
    public string? DeceasedString { get; set; }
    public Age? AgeAge { get; set; }
    public string? BornDate { get; set; }
    public CodeableConcept? DataAbsentReason { get; set; }
    public ResourceReference[]? ReasonReference { get; set; }
    public bool? EstimatedAge { get; set; }
    
    public class FamilyMemberHistoryCondition : BackboneElement
    {
        public Range? OnsetRange { get; set; }
        public Age? OnsetAge { get; set; }
        public bool? ContributedToDeath { get; set; }
        public Period? OnsetPeriod { get; set; }
        public CodeableConcept? Outcome { get; set; }
        public Annotation[]? Note { get; set; }
        public string? OnsetString { get; set; }
        public CodeableConcept? Code { get; set; }
    }
    
}

