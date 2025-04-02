
namespace Aidbox.FHIR.R4.Core;

public class MedicinalProductManufactured : DomainResource
{
    public CodeableConcept? ManufacturedDoseForm { get; set; }
    public CodeableConcept? UnitOfPresentation { get; set; }
    public Quantity? Quantity { get; set; }
    public ResourceReference[]? Manufacturer { get; set; }
    public ResourceReference[]? Ingredient { get; set; }
    public ProdCharacteristic? PhysicalCharacteristics { get; set; }
    public CodeableConcept[]? OtherCharacteristics { get; set; }
}

