
namespace Aidbox.FHIR.R4.Core;

public class SpecimenDefinition : DomainResource
{
    public Identifier? Identifier { get; set; }
    public CodeableConcept? TypeCollected { get; set; }
    public CodeableConcept[]? PatientPreparation { get; set; }
    public string? TimeAspect { get; set; }
    public CodeableConcept[]? Collection { get; set; }
    public SpecimenDefinitionTypeTested[]? TypeTested { get; set; }
    
    public class SpecimenDefinitionTypeTestedContainerAdditive : BackboneElement
    {
        public CodeableConcept? AdditiveCodeableConcept { get; set; }
        public ResourceReference? AdditiveReference { get; set; }
    }
    
    public class SpecimenDefinitionTypeTestedContainer : BackboneElement
    {
        public string? Description { get; set; }
        public Quantity? Capacity { get; set; }
        public Quantity? MinimumVolumeQuantity { get; set; }
        public CodeableConcept? Type { get; set; }
        public CodeableConcept? Cap { get; set; }
        public string? Preparation { get; set; }
        public CodeableConcept? Material { get; set; }
        public SpecimenDefinitionTypeTestedContainerAdditive[]? Additive { get; set; }
        public string? MinimumVolumeString { get; set; }
    }
    
    public class SpecimenDefinitionTypeTestedHandling : BackboneElement
    {
        public CodeableConcept? TemperatureQualifier { get; set; }
        public Range? TemperatureRange { get; set; }
        public Duration? MaxDuration { get; set; }
        public string? Instruction { get; set; }
    }
    
    public class SpecimenDefinitionTypeTested : BackboneElement
    {
        public bool? IsDerived { get; set; }
        public CodeableConcept? Type { get; set; }
        public string? Preference { get; set; }
        public SpecimenDefinitionTypeTestedContainer? Container { get; set; }
        public string? Requirement { get; set; }
        public Duration? RetentionTime { get; set; }
        public CodeableConcept[]? RejectionCriterion { get; set; }
        public SpecimenDefinitionTypeTestedHandling[]? Handling { get; set; }
    }
    
}

