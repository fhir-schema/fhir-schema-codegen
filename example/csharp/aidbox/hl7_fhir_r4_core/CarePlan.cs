
namespace Aidbox.FHIR.R4.Core;

public class CarePlan : DomainResource
{
    public string? Description { get; set; }
    public CodeableConcept[]? Category { get; set; }
    public ResourceReference[]? Addresses { get; set; }
    public string[]? InstantiatesCanonical { get; set; }
    public string[]? InstantiatesUri { get; set; }
    public ResourceReference[]? SupportingInfo { get; set; }
    public ResourceReference? Encounter { get; set; }
    public ResourceReference[]? Goal { get; set; }
    public string? Created { get; set; }
    public string? Title { get; set; }
    public Annotation[]? Note { get; set; }
    public ResourceReference? Author { get; set; }
    public CarePlanActivity[]? Activity { get; set; }
    public ResourceReference[]? Contributor { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? Intent { get; set; }
    public ResourceReference[]? Replaces { get; set; }
    public Period? Period { get; set; }
    public ResourceReference[]? BasedOn { get; set; }
    public ResourceReference[]? PartOf { get; set; }
    public ResourceReference? Subject { get; set; }
    public ResourceReference[]? CareTeam { get; set; }
    
    public class CarePlanActivityDetail : BackboneElement
    {
        public string? Description { get; set; }
        public string[]? InstantiatesCanonical { get; set; }
        public string[]? InstantiatesUri { get; set; }
        public CodeableConcept? ProductCodeableConcept { get; set; }
        public ResourceReference? ProductReference { get; set; }
        public Period? ScheduledPeriod { get; set; }
        public ResourceReference[]? Goal { get; set; }
        public CodeableConcept[]? ReasonCode { get; set; }
        public CodeableConcept? StatusReason { get; set; }
        public Timing? ScheduledTiming { get; set; }
        public Quantity? DailyAmount { get; set; }
        public string? ScheduledString { get; set; }
        public string? Status { get; set; }
        public string? Kind { get; set; }
        public CodeableConcept? Code { get; set; }
        public bool? DoNotPerform { get; set; }
        public Quantity? Quantity { get; set; }
        public ResourceReference? Location { get; set; }
        public ResourceReference[]? Performer { get; set; }
        public ResourceReference[]? ReasonReference { get; set; }
    }
    
    public class CarePlanActivity : BackboneElement
    {
        public CodeableConcept[]? OutcomeCodeableConcept { get; set; }
        public ResourceReference[]? OutcomeReference { get; set; }
        public Annotation[]? Progress { get; set; }
        public ResourceReference? Reference { get; set; }
        public CarePlanActivityDetail? Detail { get; set; }
    }
    
}

