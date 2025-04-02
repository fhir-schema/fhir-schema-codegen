
namespace Aidbox.FHIR.R4.Core;

public class Questionnaire : DomainResource
{
    public string? Description { get; set; }
    public string[]? SubjectType { get; set; }
    public string? Date { get; set; }
    public string? Publisher { get; set; }
    public string? ApprovalDate { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public string[]? DerivedFrom { get; set; }
    public string? Purpose { get; set; }
    public string? Name { get; set; }
    public QuestionnaireItem[]? Item { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public string? Copyright { get; set; }
    public bool? Experimental { get; set; }
    public string? Title { get; set; }
    public string? Status { get; set; }
    public string? Url { get; set; }
    public Coding[]? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? LastReviewDate { get; set; }
    public string? Version { get; set; }
    public ContactDetail[]? Contact { get; set; }
    public Period? EffectivePeriod { get; set; }
    
    public class QuestionnaireItemEnableWhen : BackboneElement
    {
        public Quantity? AnswerQuantity { get; set; }
        public decimal? AnswerDecimal { get; set; }
        public string? AnswerDate { get; set; }
        public ResourceReference? AnswerReference { get; set; }
        public int? AnswerInteger { get; set; }
        public string? Question { get; set; }
        public string? AnswerDateTime { get; set; }
        public string? AnswerString { get; set; }
        public string? Operator { get; set; }
        public bool? AnswerBoolean { get; set; }
        public Coding? AnswerCoding { get; set; }
        public string? AnswerTime { get; set; }
    }
    
    public class QuestionnaireItemAnswerOption : BackboneElement
    {
        public int? ValueInteger { get; set; }
        public string? ValueDate { get; set; }
        public string? ValueTime { get; set; }
        public string? ValueString { get; set; }
        public Coding? ValueCoding { get; set; }
        public ResourceReference? ValueReference { get; set; }
        public bool? InitialSelected { get; set; }
    }
    
    public class QuestionnaireItemInitial : BackboneElement
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
    
    public class QuestionnaireItem : BackboneElement
    {
        public string? EnableBehavior { get; set; }
        public string? Definition { get; set; }
        public string? LinkId { get; set; }
        public bool? Repeats { get; set; }
        public QuestionnaireItem[]? Item { get; set; }
        public string? Type { get; set; }
        public QuestionnaireItemEnableWhen[]? EnableWhen { get; set; }
        public QuestionnaireItemAnswerOption[]? AnswerOption { get; set; }
        public string? Prefix { get; set; }
        public bool? ReadOnly { get; set; }
        public string? AnswerValueSet { get; set; }
        public Coding[]? Code { get; set; }
        public QuestionnaireItemInitial[]? Initial { get; set; }
        public int? MaxLength { get; set; }
        public bool? Required { get; set; }
        public string? Text { get; set; }
    }
    
}

