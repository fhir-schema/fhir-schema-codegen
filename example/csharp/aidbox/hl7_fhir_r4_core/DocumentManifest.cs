
namespace Aidbox.FHIR.R4.Core;

public class DocumentManifest : DomainResource
{
    public string? Description { get; set; }
    public ResourceReference[]? Content { get; set; }
    public ResourceReference[]? Recipient { get; set; }
    public CodeableConcept? Type { get; set; }
    public string? Created { get; set; }
    public DocumentManifestRelated[]? Related { get; set; }
    public string? Source { get; set; }
    public ResourceReference[]? Author { get; set; }
    public Identifier? MasterIdentifier { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference? Subject { get; set; }
    
    public class DocumentManifestRelated : BackboneElement
    {
        public Identifier? Identifier { get; set; }
        public ResourceReference? Ref { get; set; }
    }
    
}

