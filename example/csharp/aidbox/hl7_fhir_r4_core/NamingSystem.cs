
namespace Aidbox.FHIR.R4.Core;

public class NamingSystem : DomainResource
{
    public string? Description { get; set; }
    public string? Date { get; set; }
    public string? Publisher { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public string? Name { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public CodeableConcept? Type { get; set; }
    public string? Responsible { get; set; }
    public string? Usage { get; set; }
    public string? Status { get; set; }
    public string? Kind { get; set; }
    public NamingSystemUniqueId[]? UniqueId { get; set; }
    public ContactDetail[]? Contact { get; set; }
    
    public class NamingSystemUniqueId : BackboneElement
    {
        public string? Type { get; set; }
        public string? Value { get; set; }
        public bool? Preferred { get; set; }
        public string? Comment { get; set; }
        public Period? Period { get; set; }
    }
    
}

