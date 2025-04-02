
namespace Aidbox.FHIR.R4.Core;

public class DocumentReference : DomainResource
{
    public string? Description { get; set; }
    public CodeableConcept[]? Category { get; set; }
    public string? Date { get; set; }
    public string? DocStatus { get; set; }
    public DocumentReferenceContent[]? Content { get; set; }
    public CodeableConcept? Type { get; set; }
    public ResourceReference[]? Author { get; set; }
    public Identifier? MasterIdentifier { get; set; }
    public ResourceReference? Custodian { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public DocumentReferenceRelatesTo[]? RelatesTo { get; set; }
    public DocumentReferenceContext? Context { get; set; }
    public CodeableConcept[]? SecurityLabel { get; set; }
    public ResourceReference? Subject { get; set; }
    public ResourceReference? Authenticator { get; set; }
    
    public class DocumentReferenceContent : BackboneElement
    {
        public Attachment? Attachment { get; set; }
        public Coding? Format { get; set; }
    }
    
    public class DocumentReferenceRelatesTo : BackboneElement
    {
        public string? Code { get; set; }
        public ResourceReference? Target { get; set; }
    }
    
    public class DocumentReferenceContext : BackboneElement
    {
        public ResourceReference[]? Encounter { get; set; }
        public CodeableConcept[]? Event { get; set; }
        public Period? Period { get; set; }
        public CodeableConcept? FacilityType { get; set; }
        public CodeableConcept? PracticeSetting { get; set; }
        public ResourceReference? SourcePatientInfo { get; set; }
        public ResourceReference[]? Related { get; set; }
    }
    
}

