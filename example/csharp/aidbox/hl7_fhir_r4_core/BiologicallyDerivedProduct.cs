
namespace Aidbox.FHIR.R4.Core;

public class BiologicallyDerivedProduct : DomainResource
{
    public ResourceReference[]? Request { get; set; }
    public BiologicallyDerivedProductProcessing[]? Processing { get; set; }
    public ResourceReference[]? Parent { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public CodeableConcept? ProductCode { get; set; }
    public BiologicallyDerivedProductStorage[]? Storage { get; set; }
    public int? Quantity { get; set; }
    public string? ProductCategory { get; set; }
    public BiologicallyDerivedProductManipulation? Manipulation { get; set; }
    public BiologicallyDerivedProductCollection? Collection { get; set; }
    
    public class BiologicallyDerivedProductProcessing : BackboneElement
    {
        public string? Description { get; set; }
        public CodeableConcept? Procedure { get; set; }
        public ResourceReference? Additive { get; set; }
        public string? TimeDateTime { get; set; }
        public Period? TimePeriod { get; set; }
    }
    
    public class BiologicallyDerivedProductStorage : BackboneElement
    {
        public string? Description { get; set; }
        public decimal? Temperature { get; set; }
        public string? Scale { get; set; }
        public Period? Duration { get; set; }
    }
    
    public class BiologicallyDerivedProductManipulation : BackboneElement
    {
        public string? Description { get; set; }
        public string? TimeDateTime { get; set; }
        public Period? TimePeriod { get; set; }
    }
    
    public class BiologicallyDerivedProductCollection : BackboneElement
    {
        public ResourceReference? Collector { get; set; }
        public ResourceReference? Source { get; set; }
        public string? CollectedDateTime { get; set; }
        public Period? CollectedPeriod { get; set; }
    }
    
}

