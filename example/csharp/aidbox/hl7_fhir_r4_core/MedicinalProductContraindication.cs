
namespace Aidbox.FHIR.R4.Core;

public class MedicinalProductContraindication : DomainResource
{
    public ResourceReference[]? Subject { get; set; }
    public CodeableConcept? Disease { get; set; }
    public CodeableConcept? DiseaseStatus { get; set; }
    public CodeableConcept[]? Comorbidity { get; set; }
    public ResourceReference[]? TherapeuticIndication { get; set; }
    public MedicinalProductContraindicationOtherTherapy[]? OtherTherapy { get; set; }
    public Population[]? Population { get; set; }
    
    public class MedicinalProductContraindicationOtherTherapy : BackboneElement
    {
        public CodeableConcept? TherapyRelationshipType { get; set; }
        public CodeableConcept? MedicationCodeableConcept { get; set; }
        public ResourceReference? MedicationReference { get; set; }
    }
    
}

