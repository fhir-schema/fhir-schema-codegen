
namespace Aidbox.FHIR.R4.Core;

public class MeasureReport : DomainResource
{
    public ResourceReference[]? EvaluatedResource { get; set; }
    public string? Date { get; set; }
    public MeasureReportGroup[]? Group { get; set; }
    public string? Type { get; set; }
    public string? Measure { get; set; }
    public ResourceReference? Reporter { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public Period? Period { get; set; }
    public CodeableConcept? ImprovementNotation { get; set; }
    public ResourceReference? Subject { get; set; }
    
    public class MeasureReportGroupPopulation : BackboneElement
    {
        public CodeableConcept? Code { get; set; }
        public int? Count { get; set; }
        public ResourceReference? SubjectResults { get; set; }
    }
    
    public class MeasureReportGroupStratifierStratumComponent : BackboneElement
    {
        public CodeableConcept? Code { get; set; }
        public CodeableConcept? Value { get; set; }
    }
    
    public class MeasureReportGroupStratifierStratumPopulation : BackboneElement
    {
        public CodeableConcept? Code { get; set; }
        public int? Count { get; set; }
        public ResourceReference? SubjectResults { get; set; }
    }
    
    public class MeasureReportGroupStratifierStratum : BackboneElement
    {
        public CodeableConcept? Value { get; set; }
        public MeasureReportGroupStratifierStratumComponent[]? Component { get; set; }
        public MeasureReportGroupStratifierStratumPopulation[]? Population { get; set; }
        public Quantity? MeasureScore { get; set; }
    }
    
    public class MeasureReportGroupStratifier : BackboneElement
    {
        public CodeableConcept[]? Code { get; set; }
        public MeasureReportGroupStratifierStratum[]? Stratum { get; set; }
    }
    
    public class MeasureReportGroup : BackboneElement
    {
        public CodeableConcept? Code { get; set; }
        public MeasureReportGroupPopulation[]? Population { get; set; }
        public Quantity? MeasureScore { get; set; }
        public MeasureReportGroupStratifier[]? Stratifier { get; set; }
    }
    
}

