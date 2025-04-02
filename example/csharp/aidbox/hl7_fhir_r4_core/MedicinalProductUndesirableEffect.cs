
namespace Aidbox.FHIR.R4.Core;

public class MedicinalProductUndesirableEffect : DomainResource
{
    public ResourceReference[]? Subject { get; set; }
    public CodeableConcept? SymptomConditionEffect { get; set; }
    public CodeableConcept? Classification { get; set; }
    public CodeableConcept? FrequencyOfOccurrence { get; set; }
    public Population[]? Population { get; set; }
}

