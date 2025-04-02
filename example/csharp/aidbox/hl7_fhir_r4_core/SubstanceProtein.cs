
namespace Aidbox.FHIR.R4.Core;

public class SubstanceProtein : DomainResource
{
    public CodeableConcept? SequenceType { get; set; }
    public int? NumberOfSubunits { get; set; }
    public string[]? DisulfideLinkage { get; set; }
    public SubstanceProteinSubunit[]? Subunit { get; set; }
    
    public class SubstanceProteinSubunit : BackboneElement
    {
        public int? Subunit { get; set; }
        public string? Sequence { get; set; }
        public int? Length { get; set; }
        public Attachment? SequenceAttachment { get; set; }
        public Identifier? NTerminalModificationId { get; set; }
        public string? NTerminalModification { get; set; }
        public Identifier? CTerminalModificationId { get; set; }
        public string? CTerminalModification { get; set; }
    }
    
}

