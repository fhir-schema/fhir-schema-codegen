
namespace Aidbox.FHIR.R4.Core;

public class MedicinalProduct : DomainResource
{
    public CodeableConcept? AdditionalMonitoringIndicator { get; set; }
    public MedicinalProductManufacturingBusinessOperation[]? ManufacturingBusinessOperation { get; set; }
    public CodeableConcept? CombinedPharmaceuticalDoseForm { get; set; }
    public ResourceReference[]? ClinicalTrial { get; set; }
    public CodeableConcept[]? ProductClassification { get; set; }
    public MedicinalProductName[]? Name { get; set; }
    public ResourceReference[]? MasterFile { get; set; }
    public ResourceReference[]? PharmaceuticalProduct { get; set; }
    public CodeableConcept? Type { get; set; }
    public MarketingStatus[]? MarketingStatus { get; set; }
    public string[]? SpecialMeasures { get; set; }
    public MedicinalProductSpecialDesignation[]? SpecialDesignation { get; set; }
    public ResourceReference[]? PackagedMedicinalProduct { get; set; }
    public Identifier[]? Identifier { get; set; }
    public Identifier[]? CrossReference { get; set; }
    public ResourceReference[]? AttachedDocument { get; set; }
    public Coding? Domain { get; set; }
    public CodeableConcept? LegalStatusOfSupply { get; set; }
    public CodeableConcept? PaediatricUseIndicator { get; set; }
    public ResourceReference[]? Contact { get; set; }
    
    public class MedicinalProductManufacturingBusinessOperation : BackboneElement
    {
        public CodeableConcept? OperationType { get; set; }
        public Identifier? AuthorisationReferenceNumber { get; set; }
        public string? EffectiveDate { get; set; }
        public CodeableConcept? ConfidentialityIndicator { get; set; }
        public ResourceReference[]? Manufacturer { get; set; }
        public ResourceReference? Regulator { get; set; }
    }
    
    public class MedicinalProductNameNamePart : BackboneElement
    {
        public string? Part { get; set; }
        public Coding? Type { get; set; }
    }
    
    public class MedicinalProductNameCountryLanguage : BackboneElement
    {
        public CodeableConcept? Country { get; set; }
        public CodeableConcept? Jurisdiction { get; set; }
        public CodeableConcept? Language { get; set; }
    }
    
    public class MedicinalProductName : BackboneElement
    {
        public string? ProductName { get; set; }
        public MedicinalProductNameNamePart[]? NamePart { get; set; }
        public MedicinalProductNameCountryLanguage[]? CountryLanguage { get; set; }
    }
    
    public class MedicinalProductSpecialDesignation : BackboneElement
    {
        public string? Date { get; set; }
        public CodeableConcept? Species { get; set; }
        public CodeableConcept? Type { get; set; }
        public CodeableConcept? IntendedUse { get; set; }
        public CodeableConcept? Status { get; set; }
        public Identifier[]? Identifier { get; set; }
        public CodeableConcept? IndicationCodeableConcept { get; set; }
        public ResourceReference? IndicationReference { get; set; }
    }
    
}

