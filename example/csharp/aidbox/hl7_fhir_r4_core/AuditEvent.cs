
namespace Aidbox.FHIR.R4.Core;

public class AuditEvent : DomainResource
{
    public string? OutcomeDesc { get; set; }
    public Coding? Type { get; set; }
    public string? Outcome { get; set; }
    public AuditEventSource? Source { get; set; }
    public string? Recorded { get; set; }
    public AuditEventAgent[]? Agent { get; set; }
    public CodeableConcept[]? PurposeOfEvent { get; set; }
    public string? Action { get; set; }
    public Period? Period { get; set; }
    public AuditEventEntity[]? Entity { get; set; }
    public Coding[]? Subtype { get; set; }
    
    public class AuditEventSource : BackboneElement
    {
        public string? Site { get; set; }
        public ResourceReference? Observer { get; set; }
        public Coding[]? Type { get; set; }
    }
    
    public class AuditEventAgentNetwork : BackboneElement
    {
        public string? Address { get; set; }
        public string? Type { get; set; }
    }
    
    public class AuditEventAgent : BackboneElement
    {
        public CodeableConcept[]? Role { get; set; }
        public bool? Requestor { get; set; }
        public ResourceReference? Who { get; set; }
        public string? AltId { get; set; }
        public string? Name { get; set; }
        public CodeableConcept? Type { get; set; }
        public string[]? Policy { get; set; }
        public CodeableConcept[]? PurposeOfUse { get; set; }
        public AuditEventAgentNetwork? Network { get; set; }
        public ResourceReference? Location { get; set; }
        public Coding? Media { get; set; }
    }
    
    public class AuditEventEntityDetail : BackboneElement
    {
        public string? Type { get; set; }
        public string? ValueString { get; set; }
        public string? ValueBase64Binary { get; set; }
    }
    
    public class AuditEventEntity : BackboneElement
    {
        public Coding? Role { get; set; }
        public string? Description { get; set; }
        public string? Name { get; set; }
        public Coding? Type { get; set; }
        public Coding? Lifecycle { get; set; }
        public string? Query { get; set; }
        public Coding[]? SecurityLabel { get; set; }
        public ResourceReference? What { get; set; }
        public AuditEventEntityDetail[]? Detail { get; set; }
    }
    
}

