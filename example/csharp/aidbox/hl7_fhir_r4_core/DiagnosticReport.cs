
namespace Aidbox.FHIR.R4.Core;

public class DiagnosticReport : DomainResource
{
    public CodeableConcept[]? Category { get; set; }
    public CodeableConcept[]? ConclusionCode { get; set; }
    public string? Conclusion { get; set; }
    public ResourceReference? Encounter { get; set; }
    public ResourceReference[]? Specimen { get; set; }
    public string? EffectiveDateTime { get; set; }
    public ResourceReference[]? ResultsInterpreter { get; set; }
    public string? Status { get; set; }
    public ResourceReference[]? Result { get; set; }
    public CodeableConcept? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? Issued { get; set; }
    public Attachment[]? PresentedForm { get; set; }
    public ResourceReference[]? BasedOn { get; set; }
    public ResourceReference[]? ImagingStudy { get; set; }
    public DiagnosticReportMedia[]? Media { get; set; }
    public ResourceReference? Subject { get; set; }
    public ResourceReference[]? Performer { get; set; }
    public Period? EffectivePeriod { get; set; }
    
    public class DiagnosticReportMedia : BackboneElement
    {
        public string? Comment { get; set; }
        public ResourceReference? Link { get; set; }
    }
    
}

