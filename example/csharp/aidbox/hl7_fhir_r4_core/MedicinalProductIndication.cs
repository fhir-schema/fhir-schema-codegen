
namespace Aidbox.FHIR.R4.Core;

public class MedicinalProductIndication : DomainResource
{
    public CodeableConcept? DiseaseSymptomProcedure { get; set; }
    public ResourceReference[]? UndesirableEffect { get; set; }
    public Quantity? Duration { get; set; }
    public MedicinalProductIndicationOtherTherapy[]? OtherTherapy { get; set; }
    public CodeableConcept[]? Comorbidity { get; set; }
    public CodeableConcept? IntendedEffect { get; set; }
    public Population[]? Population { get; set; }
    public CodeableConcept? DiseaseStatus { get; set; }
    public ResourceReference[]? Subject { get; set; }
    
    public class MedicinalProductIndicationOtherTherapy : BackboneElement
    {
        public CodeableConcept? TherapyRelationshipType { get; set; }
        public CodeableConcept? MedicationCodeableConcept { get; set; }
        public ResourceReference? MedicationReference { get; set; }
    }
    
}

