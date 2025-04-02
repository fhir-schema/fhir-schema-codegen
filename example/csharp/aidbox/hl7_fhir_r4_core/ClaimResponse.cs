
namespace Aidbox.FHIR.R4.Core;

public class ClaimResponse : DomainResource
{
    public ResourceReference? Patient { get; set; }
    public ResourceReference? Requestor { get; set; }
    public CodeableConcept? PayeeType { get; set; }
    public ClaimResponseInsurance[]? Insurance { get; set; }
    public ResourceReference? Request { get; set; }
    public ClaimResponseProcessNote[]? ProcessNote { get; set; }
    public string? PreAuthRef { get; set; }
    public ClaimResponseItemAdjudication[]? Adjudication { get; set; }
    public string? Use { get; set; }
    public ClaimResponsePayment? Payment { get; set; }
    public ClaimResponseItem[]? Item { get; set; }
    public CodeableConcept? Type { get; set; }
    public string? Created { get; set; }
    public Period? PreAuthPeriod { get; set; }
    public string? Outcome { get; set; }
    public string? Disposition { get; set; }
    public ResourceReference[]? CommunicationRequest { get; set; }
    public ClaimResponseTotal[]? Total { get; set; }
    public ResourceReference? Insurer { get; set; }
    public CodeableConcept? FundsReserve { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ClaimResponseError[]? Error { get; set; }
    public Attachment? Form { get; set; }
    public CodeableConcept? SubType { get; set; }
    public CodeableConcept? FormCode { get; set; }
    public ClaimResponseAddItem[]? AddItem { get; set; }
    
    public class ClaimResponseInsurance : BackboneElement
    {
        public long? Sequence { get; set; }
        public bool? Focal { get; set; }
        public ResourceReference? Coverage { get; set; }
        public string? BusinessArrangement { get; set; }
        public ResourceReference? ClaimResponse { get; set; }
    }
    
    public class ClaimResponseProcessNote : BackboneElement
    {
        public long? Number { get; set; }
        public string? Type { get; set; }
        public string? Text { get; set; }
        public CodeableConcept? Language { get; set; }
    }
    
    public class ClaimResponsePayment : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public Money? Adjustment { get; set; }
        public CodeableConcept? AdjustmentReason { get; set; }
        public string? Date { get; set; }
        public Money? Amount { get; set; }
        public Identifier? Identifier { get; set; }
    }
    
    public class ClaimResponseItemAdjudication : BackboneElement
    {
        public CodeableConcept? Category { get; set; }
        public CodeableConcept? Reason { get; set; }
        public Money? Amount { get; set; }
        public decimal? Value { get; set; }
    }
    
    public class ClaimResponseItemDetailSubDetail : BackboneElement
    {
        public long? SubDetailSequence { get; set; }
        public long[]? NoteNumber { get; set; }
        public ClaimResponseItemAdjudication[]? Adjudication { get; set; }
    }
    
    public class ClaimResponseItemDetail : BackboneElement
    {
        public long? DetailSequence { get; set; }
        public long[]? NoteNumber { get; set; }
        public ClaimResponseItemAdjudication[]? Adjudication { get; set; }
        public ClaimResponseItemDetailSubDetail[]? SubDetail { get; set; }
    }
    
    public class ClaimResponseItem : BackboneElement
    {
        public long? ItemSequence { get; set; }
        public long[]? NoteNumber { get; set; }
        public ClaimResponseItemAdjudication[]? Adjudication { get; set; }
        public ClaimResponseItemDetail[]? Detail { get; set; }
    }
    
    public class ClaimResponseTotal : BackboneElement
    {
        public CodeableConcept? Category { get; set; }
        public Money? Amount { get; set; }
    }
    
    public class ClaimResponseError : BackboneElement
    {
        public long? ItemSequence { get; set; }
        public long? DetailSequence { get; set; }
        public long? SubDetailSequence { get; set; }
        public CodeableConcept? Code { get; set; }
    }
    
    public class ClaimResponseAddItemDetailSubDetail : BackboneElement
    {
        public CodeableConcept? ProductOrService { get; set; }
        public CodeableConcept[]? Modifier { get; set; }
        public Quantity? Quantity { get; set; }
        public Money? UnitPrice { get; set; }
        public decimal? Factor { get; set; }
        public Money? Net { get; set; }
        public long[]? NoteNumber { get; set; }
        public ClaimResponseItemAdjudication[]? Adjudication { get; set; }
    }
    
    public class ClaimResponseAddItemDetail : BackboneElement
    {
        public CodeableConcept[]? Modifier { get; set; }
        public ClaimResponseItemAdjudication[]? Adjudication { get; set; }
        public Money? Net { get; set; }
        public CodeableConcept? ProductOrService { get; set; }
        public decimal? Factor { get; set; }
        public ClaimResponseAddItemDetailSubDetail[]? SubDetail { get; set; }
        public Quantity? Quantity { get; set; }
        public long[]? NoteNumber { get; set; }
        public Money? UnitPrice { get; set; }
    }
    
    public class ClaimResponseAddItem : BackboneElement
    {
        public Address? LocationAddress { get; set; }
        public CodeableConcept[]? Modifier { get; set; }
        public ClaimResponseItemAdjudication[]? Adjudication { get; set; }
        public long[]? SubdetailSequence { get; set; }
        public CodeableConcept? LocationCodeableConcept { get; set; }
        public long[]? ItemSequence { get; set; }
        public Money? Net { get; set; }
        public long[]? DetailSequence { get; set; }
        public CodeableConcept[]? SubSite { get; set; }
        public CodeableConcept? ProductOrService { get; set; }
        public ResourceReference? LocationReference { get; set; }
        public CodeableConcept[]? ProgramCode { get; set; }
        public decimal? Factor { get; set; }
        public string? ServicedDate { get; set; }
        public CodeableConcept? BodySite { get; set; }
        public Quantity? Quantity { get; set; }
        public ResourceReference[]? Provider { get; set; }
        public long[]? NoteNumber { get; set; }
        public Money? UnitPrice { get; set; }
        public Period? ServicedPeriod { get; set; }
        public ClaimResponseAddItemDetail[]? Detail { get; set; }
    }
    
}

