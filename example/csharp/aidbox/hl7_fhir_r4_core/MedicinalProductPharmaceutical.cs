
namespace Aidbox.FHIR.R4.Core;

public class MedicinalProductPharmaceutical : DomainResource
{
    public Identifier[]? Identifier { get; set; }
    public CodeableConcept? AdministrableDoseForm { get; set; }
    public CodeableConcept? UnitOfPresentation { get; set; }
    public ResourceReference[]? Ingredient { get; set; }
    public ResourceReference[]? Device { get; set; }
    public MedicinalProductPharmaceuticalCharacteristics[]? Characteristics { get; set; }
    public MedicinalProductPharmaceuticalRouteOfAdministration[]? RouteOfAdministration { get; set; }
    
    public class MedicinalProductPharmaceuticalCharacteristics : BackboneElement
    {
        public CodeableConcept? Code { get; set; }
        public CodeableConcept? Status { get; set; }
    }
    
    public class MedicinalProductPharmaceuticalRouteOfAdministrationTargetSpeciesWithdrawalPeriod : BackboneElement
    {
        public CodeableConcept? Tissue { get; set; }
        public Quantity? Value { get; set; }
        public string? SupportingInformation { get; set; }
    }
    
    public class MedicinalProductPharmaceuticalRouteOfAdministrationTargetSpecies : BackboneElement
    {
        public CodeableConcept? Code { get; set; }
        public MedicinalProductPharmaceuticalRouteOfAdministrationTargetSpeciesWithdrawalPeriod[]? WithdrawalPeriod { get; set; }
    }
    
    public class MedicinalProductPharmaceuticalRouteOfAdministration : BackboneElement
    {
        public CodeableConcept? Code { get; set; }
        public Quantity? FirstDose { get; set; }
        public Quantity? MaxSingleDose { get; set; }
        public Quantity? MaxDosePerDay { get; set; }
        public Ratio? MaxDosePerTreatmentPeriod { get; set; }
        public Duration? MaxTreatmentPeriod { get; set; }
        public MedicinalProductPharmaceuticalRouteOfAdministrationTargetSpecies[]? TargetSpecies { get; set; }
    }
    
}

