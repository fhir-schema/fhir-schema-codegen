
namespace Aidbox.FHIR.R4.Core;

public class ResearchStudy : DomainResource
{
    public string? Description { get; set; }
    public CodeableConcept[]? Category { get; set; }
    public ResourceReference[]? Enrollment { get; set; }
    public ResearchStudyArm[]? Arm { get; set; }
    public ResourceReference[]? Site { get; set; }
    public ResourceReference[]? Protocol { get; set; }
    public ResourceReference? PrincipalInvestigator { get; set; }
    public CodeableConcept? Phase { get; set; }
    public CodeableConcept? ReasonStopped { get; set; }
    public string? Title { get; set; }
    public Annotation[]? Note { get; set; }
    public CodeableConcept[]? Keyword { get; set; }
    public string? Status { get; set; }
    public CodeableConcept[]? Condition { get; set; }
    public Identifier[]? Identifier { get; set; }
    public CodeableConcept? PrimaryPurposeType { get; set; }
    public CodeableConcept[]? Focus { get; set; }
    public ResearchStudyObjective[]? Objective { get; set; }
    public Period? Period { get; set; }
    public ResourceReference[]? PartOf { get; set; }
    public RelatedArtifact[]? RelatedArtifact { get; set; }
    public CodeableConcept[]? Location { get; set; }
    public ContactDetail[]? Contact { get; set; }
    public ResourceReference? Sponsor { get; set; }
    
    public class ResearchStudyArm : BackboneElement
    {
        public string? Name { get; set; }
        public CodeableConcept? Type { get; set; }
        public string? Description { get; set; }
    }
    
    public class ResearchStudyObjective : BackboneElement
    {
        public string? Name { get; set; }
        public CodeableConcept? Type { get; set; }
    }
    
}

