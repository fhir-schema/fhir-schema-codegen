
namespace Aidbox.FHIR.R4.Core;

public class ExplanationOfBenefit : DomainResource
{
    public ResourceReference? Patient { get; set; }
    public ResourceReference? ClaimResponse { get; set; }
    public ExplanationOfBenefitInsurance[]? Insurance { get; set; }
    public ExplanationOfBenefitBenefitBalance[]? BenefitBalance { get; set; }
    public ResourceReference? Facility { get; set; }
    public ExplanationOfBenefitProcessNote[]? ProcessNote { get; set; }
    public ExplanationOfBenefitDiagnosis[]? Diagnosis { get; set; }
    public string[]? PreAuthRef { get; set; }
    public ExplanationOfBenefitItemAdjudication[]? Adjudication { get; set; }
    public ResourceReference? Enterer { get; set; }
    public ExplanationOfBenefitSupportingInfo[]? SupportingInfo { get; set; }
    public string? Use { get; set; }
    public ExplanationOfBenefitPayment? Payment { get; set; }
    public ExplanationOfBenefitItem[]? Item { get; set; }
    public CodeableConcept? Type { get; set; }
    public string? Created { get; set; }
    public ExplanationOfBenefitProcedure[]? Procedure { get; set; }
    public string? Outcome { get; set; }
    public ExplanationOfBenefitRelated[]? Related { get; set; }
    public string? Disposition { get; set; }
    public ResourceReference? Referral { get; set; }
    public Period[]? PreAuthRefPeriod { get; set; }
    public ExplanationOfBenefitTotal[]? Total { get; set; }
    public ResourceReference? Insurer { get; set; }
    public CodeableConcept? FundsReserve { get; set; }
    public CodeableConcept? Priority { get; set; }
    public ExplanationOfBenefitAccident? Accident { get; set; }
    public string? Status { get; set; }
    public ExplanationOfBenefitPayee? Payee { get; set; }
    public ResourceReference? Prescription { get; set; }
    public Period? BillablePeriod { get; set; }
    public Identifier[]? Identifier { get; set; }
    public Attachment? Form { get; set; }
    public CodeableConcept? SubType { get; set; }
    public CodeableConcept? FundsReserveRequested { get; set; }
    public Period? BenefitPeriod { get; set; }
    public long? Precedence { get; set; }
    public CodeableConcept? FormCode { get; set; }
    public ResourceReference? Provider { get; set; }
    public ExplanationOfBenefitAddItem[]? AddItem { get; set; }
    public ResourceReference? OriginalPrescription { get; set; }
    public ExplanationOfBenefitCareTeam[]? CareTeam { get; set; }
    public ResourceReference? Claim { get; set; }
    
    public class ExplanationOfBenefitInsurance : BackboneElement
    {
        public bool? Focal { get; set; }
        public ResourceReference? Coverage { get; set; }
        public string[]? PreAuthRef { get; set; }
    }
    
