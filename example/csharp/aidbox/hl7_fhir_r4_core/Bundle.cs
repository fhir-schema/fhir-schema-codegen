
namespace Aidbox.FHIR.R4.Core;

public class Bundle : Resource
{
    public Identifier? Identifier { get; set; }
    public string? Type { get; set; }
    public string? Timestamp { get; set; }
    public long? Total { get; set; }
    public BundleLink[]? Link { get; set; }
    public BundleEntry[]? Entry { get; set; }
    public Signature? Signature { get; set; }
    
    public class BundleLink : BackboneElement
    {
        public string? Relation { get; set; }
        public string? Url { get; set; }
    }
    
    public class BundleEntrySearch : BackboneElement
    {
        public string? Mode { get; set; }
        public decimal? Score { get; set; }
    }
    
    public class BundleEntryRequest : BackboneElement
    {
        public string? Method { get; set; }
        public string? Url { get; set; }
        public string? IfNoneMatch { get; set; }
        public string? IfModifiedSince { get; set; }
        public string? IfMatch { get; set; }
        public string? IfNoneExist { get; set; }
    }
    
    public class BundleEntryResponse : BackboneElement
    {
        public string? Status { get; set; }
        public string? Location { get; set; }
        public string? Etag { get; set; }
        public string? LastModified { get; set; }
        public Resource? Outcome { get; set; }
    }
    
    public class BundleEntry : BackboneElement
    {
        public BundleLink[]? Link { get; set; }
        public string? FullUrl { get; set; }
        public Resource? Resource { get; set; }
        public BundleEntrySearch? Search { get; set; }
        public BundleEntryRequest? Request { get; set; }
        public BundleEntryResponse? Response { get; set; }
    }
    
}

