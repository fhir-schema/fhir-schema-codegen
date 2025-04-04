
namespace Aidbox.FHIR.R4.Core;

public class Contract : DomainResource
{
    public Attachment? LegallyBindingAttachment { get; set; }
    public ResourceReference? InstantiatesCanonical { get; set; }
    public string? InstantiatesUri { get; set; }
    public ResourceReference? LegallyBindingReference { get; set; }
    public ResourceReference[]? Site { get; set; }
    public ResourceReference[]? RelevantHistory { get; set; }
    public ResourceReference[]? SupportingInfo { get; set; }
    public Period? Applies { get; set; }
    public string? Name { get; set; }
    public ResourceReference[]? Authority { get; set; }
    public ContractRule[]? Rule { get; set; }
    public CodeableConcept? Type { get; set; }
    public ContractLegal[]? Legal { get; set; }
    public CodeableConcept? ContentDerivative { get; set; }
    public CodeableConcept? TopicCodeableConcept { get; set; }
    public CodeableConcept? LegalState { get; set; }
    public ContractContentDefinition? ContentDefinition { get; set; }
    public CodeableConcept? Scope { get; set; }
    public string? Title { get; set; }
    public ContractSigner[]? Signer { get; set; }
    public ResourceReference? Author { get; set; }
    public ContractTerm[]? Term { get; set; }
    public ContractFriendly[]? Friendly { get; set; }
    public string[]? Alias { get; set; }
    public string? Status { get; set; }
    public string? Subtitle { get; set; }
    public ResourceReference? TopicReference { get; set; }
    public string? Url { get; set; }
    public Identifier[]? Identifier { get; set; }
    public CodeableConcept? ExpirationType { get; set; }
    public string? Issued { get; set; }
    public ResourceReference[]? Domain { get; set; }
    public CodeableConcept[]? SubType { get; set; }
    public string? Version { get; set; }
    public ResourceReference[]? Subject { get; set; }
    
    public class ContractRule : BackboneElement
    {
        public Attachment? ContentAttachment { get; set; }
        public ResourceReference? ContentReference { get; set; }
    }
    
    public class ContractLegal : BackboneElement
    {
        public Attachment? ContentAttachment { get; set; }
        public ResourceReference? ContentReference { get; set; }
    }
    
