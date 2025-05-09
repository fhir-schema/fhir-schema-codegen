
namespace Aidbox.FHIR.R4.Core;

public class Goal : DomainResource
{
    public CodeableConcept? Description { get; set; }
    public CodeableConcept[]? Category { get; set; }
    public ResourceReference[]? Addresses { get; set; }
    public ResourceReference? ExpressedBy { get; set; }
    public string? StartDate { get; set; }
    public CodeableConcept? AchievementStatus { get; set; }
    public string? StatusReason { get; set; }
    public Annotation[]? Note { get; set; }
    public CodeableConcept? StartCodeableConcept { get; set; }
    public CodeableConcept? Priority { get; set; }
    public CodeableConcept[]? OutcomeCode { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? StatusDate { get; set; }
    public GoalTarget[]? Target { get; set; }
    public ResourceReference[]? OutcomeReference { get; set; }
    public ResourceReference? Subject { get; set; }
    public string? LifecycleStatus { get; set; }
    
    public class GoalTarget : BackboneElement
    {
        public Range? DetailRange { get; set; }
        public Quantity? DetailQuantity { get; set; }
        public int? DetailInteger { get; set; }
        public string? DetailString { get; set; }
        public CodeableConcept? Measure { get; set; }
        public Ratio? DetailRatio { get; set; }
        public CodeableConcept? DetailCodeableConcept { get; set; }
        public string? DueDate { get; set; }
        public bool? DetailBoolean { get; set; }
        public Duration? DueDuration { get; set; }
    }
    
}

