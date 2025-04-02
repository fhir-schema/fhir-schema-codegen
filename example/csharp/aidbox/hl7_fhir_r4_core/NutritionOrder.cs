
namespace Aidbox.FHIR.R4.Core;

public class NutritionOrder : DomainResource
{
    public ResourceReference? Patient { get; set; }
    public NutritionOrderOralDiet? OralDiet { get; set; }
    public string[]? InstantiatesCanonical { get; set; }
    public string[]? InstantiatesUri { get; set; }
    public string[]? Instantiates { get; set; }
    public ResourceReference? Encounter { get; set; }
    public Annotation[]? Note { get; set; }
    public string? DateTime { get; set; }
    public NutritionOrderEnteralFormula? EnteralFormula { get; set; }
    public CodeableConcept[]? FoodPreferenceModifier { get; set; }
    public string? Status { get; set; }
    public CodeableConcept[]? ExcludeFoodModifier { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? Intent { get; set; }
    public ResourceReference? Orderer { get; set; }
    public NutritionOrderSupplement[]? Supplement { get; set; }
    public ResourceReference[]? AllergyIntolerance { get; set; }
    
    public class NutritionOrderOralDietNutrient : BackboneElement
    {
        public CodeableConcept? Modifier { get; set; }
        public Quantity? Amount { get; set; }
    }
    
    public class NutritionOrderOralDietTexture : BackboneElement
    {
        public CodeableConcept? Modifier { get; set; }
        public CodeableConcept? FoodType { get; set; }
    }
    
    public class NutritionOrderOralDiet : BackboneElement
    {
        public CodeableConcept[]? Type { get; set; }
        public Timing[]? Schedule { get; set; }
        public NutritionOrderOralDietNutrient[]? Nutrient { get; set; }
        public NutritionOrderOralDietTexture[]? Texture { get; set; }
        public CodeableConcept[]? FluidConsistencyType { get; set; }
        public string? Instruction { get; set; }
    }
    
    public class NutritionOrderEnteralFormulaAdministration : BackboneElement
    {
        public Timing? Schedule { get; set; }
        public Quantity? Quantity { get; set; }
        public Quantity? RateQuantity { get; set; }
        public Ratio? RateRatio { get; set; }
    }
    
    public class NutritionOrderEnteralFormula : BackboneElement
    {
        public CodeableConcept? AdditiveType { get; set; }
        public Quantity? MaxVolumeToDeliver { get; set; }
        public CodeableConcept? BaseFormulaType { get; set; }
        public CodeableConcept? RouteofAdministration { get; set; }
        public string? AdditiveProductName { get; set; }
        public Quantity? CaloricDensity { get; set; }
        public string? AdministrationInstruction { get; set; }
        public NutritionOrderEnteralFormulaAdministration[]? Administration { get; set; }
        public string? BaseFormulaProductName { get; set; }
    }
    
    public class NutritionOrderSupplement : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public string? ProductName { get; set; }
        public Timing[]? Schedule { get; set; }
        public Quantity? Quantity { get; set; }
        public string? Instruction { get; set; }
    }
    
}

