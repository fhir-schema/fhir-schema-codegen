
namespace Aidbox.FHIR.R4.Core;

public class Composition : DomainResource
{
    public CodeableConcept[]? Category { get; set; }
    public string? Date { get; set; }
    public ResourceReference? Encounter { get; set; }
    public CompositionSection[]? Section { get; set; }
    public CompositionAttester[]? Attester { get; set; }
    public CodeableConcept? Type { get; set; }
    public string? Title { get; set; }
    public ResourceReference[]? Author { get; set; }
    public CompositionEvent[]? Event { get; set; }
    public ResourceReference? Custodian { get; set; }
    public string? Status { get; set; }
    public Identifier? Identifier { get; set; }
    public CompositionRelatesTo[]? RelatesTo { get; set; }
    public ResourceReference? Subject { get; set; }
    public string? Confidentiality { get; set; }
    
    public class CompositionSection : BackboneElement
    {
        public CodeableConcept? OrderedBy { get; set; }
        public CompositionSection[]? Section { get; set; }
        public string? Mode { get; set; }
        public string? Title { get; set; }
        public CodeableConcept? EmptyReason { get; set; }
        public ResourceReference[]? Author { get; set; }
        public CodeableConcept? Code { get; set; }
        public ResourceReference? Focus { get; set; }
        public ResourceReference[]? Entry { get; set; }
        public Narrative? Text { get; set; }
    }
    
    public class CompositionAttester : BackboneElement
    {
        public string? Mode { get; set; }
        public string? Time { get; set; }
        public ResourceReference? Party { get; set; }
    }
    
    public class CompositionEvent : BackboneElement
    {
        public CodeableConcept[]? Code { get; set; }
        public Period? Period { get; set; }
        public ResourceReference[]? Detail { get; set; }
    }
    
    public class CompositionRelatesTo : BackboneElement
    {
        public string? Code { get; set; }
        public Identifier? TargetIdentifier { get; set; }
        public ResourceReference? TargetReference { get; set; }
    }
    
}

