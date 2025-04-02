
namespace Aidbox.FHIR.R4.Core;

public class Observation : DomainResource
{
    public CodeableConcept[]? Category { get; set; }
    public ObservationReferenceRange[]? ReferenceRange { get; set; }
    public ResourceReference[]? HasMember { get; set; }
    public ResourceReference[]? DerivedFrom { get; set; }
    public CodeableConcept[]? Interpretation { get; set; }
    public ResourceReference? Encounter { get; set; }
    public CodeableConcept? Method { get; set; }
    public string? ValueTime { get; set; }
    public ResourceReference? Specimen { get; set; }
    public Quantity? ValueQuantity { get; set; }
    public string? ValueString { get; set; }
    public Ratio? ValueRatio { get; set; }
    public bool? ValueBoolean { get; set; }
    public string? ValueDateTime { get; set; }
    public ObservationComponent[]? Component { get; set; }
    public Annotation[]? Note { get; set; }
    public SampledData? ValueSampledData { get; set; }
    public string? EffectiveDateTime { get; set; }
    public string? Status { get; set; }
    public CodeableConcept? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public Timing? EffectiveTiming { get; set; }
    public CodeableConcept? ValueCodeableConcept { get; set; }
    public CodeableConcept? BodySite { get; set; }
    public ResourceReference[]? Focus { get; set; }
    public string? Issued { get; set; }
    public Period? ValuePeriod { get; set; }
    public ResourceReference? Device { get; set; }
    public string? EffectiveInstant { get; set; }
    public ResourceReference[]? BasedOn { get; set; }
    public Range? ValueRange { get; set; }
    public ResourceReference[]? PartOf { get; set; }
    public int? ValueInteger { get; set; }
    public ResourceReference? Subject { get; set; }
    public ResourceReference[]? Performer { get; set; }
    public CodeableConcept? DataAbsentReason { get; set; }
    public Period? EffectivePeriod { get; set; }
    
    public class ObservationReferenceRange : BackboneElement
    {
        public Quantity? Low { get; set; }
        public Quantity? High { get; set; }
        public CodeableConcept? Type { get; set; }
        public CodeableConcept[]? AppliesTo { get; set; }
        public Range? Age { get; set; }
        public string? Text { get; set; }
    }
    
    public class ObservationComponent : BackboneElement
    {
        public ObservationReferenceRange[]? ReferenceRange { get; set; }
        public CodeableConcept[]? Interpretation { get; set; }
        public string? ValueTime { get; set; }
        public Quantity? ValueQuantity { get; set; }
        public string? ValueString { get; set; }
        public Ratio? ValueRatio { get; set; }
        public bool? ValueBoolean { get; set; }
        public string? ValueDateTime { get; set; }
        public SampledData? ValueSampledData { get; set; }
        public CodeableConcept? Code { get; set; }
        public CodeableConcept? ValueCodeableConcept { get; set; }
        public Period? ValuePeriod { get; set; }
        public Range? ValueRange { get; set; }
        public int? ValueInteger { get; set; }
        public CodeableConcept? DataAbsentReason { get; set; }
    }
    
}

