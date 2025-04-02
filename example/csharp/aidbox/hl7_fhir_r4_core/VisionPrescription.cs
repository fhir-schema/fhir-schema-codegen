
namespace Aidbox.FHIR.R4.Core;

public class VisionPrescription : DomainResource
{
    public Identifier[]? Identifier { get; set; }
    public string? Status { get; set; }
    public string? Created { get; set; }
    public ResourceReference? Patient { get; set; }
    public ResourceReference? Encounter { get; set; }
    public string? DateWritten { get; set; }
    public ResourceReference? Prescriber { get; set; }
    public VisionPrescriptionLensSpecification[]? LensSpecification { get; set; }
    
    public class VisionPrescriptionLensSpecificationPrism : BackboneElement
    {
        public decimal? Amount { get; set; }
        public string? Base { get; set; }
    }
    
    public class VisionPrescriptionLensSpecification : BackboneElement
    {
        public decimal? Sphere { get; set; }
        public string? Color { get; set; }
        public string? Eye { get; set; }
        public decimal? Diameter { get; set; }
        public Quantity? Duration { get; set; }
        public string? Brand { get; set; }
        public Annotation[]? Note { get; set; }
        public decimal? Power { get; set; }
        public CodeableConcept? Product { get; set; }
        public decimal? Cylinder { get; set; }
        public VisionPrescriptionLensSpecificationPrism[]? Prism { get; set; }
        public int? Axis { get; set; }
        public decimal? Add { get; set; }
        public decimal? BackCurve { get; set; }
    }
    
}

