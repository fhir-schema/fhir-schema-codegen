
namespace Aidbox.FHIR.R4.Core;

public class MedicinalProductPackaged : DomainResource
{
    public string? Description { get; set; }
    public MarketingStatus[]? MarketingStatus { get; set; }
    public ResourceReference? MarketingAuthorization { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference[]? Manufacturer { get; set; }
    public CodeableConcept? LegalStatusOfSupply { get; set; }
    public MedicinalProductPackagedBatchIdentifier[]? BatchIdentifier { get; set; }
    public ResourceReference[]? Subject { get; set; }
    public MedicinalProductPackagedPackageItem[]? PackageItem { get; set; }
    
    public class MedicinalProductPackagedBatchIdentifier : BackboneElement
    {
        public Identifier? OuterPackaging { get; set; }
        public Identifier? ImmediatePackaging { get; set; }
    }
    
    public class MedicinalProductPackagedPackageItem : BackboneElement
    {
        public ResourceReference[]? ManufacturedItem { get; set; }
        public CodeableConcept[]? OtherCharacteristics { get; set; }
        public ProductShelfLife[]? ShelfLifeStorage { get; set; }
        public CodeableConcept[]? AlternateMaterial { get; set; }
        public CodeableConcept? Type { get; set; }
        public CodeableConcept[]? Material { get; set; }
        public Identifier[]? Identifier { get; set; }
        public ResourceReference[]? Manufacturer { get; set; }
        public ResourceReference[]? Device { get; set; }
        public Quantity? Quantity { get; set; }
        public ProdCharacteristic? PhysicalCharacteristics { get; set; }
        public MedicinalProductPackagedPackageItem[]? PackageItem { get; set; }
    }
    
}

