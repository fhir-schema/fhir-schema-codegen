
namespace Aidbox.FHIR.R4.Core;

public class Task : DomainResource
{
    public TaskRestriction? Restriction { get; set; }
    public string? Description { get; set; }
    public CodeableConcept[]? PerformerType { get; set; }
    public Period? ExecutionPeriod { get; set; }
    public ResourceReference[]? Insurance { get; set; }
    public string? InstantiatesCanonical { get; set; }
    public string? InstantiatesUri { get; set; }
    public ResourceReference[]? RelevantHistory { get; set; }
    public ResourceReference? Encounter { get; set; }
    public CodeableConcept? ReasonCode { get; set; }
    public CodeableConcept? StatusReason { get; set; }
    public string? AuthoredOn { get; set; }
    public TaskOutput[]? Output { get; set; }
    public CodeableConcept? BusinessStatus { get; set; }
    public Annotation[]? Note { get; set; }
    public ResourceReference? For { get; set; }
    public ResourceReference? Requester { get; set; }
    public string? LastModified { get; set; }
    public string? Priority { get; set; }
    public string? Status { get; set; }
    public Identifier? GroupIdentifier { get; set; }
    public CodeableConcept? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? Intent { get; set; }
    public ResourceReference? Focus { get; set; }
    public TaskInput[]? Input { get; set; }
    public ResourceReference[]? BasedOn { get; set; }
    public ResourceReference[]? PartOf { get; set; }
    public ResourceReference? Location { get; set; }
    public ResourceReference? Owner { get; set; }
    public ResourceReference? ReasonReference { get; set; }
    
    public class TaskRestriction : BackboneElement
    {
        public long? Repetitions { get; set; }
        public Period? Period { get; set; }
        public ResourceReference[]? Recipient { get; set; }
    }
    
    public class TaskOutput : BackboneElement
    {
        public string? ValueBase64Binary { get; set; }
        public Age? ValueAge { get; set; }
        public ParameterDefinition? ValueParameterDefinition { get; set; }
        public Timing? ValueTiming { get; set; }
        public string? ValueCode { get; set; }
        public ResourceReference? ValueReference { get; set; }
        public Contributor? ValueContributor { get; set; }
        public ContactDetail? ValueContactDetail { get; set; }
        public string? ValueUri { get; set; }
        public UsageContext? ValueUsageContext { get; set; }
        public string? ValueTime { get; set; }
        public decimal? ValueDecimal { get; set; }
        public string? ValueCanonical { get; set; }
        public string? ValueMarkdown { get; set; }
        public Identifier? ValueIdentifier { get; set; }
        public TriggerDefinition? ValueTriggerDefinition { get; set; }
        public Quantity? ValueQuantity { get; set; }
        public Count? ValueCount { get; set; }
        public string? ValueString { get; set; }
        public Ratio? ValueRatio { get; set; }
        public bool? ValueBoolean { get; set; }
        public string? ValueInstant { get; set; }
        public string? ValueDateTime { get; set; }
        public string? ValueDate { get; set; }
        public CodeableConcept? Type { get; set; }
        public Duration? ValueDuration { get; set; }
        public DataRequirement? ValueDataRequirement { get; set; }
        public Meta? ValueMeta { get; set; }
        public Money? ValueMoney { get; set; }
        public Coding? ValueCoding { get; set; }
        public ResourceExpression? ValueExpression { get; set; }
        public SampledData? ValueSampledData { get; set; }
        public Dosage? ValueDosage { get; set; }
        public ContactPoint? ValueContactPoint { get; set; }
        public CodeableConcept? ValueCodeableConcept { get; set; }
        public Annotation? ValueAnnotation { get; set; }
        public Period? ValuePeriod { get; set; }
        public Distance? ValueDistance { get; set; }
        public Range? ValueRange { get; set; }
        public Signature? ValueSignature { get; set; }
        public string? ValueUuid { get; set; }
        public int? ValueInteger { get; set; }
        public HumanName? ValueHumanName { get; set; }
        public long? ValueUnsignedInt { get; set; }
        public Attachment? ValueAttachment { get; set; }
        public string? ValueOid { get; set; }
        public Address? ValueAddress { get; set; }
        public RelatedArtifact? ValueRelatedArtifact { get; set; }
        public long? ValuePositiveInt { get; set; }
        public string? ValueId { get; set; }
        public string? ValueUrl { get; set; }
    }
    
    public class TaskInput : BackboneElement
    {
        public string? ValueBase64Binary { get; set; }
        public Age? ValueAge { get; set; }
        public ParameterDefinition? ValueParameterDefinition { get; set; }
        public Timing? ValueTiming { get; set; }
        public string? ValueCode { get; set; }
        public ResourceReference? ValueReference { get; set; }
        public Contributor? ValueContributor { get; set; }
        public ContactDetail? ValueContactDetail { get; set; }
        public string? ValueUri { get; set; }
        public UsageContext? ValueUsageContext { get; set; }
        public string? ValueTime { get; set; }
        public decimal? ValueDecimal { get; set; }
        public string? ValueCanonical { get; set; }
        public string? ValueMarkdown { get; set; }
        public Identifier? ValueIdentifier { get; set; }
        public TriggerDefinition? ValueTriggerDefinition { get; set; }
        public Quantity? ValueQuantity { get; set; }
        public Count? ValueCount { get; set; }
        public string? ValueString { get; set; }
        public Ratio? ValueRatio { get; set; }
        public bool? ValueBoolean { get; set; }
        public string? ValueInstant { get; set; }
        public string? ValueDateTime { get; set; }
        public string? ValueDate { get; set; }
        public CodeableConcept? Type { get; set; }
        public Duration? ValueDuration { get; set; }
        public DataRequirement? ValueDataRequirement { get; set; }
        public Meta? ValueMeta { get; set; }
        public Money? ValueMoney { get; set; }
        public Coding? ValueCoding { get; set; }
        public ResourceExpression? ValueExpression { get; set; }
        public SampledData? ValueSampledData { get; set; }
        public Dosage? ValueDosage { get; set; }
        public ContactPoint? ValueContactPoint { get; set; }
        public CodeableConcept? ValueCodeableConcept { get; set; }
        public Annotation? ValueAnnotation { get; set; }
        public Period? ValuePeriod { get; set; }
        public Distance? ValueDistance { get; set; }
        public Range? ValueRange { get; set; }
        public Signature? ValueSignature { get; set; }
        public string? ValueUuid { get; set; }
        public int? ValueInteger { get; set; }
        public HumanName? ValueHumanName { get; set; }
        public long? ValueUnsignedInt { get; set; }
        public Attachment? ValueAttachment { get; set; }
        public string? ValueOid { get; set; }
        public Address? ValueAddress { get; set; }
        public RelatedArtifact? ValueRelatedArtifact { get; set; }
        public long? ValuePositiveInt { get; set; }
        public string? ValueId { get; set; }
        public string? ValueUrl { get; set; }
    }
    
}