    public class ContractContentDefinition : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public CodeableConcept? SubType { get; set; }
        public ResourceReference? Publisher { get; set; }
        public string? PublicationDate { get; set; }
        public string? PublicationStatus { get; set; }
        public string? Copyright { get; set; }
    }
    
    public class ContractSigner : BackboneElement
    {
        public Coding? Type { get; set; }
        public ResourceReference? Party { get; set; }
        public Signature[]? Signature { get; set; }
    }
    
    public class ContractTermOfferParty : BackboneElement
    {
        public ResourceReference[]? Reference { get; set; }
        public CodeableConcept? Role { get; set; }
    }
    
    public class ContractTermOfferAnswer : BackboneElement
    {
        public ResourceReference? ValueReference { get; set; }
        public string? ValueUri { get; set; }
        public string? ValueTime { get; set; }
        public decimal? ValueDecimal { get; set; }
        public Quantity? ValueQuantity { get; set; }
        public string? ValueString { get; set; }
        public bool? ValueBoolean { get; set; }
        public string? ValueDateTime { get; set; }
        public string? ValueDate { get; set; }
        public Coding? ValueCoding { get; set; }
        public int? ValueInteger { get; set; }
        public Attachment? ValueAttachment { get; set; }
    }
    
    public class ContractTermOffer : BackboneElement
    {
        public ContractTermOfferParty[]? Party { get; set; }
        public string[]? LinkId { get; set; }
        public CodeableConcept[]? DecisionMode { get; set; }
        public CodeableConcept? Type { get; set; }
        public ResourceReference? Topic { get; set; }
        public long[]? SecurityLabelNumber { get; set; }
        public ContractTermOfferAnswer[]? Answer { get; set; }
        public Identifier[]? Identifier { get; set; }
        public CodeableConcept? Decision { get; set; }
        public string? Text { get; set; }
    }
    
    public class ContractTermActionSubject : BackboneElement
    {
        public ResourceReference[]? Reference { get; set; }
        public CodeableConcept? Role { get; set; }
    }
    
    public class ContractTermAction : BackboneElement
    {
        public string[]? RequesterLinkId { get; set; }
        public CodeableConcept[]? PerformerType { get; set; }
        public string[]? LinkId { get; set; }
        public CodeableConcept? PerformerRole { get; set; }
        public string[]? ReasonLinkId { get; set; }
        public CodeableConcept[]? ReasonCode { get; set; }
        public CodeableConcept? Type { get; set; }
        public Timing? OccurrenceTiming { get; set; }
        public Annotation[]? Note { get; set; }
        public string[]? Reason { get; set; }
        public ResourceReference[]? Requester { get; set; }
        public long[]? SecurityLabelNumber { get; set; }
        public Period? OccurrencePeriod { get; set; }
        public CodeableConcept? Status { get; set; }
        public bool? DoNotPerform { get; set; }
        public ResourceReference? Context { get; set; }
        public CodeableConcept? Intent { get; set; }
        public string[]? PerformerLinkId { get; set; }
        public string? OccurrenceDateTime { get; set; }
        public ContractTermActionSubject[]? Subject { get; set; }
        public ResourceReference? Performer { get; set; }
        public string[]? ContextLinkId { get; set; }
        public ResourceReference[]? ReasonReference { get; set; }
    }
    
    public class ContractTermSecurityLabel : BackboneElement
    {
        public long[]? Number { get; set; }
        public Coding? Classification { get; set; }
        public Coding[]? Category { get; set; }
        public Coding[]? Control { get; set; }
    }
    
    public class ContractTermAssetContext : BackboneElement
    {
        public ResourceReference? Reference { get; set; }
        public CodeableConcept[]? Code { get; set; }
        public string? Text { get; set; }
    }
    
    public class ContractTermAssetValuedItem : BackboneElement
    {
        public string[]? LinkId { get; set; }
        public string? Payment { get; set; }
        public ResourceReference? Recipient { get; set; }
        public Money? Net { get; set; }
        public decimal? Points { get; set; }
        public ResourceReference? Responsible { get; set; }
        public long[]? SecurityLabelNumber { get; set; }
        public decimal? Factor { get; set; }
        public string? PaymentDate { get; set; }
        public CodeableConcept? EntityCodeableConcept { get; set; }
        public Identifier? Identifier { get; set; }
        public string? EffectiveTime { get; set; }
        public Quantity? Quantity { get; set; }
        public Money? UnitPrice { get; set; }
        public ResourceReference? EntityReference { get; set; }
    }
    
    public class ContractTermAsset : BackboneElement
    {
        public CodeableConcept[]? PeriodType { get; set; }
        public Period[]? UsePeriod { get; set; }
        public string[]? LinkId { get; set; }
        public Coding? Relationship { get; set; }
        public CodeableConcept[]? Type { get; set; }
        public CodeableConcept? Scope { get; set; }
        public long[]? SecurityLabelNumber { get; set; }
        public ResourceReference[]? TypeReference { get; set; }
        public string? Condition { get; set; }
        public ContractTermOfferAnswer[]? Answer { get; set; }
        public ContractTermAssetContext[]? Context { get; set; }
        public Period[]? Period { get; set; }
        public ContractTermAssetValuedItem[]? ValuedItem { get; set; }
        public CodeableConcept[]? Subtype { get; set; }
        public string? Text { get; set; }
    }
    
    public class ContractTerm : BackboneElement
    {
        public ContractTerm[]? Group { get; set; }
        public Period? Applies { get; set; }
        public ContractTermOffer? Offer { get; set; }
        public CodeableConcept? Type { get; set; }
        public CodeableConcept? TopicCodeableConcept { get; set; }
        public ResourceReference? TopicReference { get; set; }
        public Identifier? Identifier { get; set; }
        public ContractTermAction[]? Action { get; set; }
        public string? Issued { get; set; }
        public CodeableConcept? SubType { get; set; }
        public ContractTermSecurityLabel[]? SecurityLabel { get; set; }
        public ContractTermAsset[]? Asset { get; set; }
        public string? Text { get; set; }
    }
    
    public class ContractFriendly : BackboneElement
    {
        public Attachment? ContentAttachment { get; set; }
        public ResourceReference? ContentReference { get; set; }
    }
    
}

