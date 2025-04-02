
namespace Aidbox.FHIR.R4.Core;

public class Medication : DomainResource
{
    public Identifier[]? Identifier { get; set; }
    public CodeableConcept? Code { get; set; }
    public string? Status { get; set; }
    public ResourceReference? Manufacturer { get; set; }
    public CodeableConcept? Form { get; set; }
    public Ratio? Amount { get; set; }
    public MedicationIngredient[]? Ingredient { get; set; }
    public MedicationBatch? Batch { get; set; }
    
    public class MedicationIngredient : BackboneElement
    {
        public CodeableConcept? ItemCodeableConcept { get; set; }
        public ResourceReference? ItemReference { get; set; }
        public bool? IsActive { get; set; }
        public Ratio? Strength { get; set; }
    }
    
    public class MedicationBatch : BackboneElement
    {
        public string? LotNumber { get; set; }
        public string? ExpirationDate { get; set; }
    }
    
}

