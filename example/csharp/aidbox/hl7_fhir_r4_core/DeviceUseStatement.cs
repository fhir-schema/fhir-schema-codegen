
namespace Aidbox.FHIR.R4.Core;

public class DeviceUseStatement : DomainResource
{
    public ResourceReference[]? DerivedFrom { get; set; }
    public Period? TimingPeriod { get; set; }
    public CodeableConcept[]? ReasonCode { get; set; }
    public ResourceReference? Source { get; set; }
    public Annotation[]? Note { get; set; }
    public string? TimingDateTime { get; set; }
    public Timing? TimingTiming { get; set; }
    public string? Status { get; set; }
    public string? RecordedOn { get; set; }
    public Identifier[]? Identifier { get; set; }
    public CodeableConcept? BodySite { get; set; }
    public ResourceReference? Device { get; set; }
    public ResourceReference[]? BasedOn { get; set; }
    public ResourceReference? Subject { get; set; }
    public ResourceReference[]? ReasonReference { get; set; }
}

