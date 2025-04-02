
namespace Aidbox.FHIR.R4.Core;

public class Parameters : Resource
{
    public ParametersParameter[]? Parameter { get; set; }
    
    public class ParametersParameter : BackboneElement
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
        public string? Name { get; set; }
        public string? ValueMarkdown { get; set; }
        public Identifier? ValueIdentifier { get; set; }
        public TriggerDefinition? ValueTriggerDefinition { get; set; }
        public Quantity? ValueQuantity { get; set; }
        public ParametersParameter[]? Part { get; set; }
        public Count? ValueCount { get; set; }
        public string? ValueString { get; set; }
        public Ratio? ValueRatio { get; set; }
        public bool? ValueBoolean { get; set; }
        public string? ValueInstant { get; set; }
        public string? ValueDateTime { get; set; }
        public string? ValueDate { get; set; }
        public Duration? ValueDuration { get; set; }
        public DataRequirement? ValueDataRequirement { get; set; }
        public Meta? ValueMeta { get; set; }
        public Money? ValueMoney { get; set; }
        public Coding? ValueCoding { get; set; }
        public ResourceExpression? ValueExpression { get; set; }
        public SampledData? ValueSampledData { get; set; }
        public Resource? Resource { get; set; }
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

