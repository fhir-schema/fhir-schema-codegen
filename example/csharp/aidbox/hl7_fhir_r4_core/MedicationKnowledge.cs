
namespace Aidbox.FHIR.R4.Core;

public class MedicationKnowledge : DomainResource
{
    public string? PreparationInstruction { get; set; }
    public Quantity? Amount { get; set; }
    public MedicationKnowledgeMonograph[]? Monograph { get; set; }
    public MedicationKnowledgeRegulatory[]? Regulatory { get; set; }
    public CodeableConcept? DoseForm { get; set; }
    public CodeableConcept[]? IntendedRoute { get; set; }
    public MedicationKnowledgeDrugCharacteristic[]? DrugCharacteristic { get; set; }
    public MedicationKnowledgePackaging? Packaging { get; set; }
    public MedicationKnowledgeRelatedMedicationKnowledge[]? RelatedMedicationKnowledge { get; set; }
    public MedicationKnowledgeMedicineClassification[]? MedicineClassification { get; set; }
    public MedicationKnowledgeKinetics[]? Kinetics { get; set; }
    public ResourceReference[]? AssociatedMedication { get; set; }
    public MedicationKnowledgeIngredient[]? Ingredient { get; set; }
    public MedicationKnowledgeMonitoringProgram[]? MonitoringProgram { get; set; }
    public ResourceReference[]? Contraindication { get; set; }
    public string? Status { get; set; }
    public CodeableConcept[]? ProductType { get; set; }
    public string[]? Synonym { get; set; }
    public CodeableConcept? Code { get; set; }
    public MedicationKnowledgeAdministrationGuidelines[]? AdministrationGuidelines { get; set; }
    public ResourceReference? Manufacturer { get; set; }
    public MedicationKnowledgeCost[]? Cost { get; set; }
    
    public class MedicationKnowledgeMonograph : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public ResourceReference? Source { get; set; }
    }
    
    public class MedicationKnowledgeRegulatorySubstitution : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public bool? Allowed { get; set; }
    }
    
    public class MedicationKnowledgeRegulatorySchedule : BackboneElement
    {
        public CodeableConcept? Schedule { get; set; }
    }
    
    public class MedicationKnowledgeRegulatoryMaxDispense : BackboneElement
    {
        public Quantity? Quantity { get; set; }
        public Duration? Period { get; set; }
    }
    
    public class MedicationKnowledgeRegulatory : BackboneElement
    {
        public ResourceReference? RegulatoryAuthority { get; set; }
        public MedicationKnowledgeRegulatorySubstitution[]? Substitution { get; set; }
        public MedicationKnowledgeRegulatorySchedule[]? Schedule { get; set; }
        public MedicationKnowledgeRegulatoryMaxDispense? MaxDispense { get; set; }
    }
    
    public class MedicationKnowledgeDrugCharacteristic : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public CodeableConcept? ValueCodeableConcept { get; set; }
        public string? ValueString { get; set; }
        public Quantity? ValueQuantity { get; set; }
        public string? ValueBase64Binary { get; set; }
    }
    
    public class MedicationKnowledgePackaging : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public Quantity? Quantity { get; set; }
    }
    
    public class MedicationKnowledgeRelatedMedicationKnowledge : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public ResourceReference[]? Reference { get; set; }
    }
    
    public class MedicationKnowledgeMedicineClassification : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public CodeableConcept[]? Classification { get; set; }
    }
    
    public class MedicationKnowledgeKinetics : BackboneElement
    {
        public Quantity[]? AreaUnderCurve { get; set; }
        public Quantity[]? LethalDose50 { get; set; }
        public Duration? HalfLifePeriod { get; set; }
    }
    
    public class MedicationKnowledgeIngredient : BackboneElement
    {
        public CodeableConcept? ItemCodeableConcept { get; set; }
        public ResourceReference? ItemReference { get; set; }
        public bool? IsActive { get; set; }
        public Ratio? Strength { get; set; }
    }
    
    public class MedicationKnowledgeMonitoringProgram : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public string? Name { get; set; }
    }
    
    public class MedicationKnowledgeAdministrationGuidelinesDosage : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public Dosage[]? Dosage { get; set; }
    }
    
    public class MedicationKnowledgeAdministrationGuidelinesPatientCharacteristics : BackboneElement
    {
        public CodeableConcept? CharacteristicCodeableConcept { get; set; }
        public Quantity? CharacteristicQuantity { get; set; }
        public string[]? Value { get; set; }
    }
    
    public class MedicationKnowledgeAdministrationGuidelines : BackboneElement
    {
        public MedicationKnowledgeAdministrationGuidelinesDosage[]? Dosage { get; set; }
        public CodeableConcept? IndicationCodeableConcept { get; set; }
        public ResourceReference? IndicationReference { get; set; }
        public MedicationKnowledgeAdministrationGuidelinesPatientCharacteristics[]? PatientCharacteristics { get; set; }
    }
    
    public class MedicationKnowledgeCost : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public string? Source { get; set; }
        public Money? Cost { get; set; }
    }
    
}

