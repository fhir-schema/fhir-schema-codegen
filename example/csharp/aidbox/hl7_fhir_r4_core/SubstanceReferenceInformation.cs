
namespace Aidbox.FHIR.R4.Core;

public class SubstanceReferenceInformation : DomainResource
{
    public string? Comment { get; set; }
    public SubstanceReferenceInformationGene[]? Gene { get; set; }
    public SubstanceReferenceInformationGeneElement[]? GeneElement { get; set; }
    public SubstanceReferenceInformationClassification[]? Classification { get; set; }
    public SubstanceReferenceInformationTarget[]? Target { get; set; }
    
    public class SubstanceReferenceInformationGene : BackboneElement
    {
        public CodeableConcept? GeneSequenceOrigin { get; set; }
        public CodeableConcept? Gene { get; set; }
        public ResourceReference[]? Source { get; set; }
    }
    
    public class SubstanceReferenceInformationGeneElement : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public Identifier? Element { get; set; }
        public ResourceReference[]? Source { get; set; }
    }
    
    public class SubstanceReferenceInformationClassification : BackboneElement
    {
        public CodeableConcept? Domain { get; set; }
        public CodeableConcept? Classification { get; set; }
        public CodeableConcept[]? Subtype { get; set; }
        public ResourceReference[]? Source { get; set; }
    }
    
    public class SubstanceReferenceInformationTarget : BackboneElement
    {
        public CodeableConcept? Organism { get; set; }
        public CodeableConcept? OrganismType { get; set; }
        public CodeableConcept? AmountType { get; set; }
        public CodeableConcept? Type { get; set; }
        public CodeableConcept? Interaction { get; set; }
        public ResourceReference[]? Source { get; set; }
        public Quantity? AmountQuantity { get; set; }
        public string? AmountString { get; set; }
        public Identifier? Target { get; set; }
        public Range? AmountRange { get; set; }
    }
    
}

