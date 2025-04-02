
namespace Aidbox.FHIR.R4.Core;

public class PaymentReconciliation : DomainResource
{
    public ResourceReference? Requestor { get; set; }
    public ResourceReference? Request { get; set; }
    public Money? PaymentAmount { get; set; }
    public PaymentReconciliationProcessNote[]? ProcessNote { get; set; }
    public string? Created { get; set; }
    public string? Outcome { get; set; }
    public string? Disposition { get; set; }
    public Identifier? PaymentIdentifier { get; set; }
    public string? Status { get; set; }
    public string? PaymentDate { get; set; }
    public Identifier[]? Identifier { get; set; }
    public Period? Period { get; set; }
    public ResourceReference? PaymentIssuer { get; set; }
    public CodeableConcept? FormCode { get; set; }
    public PaymentReconciliationDetail[]? Detail { get; set; }
    
    public class PaymentReconciliationProcessNote : BackboneElement
    {
        public string? Type { get; set; }
        public string? Text { get; set; }
    }
    
    public class PaymentReconciliationDetail : BackboneElement
    {
        public ResourceReference? Response { get; set; }
        public Money? Amount { get; set; }
        public string? Date { get; set; }
        public ResourceReference? Request { get; set; }
        public CodeableConcept? Type { get; set; }
        public ResourceReference? Responsible { get; set; }
        public ResourceReference? Payee { get; set; }
        public Identifier? Predecessor { get; set; }
        public Identifier? Identifier { get; set; }
        public ResourceReference? Submitter { get; set; }
    }
    
}

