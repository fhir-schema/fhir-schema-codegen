
namespace Aidbox.FHIR.R4.Core;

public class Invoice : DomainResource
{
    public string? Date { get; set; }
    public Money? TotalNet { get; set; }
    public ResourceReference? Recipient { get; set; }
    public InvoiceLineItemPriceComponent[]? TotalPriceComponent { get; set; }
    public CodeableConcept? Type { get; set; }
    public Money? TotalGross { get; set; }
    public InvoiceParticipant[]? Participant { get; set; }
    public Annotation[]? Note { get; set; }
    public ResourceReference? Account { get; set; }
    public string? Status { get; set; }
    public InvoiceLineItem[]? LineItem { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference? Issuer { get; set; }
    public string? CancelledReason { get; set; }
    public string? PaymentTerms { get; set; }
    public ResourceReference? Subject { get; set; }
    
    public class InvoiceParticipant : BackboneElement
    {
        public CodeableConcept? Role { get; set; }
        public ResourceReference? Actor { get; set; }
    }
    
    public class InvoiceLineItemPriceComponent : BackboneElement
    {
        public string? Type { get; set; }
        public CodeableConcept? Code { get; set; }
        public decimal? Factor { get; set; }
        public Money? Amount { get; set; }
    }
    
    public class InvoiceLineItem : BackboneElement
    {
        public long? Sequence { get; set; }
        public ResourceReference? ChargeItemReference { get; set; }
        public CodeableConcept? ChargeItemCodeableConcept { get; set; }
        public InvoiceLineItemPriceComponent[]? PriceComponent { get; set; }
    }
    
}

