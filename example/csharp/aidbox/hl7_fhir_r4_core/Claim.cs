
namespace Aidbox.FHIR.R4.Core;

public class Claim : DomainResource
{
    public ResourceReference? Patient { get; set; }
    public ClaimInsurance[]? Insurance { get; set; }
    public ResourceReference? Facility { get; set; }
    public ClaimDiagnosis[]? Diagnosis { get; set; }
    public ResourceReference? Enterer { get; set; }
    public ClaimSupportingInfo[]? SupportingInfo { get; set; }
    public string? Use { get; set; }
    public ClaimItem[]? Item { get; set; }
    public CodeableConcept? Type { get; set; }
    public string? Created { get; set; }
    public ClaimProcedure[]? Procedure { get; set; }
    public ClaimRelated[]? Related { get; set; }
    public ResourceReference? Referral { get; set; }
    public Money? Total { get; set; }
    public ResourceReference? Insurer { get; set; }
    public CodeableConcept? FundsReserve { get; set; }
    public CodeableConcept? Priority { get; set; }
    public ClaimAccident? Accident { get; set; }
    public string? Status { get; set; }
    public ClaimPayee? Payee { get; set; }
    public ResourceReference? Prescription { get; set; }
    public Period? BillablePeriod { get; set; }
    public Identifier[]? Identifier { get; set; }
    public CodeableConcept? SubType { get; set; }
    public ResourceReference? Provider { get; set; }
    public ResourceReference? OriginalPrescription { get; set; }
    public ClaimCareTeam[]? CareTeam { get; set; }
    
    public class ClaimInsurance : BackboneElement
    {
        public long? Sequence { get; set; }
        public bool? Focal { get; set; }
        public Identifier? Identifier { get; set; }
        public ResourceReference? Coverage { get; set; }
        public string? BusinessArrangement { get; set; }
        public string[]? PreAuthRef { get; set; }
        public ResourceReference? ClaimResponse { get; set; }
    }
    
    public class ClaimDiagnosis : BackboneElement
    {
        public long? Sequence { get; set; }
        public CodeableConcept? DiagnosisCodeableConcept { get; set; }
        public ResourceReference? DiagnosisReference { get; set; }
        public CodeableConcept[]? Type { get; set; }
        public CodeableConcept? OnAdmission { get; set; }
        public CodeableConcept? PackageCode { get; set; }
    }
    
    public class ClaimSupportingInfo : BackboneElement
    {
        public CodeableConcept? Category { get; set; }
        public ResourceReference? ValueReference { get; set; }
        public Quantity? ValueQuantity { get; set; }
        public Period? TimingPeriod { get; set; }
        public string? ValueString { get; set; }
        public bool? ValueBoolean { get; set; }
        public CodeableConcept? Reason { get; set; }
        public long? Sequence { get; set; }
        public CodeableConcept? Code { get; set; }
        public string? TimingDate { get; set; }
        public Attachment? ValueAttachment { get; set; }
    }
    
    public class ClaimItemDetailSubDetail : BackboneElement
    {
        public CodeableConcept? Category { get; set; }
        public CodeableConcept[]? Modifier { get; set; }
        public CodeableConcept? Revenue { get; set; }
        public Money? Net { get; set; }
        public CodeableConcept? ProductOrService { get; set; }
        public ResourceReference[]? Udi { get; set; }
        public CodeableConcept[]? ProgramCode { get; set; }
        public decimal? Factor { get; set; }
        public long? Sequence { get; set; }
        public Quantity? Quantity { get; set; }
        public Money? UnitPrice { get; set; }
    }
    
    public class ClaimItemDetail : BackboneElement
    {
        public CodeableConcept? Category { get; set; }
        public CodeableConcept[]? Modifier { get; set; }
        public CodeableConcept? Revenue { get; set; }
        public Money? Net { get; set; }
        public CodeableConcept? ProductOrService { get; set; }
        public ResourceReference[]? Udi { get; set; }
        public CodeableConcept[]? ProgramCode { get; set; }
        public decimal? Factor { get; set; }
        public long? Sequence { get; set; }
        public ClaimItemDetailSubDetail[]? SubDetail { get; set; }
        public Quantity? Quantity { get; set; }
        public Money? UnitPrice { get; set; }
    }
    
    public class ClaimItem : BackboneElement
    {
        public CodeableConcept? Category { get; set; }
        public long[]? DiagnosisSequence { get; set; }
        public long[]? ProcedureSequence { get; set; }
        public Address? LocationAddress { get; set; }
        public CodeableConcept[]? Modifier { get; set; }
        public CodeableConcept? Revenue { get; set; }
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
        public Money? UnitPrice { get; set; }
        public Period? ServicedPeriod { get; set; }
        public ClaimItemDetail[]? Detail { get; set; }
    }
    
    public class ClaimProcedure : BackboneElement
    {
        public long? Sequence { get; set; }
        public CodeableConcept[]? Type { get; set; }
        public string? Date { get; set; }
        public CodeableConcept? ProcedureCodeableConcept { get; set; }
        public ResourceReference? ProcedureReference { get; set; }
        public ResourceReference[]? Udi { get; set; }
    }
    
    public class ClaimRelated : BackboneElement
    {
        public ResourceReference? Claim { get; set; }
        public CodeableConcept? Relationship { get; set; }
        public Identifier? Reference { get; set; }
    }
    
    public class ClaimAccident : BackboneElement
    {
        public string? Date { get; set; }
        public CodeableConcept? Type { get; set; }
        public Address? LocationAddress { get; set; }
        public ResourceReference? LocationReference { get; set; }
    }
    
    public class ClaimPayee : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public ResourceReference? Party { get; set; }
    }
    
    public class ClaimCareTeam : BackboneElement
    {
        public long? Sequence { get; set; }
        public ResourceReference? Provider { get; set; }
        public bool? Responsible { get; set; }
        public CodeableConcept? Role { get; set; }
        public CodeableConcept? Qualification { get; set; }
    }
    
}