    public class ExplanationOfBenefitBenefitBalanceFinancial : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public long? AllowedUnsignedInt { get; set; }
        public string? AllowedString { get; set; }
        public Money? AllowedMoney { get; set; }
        public long? UsedUnsignedInt { get; set; }
        public Money? UsedMoney { get; set; }
    }
    
    public class ExplanationOfBenefitBenefitBalance : BackboneElement
    {
        public CodeableConcept? Category { get; set; }
        public bool? Excluded { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public CodeableConcept? Network { get; set; }
        public CodeableConcept? Unit { get; set; }
        public CodeableConcept? Term { get; set; }
        public ExplanationOfBenefitBenefitBalanceFinancial[]? Financial { get; set; }
    }
    
    public class ExplanationOfBenefitProcessNote : BackboneElement
    {
        public long? Number { get; set; }
        public string? Type { get; set; }
        public string? Text { get; set; }
        public CodeableConcept? Language { get; set; }
    }
    
    public class ExplanationOfBenefitDiagnosis : BackboneElement
    {
        public long? Sequence { get; set; }
        public CodeableConcept? DiagnosisCodeableConcept { get; set; }
        public ResourceReference? DiagnosisReference { get; set; }
        public CodeableConcept[]? Type { get; set; }
        public CodeableConcept? OnAdmission { get; set; }
        public CodeableConcept? PackageCode { get; set; }
    }
    
    public class ExplanationOfBenefitSupportingInfo : BackboneElement
    {
        public CodeableConcept? Category { get; set; }
        public ResourceReference? ValueReference { get; set; }
        public Quantity? ValueQuantity { get; set; }
        public Period? TimingPeriod { get; set; }
        public string? ValueString { get; set; }
        public bool? ValueBoolean { get; set; }
        public Coding? Reason { get; set; }
        public long? Sequence { get; set; }
        public CodeableConcept? Code { get; set; }
        public string? TimingDate { get; set; }
        public Attachment? ValueAttachment { get; set; }
    }
    
    public class ExplanationOfBenefitPayment : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public Money? Adjustment { get; set; }
        public CodeableConcept? AdjustmentReason { get; set; }
        public string? Date { get; set; }
        public Money? Amount { get; set; }
        public Identifier? Identifier { get; set; }
    }
    
    public class ExplanationOfBenefitItemAdjudication : BackboneElement
    {
        public CodeableConcept? Category { get; set; }
        public CodeableConcept? Reason { get; set; }
        public Money? Amount { get; set; }
        public decimal? Value { get; set; }
    }
    
    public class ExplanationOfBenefitItemDetailSubDetail : BackboneElement
    {
        public CodeableConcept? Category { get; set; }
        public CodeableConcept[]? Modifier { get; set; }
        public CodeableConcept? Revenue { get; set; }
        public ExplanationOfBenefitItemAdjudication[]? Adjudication { get; set; }
        public Money? Net { get; set; }
        public CodeableConcept? ProductOrService { get; set; }
        public ResourceReference[]? Udi { get; set; }
        public CodeableConcept[]? ProgramCode { get; set; }
        public decimal? Factor { get; set; }
        public long? Sequence { get; set; }
        public Quantity? Quantity { get; set; }
        public long[]? NoteNumber { get; set; }
        public Money? UnitPrice { get; set; }
    }
    
    public class ExplanationOfBenefitItemDetail : BackboneElement
    {
        public CodeableConcept? Category { get; set; }
        public CodeableConcept[]? Modifier { get; set; }
        public CodeableConcept? Revenue { get; set; }
        public ExplanationOfBenefitItemAdjudication[]? Adjudication { get; set; }
        public Money? Net { get; set; }
        public CodeableConcept? ProductOrService { get; set; }
        public ResourceReference[]? Udi { get; set; }
        public CodeableConcept[]? ProgramCode { get; set; }
        public decimal? Factor { get; set; }
        public long? Sequence { get; set; }
        public ExplanationOfBenefitItemDetailSubDetail[]? SubDetail { get; set; }
        public Quantity? Quantity { get; set; }
        public long[]? NoteNumber { get; set; }
        public Money? UnitPrice { get; set; }
    }
    
    public class ExplanationOfBenefitItem : BackboneElement
    {
        public CodeableConcept? Category { get; set; }
        public long[]? DiagnosisSequence { get; set; }
        public long[]? ProcedureSequence { get; set; }
        public Address? LocationAddress { get; set; }
        public CodeableConcept[]? Modifier { get; set; }
        public CodeableConcept? Revenue { get; set; }
        public ExplanationOfBenefitItemAdjudication[]? Adjudication { get; set; }
        public ResourceReference[]? Encounter { get; set; }
        public CodeableConcept? LocationCodeableConcept { get; set; }
        public Money? Net { get; set; }
        public CodeableConcept[]? SubSite { get; set; }
        public long[]? CareTeamSequence { get; set; }
        public CodeableConcept? ProductOrService { get; set; }
        public ResourceReference? LocationReference { get; set; }
        public ResourceReference[]? Udi { get; set; }
        public long[]? InformationSequence { get; set; }
        public CodeableConcept[]? ProgramCode { get; set; }
        public decimal? Factor { get; set; }
        public string? ServicedDate { get; set; }
        public long? Sequence { get; set; }
        public CodeableConcept? BodySite { get; set; }
        public Quantity? Quantity { get; set; }
        public long[]? NoteNumber { get; set; }
        public Money? UnitPrice { get; set; }
        public Period? ServicedPeriod { get; set; }
        public ExplanationOfBenefitItemDetail[]? Detail { get; set; }
    }
    
    public class ExplanationOfBenefitProcedure : BackboneElement
    {
        public long? Sequence { get; set; }
        public CodeableConcept[]? Type { get; set; }
        public string? Date { get; set; }
        public CodeableConcept? ProcedureCodeableConcept { get; set; }
        public ResourceReference? ProcedureReference { get; set; }
        public ResourceReference[]? Udi { get; set; }
    }
    
    public class ExplanationOfBenefitRelated : BackboneElement
    {
        public ResourceReference? Claim { get; set; }
        public CodeableConcept? Relationship { get; set; }
        public Identifier? Reference { get; set; }
    }
    
    public class ExplanationOfBenefitTotal : BackboneElement
    {
        public CodeableConcept? Category { get; set; }
        public Money? Amount { get; set; }
    }
    
    public class ExplanationOfBenefitAccident : BackboneElement
    {
        public string? Date { get; set; }
        public CodeableConcept? Type { get; set; }
        public Address? LocationAddress { get; set; }
        public ResourceReference? LocationReference { get; set; }
    }
    
    public class ExplanationOfBenefitPayee : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public ResourceReference? Party { get; set; }
    }
    
    public class ExplanationOfBenefitAddItemDetailSubDetail : BackboneElement
    {
        public CodeableConcept? ProductOrService { get; set; }
        public CodeableConcept[]? Modifier { get; set; }
        public Quantity? Quantity { get; set; }
        public Money? UnitPrice { get; set; }
        public decimal? Factor { get; set; }
        public Money? Net { get; set; }
        public long[]? NoteNumber { get; set; }
        public ExplanationOfBenefitItemAdjudication[]? Adjudication { get; set; }
    }
    
    public class ExplanationOfBenefitAddItemDetail : BackboneElement
    {
        public CodeableConcept[]? Modifier { get; set; }
        public ExplanationOfBenefitItemAdjudication[]? Adjudication { get; set; }
        public Money? Net { get; set; }
        public CodeableConcept? ProductOrService { get; set; }
        public decimal? Factor { get; set; }
        public ExplanationOfBenefitAddItemDetailSubDetail[]? SubDetail { get; set; }
        public Quantity? Quantity { get; set; }
        public long[]? NoteNumber { get; set; }
        public Money? UnitPrice { get; set; }
    }
    
    public class ExplanationOfBenefitAddItem : BackboneElement
    {
        public Address? LocationAddress { get; set; }
        public CodeableConcept[]? Modifier { get; set; }
        public ExplanationOfBenefitItemAdjudication[]? Adjudication { get; set; }
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
        public long[]? SubDetailSequence { get; set; }
        public CodeableConcept? BodySite { get; set; }
        public Quantity? Quantity { get; set; }
        public ResourceReference[]? Provider { get; set; }
        public long[]? NoteNumber { get; set; }
        public Money? UnitPrice { get; set; }
        public Period? ServicedPeriod { get; set; }
        public ExplanationOfBenefitAddItemDetail[]? Detail { get; set; }
    }
    
    public class ExplanationOfBenefitCareTeam : BackboneElement
    {
        public long? Sequence { get; set; }
        public ResourceReference? Provider { get; set; }
        public bool? Responsible { get; set; }
        public CodeableConcept? Role { get; set; }
        public CodeableConcept? Qualification { get; set; }
    }
    
}

