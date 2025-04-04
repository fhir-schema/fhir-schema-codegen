
namespace Aidbox.FHIR.R4.Core;

public class ObservationDefinition : DomainResource
{
    public ObservationDefinitionQuantitativeDetails? QuantitativeDetails { get; set; }
    public CodeableConcept[]? Category { get; set; }
    public CodeableConcept? Method { get; set; }
    public ResourceReference? ValidCodedValueSet { get; set; }
    public ObservationDefinitionQualifiedInterval[]? QualifiedInterval { get; set; }
    public ResourceReference? AbnormalCodedValueSet { get; set; }
    public CodeableConcept? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string[]? PermittedDataType { get; set; }
    public bool? MultipleResultsAllowed { get; set; }
    public ResourceReference? NormalCodedValueSet { get; set; }
    public string? PreferredReportName { get; set; }
    public ResourceReference? CriticalCodedValueSet { get; set; }
    
    public class ObservationDefinitionQuantitativeDetails : BackboneElement
    {
        public CodeableConcept? CustomaryUnit { get; set; }
        public CodeableConcept? Unit { get; set; }
        public decimal? ConversionFactor { get; set; }
        public int? DecimalPrecision { get; set; }
    }
    
    public class ObservationDefinitionQualifiedInterval : BackboneElement
    {
        public string? Category { get; set; }
        public Range? Range { get; set; }
        public CodeableConcept? Context { get; set; }
        public CodeableConcept[]? AppliesTo { get; set; }
        public string? Gender { get; set; }
        public Range? Age { get; set; }
        public Range? GestationalAge { get; set; }
        public string? Condition { get; set; }
    }
    
}

