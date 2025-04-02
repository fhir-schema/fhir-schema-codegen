
namespace Aidbox.FHIR.R4.Core;

public class ImmunizationRecommendation : DomainResource
{
    public Identifier[]? Identifier { get; set; }
    public ResourceReference? Patient { get; set; }
    public string? Date { get; set; }
    public ResourceReference? Authority { get; set; }
    public ImmunizationRecommendationRecommendation[]? Recommendation { get; set; }
    
    public class ImmunizationRecommendationRecommendationDateCriterion : BackboneElement
    {
        public CodeableConcept? Code { get; set; }
        public string? Value { get; set; }
    }
    
    public class ImmunizationRecommendationRecommendation : BackboneElement
    {
        public string? Description { get; set; }
        public long? SeriesDosesPositiveInt { get; set; }
        public CodeableConcept[]? ContraindicatedVaccineCode { get; set; }
        public long? DoseNumberPositiveInt { get; set; }
        public string? Series { get; set; }
        public CodeableConcept[]? VaccineCode { get; set; }
        public string? DoseNumberString { get; set; }
        public string? SeriesDosesString { get; set; }
        public CodeableConcept? ForecastStatus { get; set; }
        public CodeableConcept[]? ForecastReason { get; set; }
        public ImmunizationRecommendationRecommendationDateCriterion[]? DateCriterion { get; set; }
        public CodeableConcept? TargetDisease { get; set; }
        public ResourceReference[]? SupportingImmunization { get; set; }
        public ResourceReference[]? SupportingPatientInformation { get; set; }
    }
    
}

