
namespace Aidbox.FHIR.R4.Core;

public class MedicinalProductIngredient : DomainResource
{
    public Identifier? Identifier { get; set; }
    public CodeableConcept? Role { get; set; }
    public bool? AllergenicIndicator { get; set; }
    public ResourceReference[]? Manufacturer { get; set; }
    public MedicinalProductIngredientSpecifiedSubstance[]? SpecifiedSubstance { get; set; }
    public MedicinalProductIngredientSubstance? Substance { get; set; }
    
    public class MedicinalProductIngredientSpecifiedSubstanceStrengthReferenceStrength : BackboneElement
    {
        public CodeableConcept? Substance { get; set; }
        public Ratio? Strength { get; set; }
        public Ratio? StrengthLowLimit { get; set; }
        public string? MeasurementPoint { get; set; }
        public CodeableConcept[]? Country { get; set; }
    }
    
    public class MedicinalProductIngredientSpecifiedSubstanceStrength : BackboneElement
    {
        public Ratio? Presentation { get; set; }
        public Ratio? PresentationLowLimit { get; set; }
        public Ratio? Concentration { get; set; }
        public Ratio? ConcentrationLowLimit { get; set; }
        public string? MeasurementPoint { get; set; }
        public CodeableConcept[]? Country { get; set; }
        public MedicinalProductIngredientSpecifiedSubstanceStrengthReferenceStrength[]? ReferenceStrength { get; set; }
    }
    
    public class MedicinalProductIngredientSpecifiedSubstance : BackboneElement
    {
        public CodeableConcept? Code { get; set; }
        public CodeableConcept? Group { get; set; }
        public CodeableConcept? Confidentiality { get; set; }
        public MedicinalProductIngredientSpecifiedSubstanceStrength[]? Strength { get; set; }
    }
    
    public class MedicinalProductIngredientSubstance : BackboneElement
    {
        public CodeableConcept? Code { get; set; }
        public MedicinalProductIngredientSpecifiedSubstanceStrength[]? Strength { get; set; }
    }
    
}

