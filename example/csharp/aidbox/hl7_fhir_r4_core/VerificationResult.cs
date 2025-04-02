
namespace Aidbox.FHIR.R4.Core;

public class VerificationResult : DomainResource
{
    public CodeableConcept? FailureAction { get; set; }
    public CodeableConcept? ValidationType { get; set; }
    public string[]? TargetLocation { get; set; }
    public VerificationResultValidator[]? Validator { get; set; }
    public CodeableConcept? Need { get; set; }
    public Timing? Frequency { get; set; }
    public string? NextScheduled { get; set; }
    public VerificationResultPrimarySource[]? PrimarySource { get; set; }
    public VerificationResultAttestation? Attestation { get; set; }
    public string? Status { get; set; }
    public CodeableConcept[]? ValidationProcess { get; set; }
    public string? StatusDate { get; set; }
    public ResourceReference[]? Target { get; set; }
    public string? LastPerformed { get; set; }
    
    public class VerificationResultValidator : BackboneElement
    {
        public ResourceReference? Organization { get; set; }
        public string? IdentityCertificate { get; set; }
        public Signature? AttestationSignature { get; set; }
    }
    
    public class VerificationResultPrimarySource : BackboneElement
    {
        public ResourceReference? Who { get; set; }
        public CodeableConcept[]? Type { get; set; }
        public CodeableConcept[]? CommunicationMethod { get; set; }
        public CodeableConcept? ValidationStatus { get; set; }
        public string? ValidationDate { get; set; }
        public CodeableConcept? CanPushUpdates { get; set; }
        public CodeableConcept[]? PushTypeAvailable { get; set; }
    }
    
    public class VerificationResultAttestation : BackboneElement
    {
        public ResourceReference? Who { get; set; }
        public ResourceReference? OnBehalfOf { get; set; }
        public CodeableConcept? CommunicationMethod { get; set; }
        public string? Date { get; set; }
        public string? SourceIdentityCertificate { get; set; }
        public string? ProxyIdentityCertificate { get; set; }
        public Signature? ProxySignature { get; set; }
        public Signature? SourceSignature { get; set; }
    }
    
}

