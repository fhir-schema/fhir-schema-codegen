
namespace Aidbox.FHIR.R4.Core;

public class MedicinalProductAuthorization : DomainResource
{
    public Period? DataExclusivityPeriod { get; set; }
    public string? RestoreDate { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public MedicinalProductAuthorizationJurisdictionalAuthorization[]? JurisdictionalAuthorization { get; set; }
    public MedicinalProductAuthorizationProcedure? Procedure { get; set; }
    public CodeableConcept? LegalBasis { get; set; }
    public Period? ValidityPeriod { get; set; }
    public ResourceReference? Regulator { get; set; }
    public CodeableConcept? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? StatusDate { get; set; }
    public string? DateOfFirstAuthorization { get; set; }
    public string? InternationalBirthDate { get; set; }
    public ResourceReference? Holder { get; set; }
    public CodeableConcept[]? Country { get; set; }
    public ResourceReference? Subject { get; set; }
    
    public class MedicinalProductAuthorizationJurisdictionalAuthorization : BackboneElement
    {
        public Identifier[]? Identifier { get; set; }
        public CodeableConcept? Country { get; set; }
        public CodeableConcept[]? Jurisdiction { get; set; }
        public CodeableConcept? LegalStatusOfSupply { get; set; }
        public Period? ValidityPeriod { get; set; }
    }
    
    public class MedicinalProductAuthorizationProcedure : BackboneElement
    {
        public Identifier? Identifier { get; set; }
        public CodeableConcept? Type { get; set; }
        public Period? DatePeriod { get; set; }
        public string? DateDateTime { get; set; }
        public MedicinalProductAuthorizationProcedure[]? Application { get; set; }
    }
    
}

