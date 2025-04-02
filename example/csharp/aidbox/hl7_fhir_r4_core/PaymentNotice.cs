
namespace Aidbox.FHIR.R4.Core;

public class PaymentNotice : DomainResource
{
    public ResourceReference? Response { get; set; }
    public Money? Amount { get; set; }
    public ResourceReference? Request { get; set; }
    public ResourceReference? Payment { get; set; }
    public ResourceReference? Recipient { get; set; }
    public string? Created { get; set; }
    public CodeableConcept? PaymentStatus { get; set; }
    public string? Status { get; set; }
    public ResourceReference? Payee { get; set; }
    public string? PaymentDate { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference? Provider { get; set; }
}

