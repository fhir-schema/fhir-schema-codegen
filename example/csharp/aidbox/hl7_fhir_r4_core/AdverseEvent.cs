
namespace Aidbox.FHIR.R4.Core;

public class AdverseEvent : DomainResource
{
    public CodeableConcept[]? Category { get; set; }
    public string? Actuality { get; set; }
    public string? Date { get; set; }
    public ResourceReference[]? Study { get; set; }
    public ResourceReference? Encounter { get; set; }
    public AdverseEventSuspectEntity[]? SuspectEntity { get; set; }
    public ResourceReference[]? ReferenceDocument { get; set; }
    public CodeableConcept? Outcome { get; set; }
    public string? RecordedDate { get; set; }
    public CodeableConcept? Event { get; set; }
    public ResourceReference[]? Contributor { get; set; }
    public ResourceReference[]? SubjectMedicalHistory { get; set; }
    public ResourceReference? Recorder { get; set; }
    public CodeableConcept? Seriousness { get; set; }
    public CodeableConcept? Severity { get; set; }
    public Identifier? Identifier { get; set; }
    public string? Detected { get; set; }
    public ResourceReference? Location { get; set; }
    public ResourceReference? Subject { get; set; }
    public ResourceReference[]? ResultingCondition { get; set; }
    
    public class AdverseEventSuspectEntityCausality : BackboneElement
    {
        public CodeableConcept? Assessment { get; set; }
        public string? ProductRelatedness { get; set; }
        public ResourceReference? Author { get; set; }
        public CodeableConcept? Method { get; set; }
    }
    
    public class AdverseEventSuspectEntity : BackboneElement
    {
        public ResourceReference? Instance { get; set; }
        public AdverseEventSuspectEntityCausality[]? Causality { get; set; }
    }
    
}

