
namespace Aidbox.FHIR.R4.Core;

public class Consent : DomainResource
{
    public ResourceReference? Patient { get; set; }
    public CodeableConcept[]? Category { get; set; }
    public ConsentProvision? Provision { get; set; }
    public Attachment? SourceAttachment { get; set; }
    public ResourceReference[]? Organization { get; set; }
    public ConsentVerification[]? Verification { get; set; }
    public CodeableConcept? Scope { get; set; }
    public ConsentPolicy[]? Policy { get; set; }
    public ResourceReference? SourceReference { get; set; }
    public string? DateTime { get; set; }
    public string? Status { get; set; }
    public CodeableConcept? PolicyRule { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference[]? Performer { get; set; }
    
    public class ConsentProvisionActor : BackboneElement
    {
        public CodeableConcept? Role { get; set; }
        public ResourceReference? Reference { get; set; }
    }
    
    public class ConsentProvisionData : BackboneElement
    {
        public string? Meaning { get; set; }
        public ResourceReference? Reference { get; set; }
    }
    
    public class ConsentProvision : BackboneElement
    {
        public ConsentProvision[]? Provision { get; set; }
        public Coding[]? Purpose { get; set; }
        public Period? DataPeriod { get; set; }
        public string? Type { get; set; }
        public Coding[]? Class { get; set; }
        public CodeableConcept[]? Code { get; set; }
        public CodeableConcept[]? Action { get; set; }
        public Period? Period { get; set; }
        public Coding[]? SecurityLabel { get; set; }
        public ConsentProvisionActor[]? Actor { get; set; }
        public ConsentProvisionData[]? Data { get; set; }
    }
    
    public class ConsentVerification : BackboneElement
    {
        public bool? Verified { get; set; }
        public ResourceReference? VerifiedWith { get; set; }
        public string? VerificationDate { get; set; }
    }
    
    public class ConsentPolicy : BackboneElement
    {
        public string? Authority { get; set; }
        public string? Uri { get; set; }
    }
    
}

