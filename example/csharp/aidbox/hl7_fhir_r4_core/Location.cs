
namespace Aidbox.FHIR.R4.Core;

public class Location : DomainResource
{
    public string? Description { get; set; }
    public Address? Address { get; set; }
    public ResourceReference? ManagingOrganization { get; set; }
    public string? Name { get; set; }
    public string? Mode { get; set; }
    public CodeableConcept[]? Type { get; set; }
    public string[]? Alias { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public LocationHoursOfOperation[]? HoursOfOperation { get; set; }
    public string? AvailabilityExceptions { get; set; }
    public LocationPosition? Position { get; set; }
    public ContactPoint[]? Telecom { get; set; }
    public Coding? OperationalStatus { get; set; }
    public ResourceReference? PartOf { get; set; }
    public CodeableConcept? PhysicalType { get; set; }
    public ResourceReference[]? Endpoint { get; set; }
    
    public class LocationHoursOfOperation : BackboneElement
    {
        public string[]? DaysOfWeek { get; set; }
        public bool? AllDay { get; set; }
        public string? OpeningTime { get; set; }
        public string? ClosingTime { get; set; }
    }
    
    public class LocationPosition : BackboneElement
    {
        public decimal? Longitude { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Altitude { get; set; }
    }
    
}

