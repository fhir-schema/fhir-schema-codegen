
namespace Aidbox.FHIR.R4.Core;

public class SubstanceSpecification : DomainResource
{
    public string? Description { get; set; }
    public SubstanceSpecificationProperty[]? Property { get; set; }
    public SubstanceSpecificationName[]? Name { get; set; }
    public ResourceReference? ReferenceInformation { get; set; }
    public SubstanceSpecificationRelationship[]? Relationship { get; set; }
    public CodeableConcept? Type { get; set; }
    public SubstanceSpecificationMoiety[]? Moiety { get; set; }
    public ResourceReference[]? Source { get; set; }
    public ResourceReference? NucleicAcid { get; set; }
    public SubstanceSpecificationStructure? Structure { get; set; }
    public CodeableConcept? Status { get; set; }
    public string? Comment { get; set; }
    public SubstanceSpecificationCode[]? Code { get; set; }
    public Identifier? Identifier { get; set; }
    public SubstanceSpecificationStructureIsotopeMolecularWeight[]? MolecularWeight { get; set; }
    public ResourceReference? Polymer { get; set; }
    public ResourceReference? Protein { get; set; }
    public CodeableConcept? Domain { get; set; }
    public ResourceReference? SourceMaterial { get; set; }
    
    public class SubstanceSpecificationProperty : BackboneElement
    {
        public CodeableConcept? Category { get; set; }
        public CodeableConcept? DefiningSubstanceCodeableConcept { get; set; }
        public ResourceReference? DefiningSubstanceReference { get; set; }
        public Quantity? AmountQuantity { get; set; }
        public string? AmountString { get; set; }
        public CodeableConcept? Code { get; set; }
        public string? Parameters { get; set; }
    }
    
    public class SubstanceSpecificationNameOfficial : BackboneElement
    {
        public CodeableConcept? Authority { get; set; }
        public CodeableConcept? Status { get; set; }
        public string? Date { get; set; }
    }
    
    public class SubstanceSpecificationName : BackboneElement
    {
        public SubstanceSpecificationNameOfficial[]? Official { get; set; }
        public CodeableConcept[]? Jurisdiction { get; set; }
        public string? Name { get; set; }
        public CodeableConcept? Type { get; set; }
        public ResourceReference[]? Source { get; set; }
        public CodeableConcept? Status { get; set; }
        public CodeableConcept[]? Language { get; set; }
        public SubstanceSpecificationName[]? Synonym { get; set; }
        public SubstanceSpecificationName[]? Translation { get; set; }
        public bool? Preferred { get; set; }
        public CodeableConcept[]? Domain { get; set; }
    }
    
    public class SubstanceSpecificationRelationship : BackboneElement
    {
        public CodeableConcept? SubstanceCodeableConcept { get; set; }
        public Ratio? AmountRatioLowLimit { get; set; }
        public CodeableConcept? AmountType { get; set; }
        public CodeableConcept? Relationship { get; set; }
        public ResourceReference[]? Source { get; set; }
        public ResourceReference? SubstanceReference { get; set; }
        public Ratio? AmountRatio { get; set; }
        public Quantity? AmountQuantity { get; set; }
        public string? AmountString { get; set; }
        public bool? IsDefining { get; set; }
        public Range? AmountRange { get; set; }
    }
    
    public class SubstanceSpecificationMoiety : BackboneElement
    {
        public CodeableConcept? Role { get; set; }
        public string? Name { get; set; }
        public string? MolecularFormula { get; set; }
        public Quantity? AmountQuantity { get; set; }
        public string? AmountString { get; set; }
        public CodeableConcept? OpticalActivity { get; set; }
        public Identifier? Identifier { get; set; }
        public CodeableConcept? Stereochemistry { get; set; }
    }
    
    public class SubstanceSpecificationStructureIsotopeMolecularWeight : BackboneElement
    {
        public CodeableConcept? Method { get; set; }
        public CodeableConcept? Type { get; set; }
        public Quantity? Amount { get; set; }
    }
    
    public class SubstanceSpecificationStructureIsotope : BackboneElement
    {
        public Identifier? Identifier { get; set; }
        public CodeableConcept? Name { get; set; }
        public CodeableConcept? Substitution { get; set; }
        public Quantity? HalfLife { get; set; }
        public SubstanceSpecificationStructureIsotopeMolecularWeight? MolecularWeight { get; set; }
    }
    
    public class SubstanceSpecificationStructureRepresentation : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public string? Representation { get; set; }
        public Attachment? Attachment { get; set; }
    }
    
    public class SubstanceSpecificationStructure : BackboneElement
    {
        public CodeableConcept? Stereochemistry { get; set; }
        public CodeableConcept? OpticalActivity { get; set; }
        public string? MolecularFormula { get; set; }
        public string? MolecularFormulaByMoiety { get; set; }
        public SubstanceSpecificationStructureIsotope[]? Isotope { get; set; }
        public SubstanceSpecificationStructureIsotopeMolecularWeight? MolecularWeight { get; set; }
        public ResourceReference[]? Source { get; set; }
        public SubstanceSpecificationStructureRepresentation[]? Representation { get; set; }
    }
    
    public class SubstanceSpecificationCode : BackboneElement
    {
        public CodeableConcept? Code { get; set; }
        public CodeableConcept? Status { get; set; }
        public string? StatusDate { get; set; }
        public string? Comment { get; set; }
        public ResourceReference[]? Source { get; set; }
    }
    
}

