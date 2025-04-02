
namespace Aidbox.FHIR.R4.Core;

public class Encounter : DomainResource
{
    public ResourceReference[]? Appointment { get; set; }
    public EncounterDiagnosis[]? Diagnosis { get; set; }
    public ResourceReference? ServiceProvider { get; set; }
    public ResourceReference[]? EpisodeOfCare { get; set; }
    public CodeableConcept[]? ReasonCode { get; set; }
    public CodeableConcept[]? Type { get; set; }
    public EncounterParticipant[]? Participant { get; set; }
    public CodeableConcept? ServiceType { get; set; }
    public ResourceReference[]? Account { get; set; }
    public EncounterClassHistory[]? ClassHistory { get; set; }
    public CodeableConcept? Priority { get; set; }
    public string? Status { get; set; }
    public Coding? Class { get; set; }
    public Duration? Length { get; set; }
    public Identifier[]? Identifier { get; set; }
    public EncounterHospitalization? Hospitalization { get; set; }
    public Period? Period { get; set; }
    public ResourceReference[]? BasedOn { get; set; }
    public ResourceReference? PartOf { get; set; }
    public EncounterLocation[]? Location { get; set; }
    public ResourceReference? Subject { get; set; }
    public EncounterStatusHistory[]? StatusHistory { get; set; }
    public ResourceReference[]? ReasonReference { get; set; }
    
    public class EncounterDiagnosis : BackboneElement
    {
        public ResourceReference? Condition { get; set; }
        public CodeableConcept? Use { get; set; }
        public long? Rank { get; set; }
    }
    
    public class EncounterParticipant : BackboneElement
    {
        public CodeableConcept[]? Type { get; set; }
        public Period? Period { get; set; }
        public ResourceReference? Individual { get; set; }
    }
    
    public class EncounterClassHistory : BackboneElement
    {
        public Coding? Class { get; set; }
        public Period? Period { get; set; }
    }
    
    public class EncounterHospitalization : BackboneElement
    {
        public CodeableConcept? DischargeDisposition { get; set; }
        public Identifier? PreAdmissionIdentifier { get; set; }
        public CodeableConcept[]? SpecialArrangement { get; set; }
        public CodeableConcept[]? DietPreference { get; set; }
        public CodeableConcept? AdmitSource { get; set; }
        public CodeableConcept[]? SpecialCourtesy { get; set; }
        public CodeableConcept? ReAdmission { get; set; }
        public ResourceReference? Origin { get; set; }
        public ResourceReference? Destination { get; set; }
    }
    
    public class EncounterLocation : BackboneElement
    {
        public ResourceReference? Location { get; set; }
        public string? Status { get; set; }
        public CodeableConcept? PhysicalType { get; set; }
        public Period? Period { get; set; }
    }
    
    public class EncounterStatusHistory : BackboneElement
    {
        public string? Status { get; set; }
        public Period? Period { get; set; }
    }
    
}

