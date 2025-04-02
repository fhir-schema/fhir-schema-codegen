
namespace Aidbox.FHIR.R4.Core;

public class Device : DomainResource
{
    public ResourceReference? Patient { get; set; }
    public ResourceReference? Definition { get; set; }
    public string? SerialNumber { get; set; }
    public ResourceReference? Parent { get; set; }
    public DeviceDeviceName[]? DeviceName { get; set; }
    public DeviceProperty[]? Property { get; set; }
    public string? PartNumber { get; set; }
    public string? ModelNumber { get; set; }
    public CodeableConcept? Type { get; set; }
    public CodeableConcept[]? StatusReason { get; set; }
    public DeviceSpecialization[]? Specialization { get; set; }
    public string? DistinctIdentifier { get; set; }
    public Annotation[]? Note { get; set; }
    public string? Status { get; set; }
    public CodeableConcept[]? Safety { get; set; }
    public string? LotNumber { get; set; }
    public string? Url { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? Manufacturer { get; set; }
    public DeviceVersion[]? Version { get; set; }
    public ResourceReference? Location { get; set; }
    public ContactPoint[]? Contact { get; set; }
    public string? ManufactureDate { get; set; }
    public ResourceReference? Owner { get; set; }
    public string? ExpirationDate { get; set; }
    public DeviceUdiCarrier[]? UdiCarrier { get; set; }
    
    public class DeviceDeviceName : BackboneElement
    {
        public string? Name { get; set; }
        public string? Type { get; set; }
    }
    
    public class DeviceProperty : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public Quantity[]? ValueQuantity { get; set; }
        public CodeableConcept[]? ValueCode { get; set; }
    }
    
    public class DeviceSpecialization : BackboneElement
    {
        public CodeableConcept? SystemType { get; set; }
        public string? Version { get; set; }
    }
    
    public class DeviceVersion : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public Identifier? Component { get; set; }
        public string? Value { get; set; }
    }
    
    public class DeviceUdiCarrier : BackboneElement
    {
        public string? DeviceIdentifier { get; set; }
        public string? Issuer { get; set; }
        public string? Jurisdiction { get; set; }
        public string? CarrierAIDC { get; set; }
        public string? CarrierHRF { get; set; }
        public string? EntryType { get; set; }
    }
    
}

