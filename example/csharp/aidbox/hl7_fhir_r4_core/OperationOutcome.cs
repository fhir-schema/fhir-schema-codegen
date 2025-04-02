
namespace Aidbox.FHIR.R4.Core;

public class OperationOutcome : DomainResource
{
    public OperationOutcomeIssue[]? Issue { get; set; }
    
    public class OperationOutcomeIssue : BackboneElement
    {
        public string? Severity { get; set; }
        public string? Code { get; set; }
        public CodeableConcept? Details { get; set; }
        public string? Diagnostics { get; set; }
        public string[]? Location { get; set; }
        public string[]? Expression { get; set; }
    }
    
}

