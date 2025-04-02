
namespace Aidbox.FHIR.R4.Core;

public class MedicinalProductInteraction : DomainResource
{
    public ResourceReference[]? Subject { get; set; }
    public string? Description { get; set; }
    public MedicinalProductInteractionInteractant[]? Interactant { get; set; }
    public CodeableConcept? Type { get; set; }
    public CodeableConcept? Effect { get; set; }
    public CodeableConcept? Incidence { get; set; }
    public CodeableConcept? Management { get; set; }
    
    public class MedicinalProductInteractionInteractant : BackboneElement
    {
        public ResourceReference? ItemReference { get; set; }
        public CodeableConcept? ItemCodeableConcept { get; set; }
    }
    
}

