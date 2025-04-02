
namespace Aidbox.FHIR.R4.Core;

public class DeviceDefinition : DomainResource
{
    public DeviceDefinitionDeviceName[]? DeviceName { get; set; }
    public ProductShelfLife[]? ShelfLifeStorage { get; set; }
    public DeviceDefinitionProperty[]? Property { get; set; }
    public string? ManufacturerString { get; set; }
    public string? ModelNumber { get; set; }
    public DeviceDefinitionUdiDeviceIdentifier[]? UdiDeviceIdentifier { get; set; }
    public CodeableConcept? Type { get; set; }
    public ResourceReference? ManufacturerReference { get; set; }
    public DeviceDefinitionCapability[]? Capability { get; set; }
    public DeviceDefinitionSpecialization[]? Specialization { get; set; }
    public ResourceReference? ParentDevice { get; set; }
    public Annotation[]? Note { get; set; }
    public CodeableConcept[]? LanguageCode { get; set; }
    public CodeableConcept[]? Safety { get; set; }
    public DeviceDefinitionMaterial[]? Material { get; set; }
    public string? Url { get; set; }
    public Identifier[]? Identifier { get; set; }
    public Quantity? Quantity { get; set; }
    public string[]? Version { get; set; }
    public ContactPoint[]? Contact { get; set; }
    public ResourceReference? Owner { get; set; }
    public string? OnlineInformation { get; set; }
    public ProdCharacteristic? PhysicalCharacteristics { get; set; }
    
    public class DeviceDefinitionDeviceName : BackboneElement
    {
        public string? Name { get; set; }
        public string? Type { get; set; }
    }
    
    public class DeviceDefinitionProperty : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public Quantity[]? ValueQuantity { get; set; }
        public CodeableConcept[]? ValueCode { get; set; }
    }
    
    public class DeviceDefinitionUdiDeviceIdentifier : BackboneElement
    {
        public string? DeviceIdentifier { get; set; }
        public string? Issuer { get; set; }
        public string? Jurisdiction { get; set; }
    }
    
    public class DeviceDefinitionCapability : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public CodeableConcept[]? Description { get; set; }
    }
    
    public class DeviceDefinitionSpecialization : BackboneElement
    {
        public string? SystemType { get; set; }
        public string? Version { get; set; }
    }
    
    public class DeviceDefinitionMaterial : BackboneElement
    {
        public CodeableConcept? Substance { get; set; }
        public bool? Alternate { get; set; }
        public bool? AllergenicIndicator { get; set; }
    }
    
}

