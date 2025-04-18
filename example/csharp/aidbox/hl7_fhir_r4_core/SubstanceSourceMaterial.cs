
namespace Aidbox.FHIR.R4.Core;

public class SubstanceSourceMaterial : DomainResource
{
    public string[]? ParentSubstanceName { get; set; }
    public SubstanceSourceMaterialOrganism? Organism { get; set; }
    public SubstanceSourceMaterialPartDescription[]? PartDescription { get; set; }
    public CodeableConcept? DevelopmentStage { get; set; }
    public SubstanceSourceMaterialFractionDescription[]? FractionDescription { get; set; }
    public CodeableConcept? SourceMaterialState { get; set; }
    public CodeableConcept[]? CountryOfOrigin { get; set; }
    public CodeableConcept? SourceMaterialType { get; set; }
    public Identifier? OrganismId { get; set; }
    public string? OrganismName { get; set; }
    public Identifier[]? ParentSubstanceId { get; set; }
    public string[]? GeographicalLocation { get; set; }
    public CodeableConcept? SourceMaterialClass { get; set; }
    
    public class SubstanceSourceMaterialOrganismAuthor : BackboneElement
    {
        public CodeableConcept? AuthorType { get; set; }
        public string? AuthorDescription { get; set; }
    }
    
    public class SubstanceSourceMaterialOrganismHybrid : BackboneElement
    {
        public string? MaternalOrganismId { get; set; }
        public string? MaternalOrganismName { get; set; }
        public string? PaternalOrganismId { get; set; }
        public string? PaternalOrganismName { get; set; }
        public CodeableConcept? HybridType { get; set; }
    }
    
    public class SubstanceSourceMaterialOrganismOrganismGeneral : BackboneElement
    {
        public CodeableConcept? Kingdom { get; set; }
        public CodeableConcept? Phylum { get; set; }
        public CodeableConcept? Class { get; set; }
        public CodeableConcept? Order { get; set; }
    }
    
    public class SubstanceSourceMaterialOrganism : BackboneElement
    {
        public CodeableConcept? Family { get; set; }
        public CodeableConcept? Genus { get; set; }
        public CodeableConcept? Species { get; set; }
        public CodeableConcept? IntraspecificType { get; set; }
        public string? IntraspecificDescription { get; set; }
        public SubstanceSourceMaterialOrganismAuthor[]? Author { get; set; }
        public SubstanceSourceMaterialOrganismHybrid? Hybrid { get; set; }
        public SubstanceSourceMaterialOrganismOrganismGeneral? OrganismGeneral { get; set; }
    }
    
    public class SubstanceSourceMaterialPartDescription : BackboneElement
    {
        public CodeableConcept? Part { get; set; }
        public CodeableConcept? PartLocation { get; set; }
    }
    
    public class SubstanceSourceMaterialFractionDescription : BackboneElement
    {
        public string? Fraction { get; set; }
        public CodeableConcept? MaterialType { get; set; }
    }
    
}

