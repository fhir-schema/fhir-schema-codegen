
namespace Aidbox.FHIR.R4.Core;

public class Immunization : DomainResource
{
    public ResourceReference? Patient { get; set; }
    public bool? IsSubpotent { get; set; }
    public CodeableConcept? ReportOrigin { get; set; }
    public ImmunizationProtocolApplied[]? ProtocolApplied { get; set; }
    public CodeableConcept? Site { get; set; }
    public ResourceReference? Encounter { get; set; }
    public CodeableConcept? VaccineCode { get; set; }
    public Quantity? DoseQuantity { get; set; }
    public CodeableConcept[]? ReasonCode { get; set; }
    public CodeableConcept? StatusReason { get; set; }
    public CodeableConcept? Route { get; set; }
    public string? Recorded { get; set; }
    public CodeableConcept[]? ProgramEligibility { get; set; }
    public Annotation[]? Note { get; set; }
    public bool? PrimarySource { get; set; }
    public string? Status { get; set; }
    public string? LotNumber { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference? Manufacturer { get; set; }
    public ImmunizationEducation[]? Education { get; set; }
    public string? OccurrenceString { get; set; }
    public ImmunizationReaction[]? Reaction { get; set; }
    public ResourceReference? Location { get; set; }
    public string? OccurrenceDateTime { get; set; }
    public CodeableConcept? FundingSource { get; set; }
    public CodeableConcept[]? SubpotentReason { get; set; }
    public string? ExpirationDate { get; set; }
    public ImmunizationPerformer[]? Performer { get; set; }
    public ResourceReference[]? ReasonReference { get; set; }
    
    public class ImmunizationProtocolApplied : BackboneElement
    {
        public long? SeriesDosesPositiveInt { get; set; }
        public long? DoseNumberPositiveInt { get; set; }
        public string? Series { get; set; }
        public ResourceReference? Authority { get; set; }
        public string? DoseNumberString { get; set; }
        public string? SeriesDosesString { get; set; }
        public CodeableConcept[]? TargetDisease { get; set; }
    }
    
    public class ImmunizationEducation : BackboneElement
    {
        public string? DocumentType { get; set; }
        public string? Reference { get; set; }
        public string? PublicationDate { get; set; }
        public string? PresentationDate { get; set; }
    }
    
    public class ImmunizationReaction : BackboneElement
    {
        public string? Date { get; set; }
        public ResourceReference? Detail { get; set; }
        public bool? Reported { get; set; }
    }
    
    public class ImmunizationPerformer : BackboneElement
    {
        public CodeableConcept? Function { get; set; }
        public ResourceReference? Actor { get; set; }
    }
    
}

