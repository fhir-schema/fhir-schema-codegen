
namespace Aidbox.FHIR.R4.Core;

public class Substance : DomainResource
{
    public Identifier[]? Identifier { get; set; }
    public string? Status { get; set; }
    public CodeableConcept[]? Category { get; set; }
    public CodeableConcept? Code { get; set; }
    public string? Description { get; set; }
    public SubstanceInstance[]? Instance { get; set; }
    public SubstanceIngredient[]? Ingredient { get; set; }
    
    public class SubstanceInstance : BackboneElement
    {
        public Identifier? Identifier { get; set; }
        public string? Expiry { get; set; }
        public Quantity? Quantity { get; set; }
    }
    
    public class SubstanceIngredient : BackboneElement
    {
        public Ratio? Quantity { get; set; }
        public CodeableConcept? SubstanceCodeableConcept { get; set; }
        public ResourceReference? SubstanceReference { get; set; }
    }
    
}

