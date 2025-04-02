
namespace Aidbox.FHIR.R4.Core;

public class Group : DomainResource
{
    public string? Name { get; set; }
    public string? Type { get; set; }
    public GroupMember[]? Member { get; set; }
    public GroupCharacteristic[]? Characteristic { get; set; }
    public bool? Active { get; set; }
    public CodeableConcept? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public long? Quantity { get; set; }
    public ResourceReference? ManagingEntity { get; set; }
    public bool? Actual { get; set; }
    
    public class GroupMember : BackboneElement
    {
        public ResourceReference? Entity { get; set; }
        public Period? Period { get; set; }
        public bool? Inactive { get; set; }
    }
    
    public class GroupCharacteristic : BackboneElement
    {
        public bool? Exclude { get; set; }
        public ResourceReference? ValueReference { get; set; }
        public Quantity? ValueQuantity { get; set; }
        public bool? ValueBoolean { get; set; }
        public CodeableConcept? Code { get; set; }
        public CodeableConcept? ValueCodeableConcept { get; set; }
        public Period? Period { get; set; }
        public Range? ValueRange { get; set; }
    }
    
}

