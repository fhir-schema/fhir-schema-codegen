
namespace Aidbox.FHIR.R4.Core;

public class DetectedIssue : DomainResource
{
    public ResourceReference? Patient { get; set; }
    public DetectedIssueEvidence[]? Evidence { get; set; }
    public DetectedIssueMitigation[]? Mitigation { get; set; }
    public ResourceReference? Author { get; set; }
    public string? IdentifiedDateTime { get; set; }
    public string? Reference { get; set; }
    public string? Status { get; set; }
    public string? Severity { get; set; }
    public CodeableConcept? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference[]? Implicated { get; set; }
    public Period? IdentifiedPeriod { get; set; }
    public string? Detail { get; set; }
    
    public class DetectedIssueEvidence : BackboneElement
    {
        public CodeableConcept[]? Code { get; set; }
        public ResourceReference[]? Detail { get; set; }
    }
    
    public class DetectedIssueMitigation : BackboneElement
    {
        public CodeableConcept? Action { get; set; }
        public string? Date { get; set; }
        public ResourceReference? Author { get; set; }
    }
    
}

