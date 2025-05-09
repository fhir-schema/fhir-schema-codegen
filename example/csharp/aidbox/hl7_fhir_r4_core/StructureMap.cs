
namespace Aidbox.FHIR.R4.Core;

public class StructureMap : DomainResource
{
    public string? Description { get; set; }
    public string? Date { get; set; }
    public StructureMapGroup[]? Group { get; set; }
    public string? Publisher { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public string? Purpose { get; set; }
    public string? Name { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public string? Copyright { get; set; }
    public bool? Experimental { get; set; }
    public string? Title { get; set; }
    public StructureMapStructure[]? Structure { get; set; }
    public string? Status { get; set; }
    public string? Url { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? Version { get; set; }
    public string[]? Import { get; set; }
    public ContactDetail[]? Contact { get; set; }
    
    public class StructureMapGroupInput : BackboneElement
    {
        public string? Name { get; set; }
        public string? Type { get; set; }
        public string? Mode { get; set; }
        public string? Documentation { get; set; }
    }
    
    public class StructureMapGroupRuleSource : BackboneElement
    {
        public string? DefaultValueTime { get; set; }
        public DataRequirement? DefaultValueDataRequirement { get; set; }
        public int? Min { get; set; }
        public Money? DefaultValueMoney { get; set; }
        public ContactPoint? DefaultValueContactPoint { get; set; }
        public Meta? DefaultValueMeta { get; set; }
        public Coding? DefaultValueCoding { get; set; }
        public string? Variable { get; set; }
        public string? DefaultValueCode { get; set; }
        public string? Element { get; set; }
        public SampledData? DefaultValueSampledData { get; set; }
        public string? DefaultValueMarkdown { get; set; }
        public HumanName? DefaultValueHumanName { get; set; }
        public Duration? DefaultValueDuration { get; set; }
        public decimal? DefaultValueDecimal { get; set; }
        public string? DefaultValueUri { get; set; }
        public string? Check { get; set; }
        public Quantity? DefaultValueQuantity { get; set; }
        public Count? DefaultValueCount { get; set; }
        public string? DefaultValueId { get; set; }
        public string? DefaultValueBase64Binary { get; set; }
        public ContactDetail? DefaultValueContactDetail { get; set; }
        public string? Type { get; set; }
        public bool? DefaultValueBoolean { get; set; }
        public Period? DefaultValuePeriod { get; set; }
        public TriggerDefinition? DefaultValueTriggerDefinition { get; set; }
        public string? LogMessage { get; set; }
        public string? DefaultValueDate { get; set; }
        public ResourceReference? DefaultValueReference { get; set; }
        public Dosage? DefaultValueDosage { get; set; }
        public Range? DefaultValueRange { get; set; }
        public string? DefaultValueInstant { get; set; }
        public Attachment? DefaultValueAttachment { get; set; }
        public long? DefaultValueUnsignedInt { get; set; }
        public Distance? DefaultValueDistance { get; set; }
        public string? Max { get; set; }
        public Contributor? DefaultValueContributor { get; set; }
        public string? Condition { get; set; }
        public Ratio? DefaultValueRatio { get; set; }
        public string? DefaultValueCanonical { get; set; }
        public ResourceExpression? DefaultValueExpression { get; set; }
        public Signature? DefaultValueSignature { get; set; }
        public string? DefaultValueUrl { get; set; }
        public string? Context { get; set; }
        public Annotation? DefaultValueAnnotation { get; set; }
        public string? DefaultValueUuid { get; set; }
        public Address? DefaultValueAddress { get; set; }
        public string? DefaultValueString { get; set; }
        public Age? DefaultValueAge { get; set; }
        public string? DefaultValueOid { get; set; }
        public UsageContext? DefaultValueUsageContext { get; set; }
        public string? ListMode { get; set; }
        public ParameterDefinition? DefaultValueParameterDefinition { get; set; }
        public string? DefaultValueDateTime { get; set; }
        public long? DefaultValuePositiveInt { get; set; }
        public int? DefaultValueInteger { get; set; }
        public Timing? DefaultValueTiming { get; set; }
        public RelatedArtifact? DefaultValueRelatedArtifact { get; set; }
        public Identifier? DefaultValueIdentifier { get; set; }
        public CodeableConcept? DefaultValueCodeableConcept { get; set; }
    }
    
    public class StructureMapGroupRuleTargetParameter : BackboneElement
    {
        public string? ValueId { get; set; }
        public string? ValueString { get; set; }
        public bool? ValueBoolean { get; set; }
        public int? ValueInteger { get; set; }
        public decimal? ValueDecimal { get; set; }
    }
    
    public class StructureMapGroupRuleTarget : BackboneElement
    {
        public string? Context { get; set; }
        public string? ContextType { get; set; }
        public string? Element { get; set; }
        public string? Variable { get; set; }
        public string[]? ListMode { get; set; }
        public string? ListRuleId { get; set; }
        public string? Transform { get; set; }
        public StructureMapGroupRuleTargetParameter[]? Parameter { get; set; }
    }
    
    public class StructureMapGroupRuleDependent : BackboneElement
    {
        public string? Name { get; set; }
        public string[]? Variable { get; set; }
    }
    
    public class StructureMapGroupRule : BackboneElement
    {
        public string? Name { get; set; }
        public StructureMapGroupRuleSource[]? Source { get; set; }
        public StructureMapGroupRuleTarget[]? Target { get; set; }
        public StructureMapGroupRule[]? Rule { get; set; }
        public StructureMapGroupRuleDependent[]? Dependent { get; set; }
        public string? Documentation { get; set; }
    }
    
    public class StructureMapGroup : BackboneElement
    {
        public string? Name { get; set; }
        public string? Extends { get; set; }
        public string? TypeMode { get; set; }
        public string? Documentation { get; set; }
        public StructureMapGroupInput[]? Input { get; set; }
        public StructureMapGroupRule[]? Rule { get; set; }
    }
    
    public class StructureMapStructure : BackboneElement
    {
        public string? Url { get; set; }
        public string? Mode { get; set; }
        public string? Alias { get; set; }
        public string? Documentation { get; set; }
    }
    
}

