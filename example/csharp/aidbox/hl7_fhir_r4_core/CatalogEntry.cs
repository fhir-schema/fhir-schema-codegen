
namespace Aidbox.FHIR.R4.Core;

public class CatalogEntry : DomainResource
{
    public CodeableConcept[]? AdditionalCharacteristic { get; set; }
    public CodeableConcept[]? AdditionalClassification { get; set; }
    public ResourceReference? ReferencedItem { get; set; }
    public CodeableConcept? Type { get; set; }
    public CodeableConcept[]? Classification { get; set; }
    public Period? ValidityPeriod { get; set; }
    public bool? Orderable { get; set; }
    public string? Status { get; set; }
    public string? ValidTo { get; set; }
    public Identifier[]? Identifier { get; set; }
    public Identifier[]? AdditionalIdentifier { get; set; }
    public string? LastUpdated { get; set; }
    public CatalogEntryRelatedEntry[]? RelatedEntry { get; set; }
    
    public class CatalogEntryRelatedEntry : BackboneElement
    {
        public string? Relationtype { get; set; }
        public ResourceReference? Item { get; set; }
    }
    
}

