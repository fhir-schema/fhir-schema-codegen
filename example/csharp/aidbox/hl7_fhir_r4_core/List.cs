
namespace Aidbox.FHIR.R4.Core;

public class List : DomainResource
{
    public string? Date { get; set; }
    public ResourceReference? Encounter { get; set; }
    public CodeableConcept? OrderedBy { get; set; }
    public string? Mode { get; set; }
    public ResourceReference? Source { get; set; }
    public string? Title { get; set; }
    public Annotation[]? Note { get; set; }
    public CodeableConcept? EmptyReason { get; set; }
    public string? Status { get; set; }
    public CodeableConcept? Code { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ListEntry[]? Entry { get; set; }
    public ResourceReference? Subject { get; set; }
    
    public class ListEntry : BackboneElement
    {
        public CodeableConcept? Flag { get; set; }
        public bool? Deleted { get; set; }
        public string? Date { get; set; }
        public ResourceReference? Item { get; set; }
    }
    
}

