
namespace Aidbox.FHIR.R4.Core;

public class QuestionnaireResponse : DomainResource
{
    public string? Questionnaire { get; set; }
    public ResourceReference? Encounter { get; set; }
    public QuestionnaireResponseItem[]? Item { get; set; }
    public ResourceReference? Source { get; set; }
    public ResourceReference? Author { get; set; }
    public string? Status { get; set; }
    public Identifier? Identifier { get; set; }
    public ResourceReference[]? BasedOn { get; set; }
    public string? Authored { get; set; }
    public ResourceReference[]? PartOf { get; set; }
    public ResourceReference? Subject { get; set; }
    
    public class QuestionnaireResponseItemAnswer : BackboneElement
    {
        public ResourceReference? ValueReference { get; set; }
        public string? ValueUri { get; set; }
        public string? ValueTime { get; set; }
        public decimal? ValueDecimal { get; set; }
        public Quantity? ValueQuantity { get; set; }
        public QuestionnaireResponseItem[]? Item { get; set; }
        public string? ValueString { get; set; }
        public bool? ValueBoolean { get; set; }
        public string? ValueDateTime { get; set; }
        public string? ValueDate { get; set; }
        public Coding? ValueCoding { get; set; }
        public int? ValueInteger { get; set; }
        public Attachment? ValueAttachment { get; set; }
    }
    
    public class QuestionnaireResponseItem : BackboneElement
    {
        public string? LinkId { get; set; }
        public string? Definition { get; set; }
        public string? Text { get; set; }
        public QuestionnaireResponseItemAnswer[]? Answer { get; set; }
        public QuestionnaireResponseItem[]? Item { get; set; }
    }
    
}

