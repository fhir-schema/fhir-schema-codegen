
namespace Aidbox.FHIR.R4.Core;

public class DeviceMetric : DomainResource
{
    public string? Category { get; set; }
    public Timing? MeasurementPeriod { get; set; }
    public string? Color { get; set; }
    public ResourceReference? Parent { get; set; }
    public CodeableConcept? Unit { get; set; }
    public CodeableConcept? Type { get; set; }
    public ResourceReference? Source { get; set; }
    public Identifier[]? Identifier { get; set; }
    public DeviceMetricCalibration[]? Calibration { get; set; }
    public string? OperationalStatus { get; set; }
    
    public class DeviceMetricCalibration : BackboneElement
    {
        public string? Type { get; set; }
        public string? State { get; set; }
        public string? Time { get; set; }
    }
    
}

