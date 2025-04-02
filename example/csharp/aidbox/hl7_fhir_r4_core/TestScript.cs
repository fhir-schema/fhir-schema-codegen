
namespace Aidbox.FHIR.R4.Core;

public class TestScript : DomainResource
{
    public string? Description { get; set; }
    public string? Date { get; set; }
    public TestScriptVariable[]? Variable { get; set; }
    public string? Publisher { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public string? Purpose { get; set; }
    public string? Name { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public string? Copyright { get; set; }
    public bool? Experimental { get; set; }
    public string? Title { get; set; }
    public TestScriptSetup? Setup { get; set; }
    public string? Status { get; set; }
    public string? Url { get; set; }
    public Identifier? Identifier { get; set; }
    public TestScriptOrigin[]? Origin { get; set; }
    public TestScriptFixture[]? Fixture { get; set; }
    public string? Version { get; set; }
    public TestScriptTeardown? Teardown { get; set; }
    public ContactDetail[]? Contact { get; set; }
    public TestScriptMetadata? Metadata { get; set; }
    public TestScriptDestination[]? Destination { get; set; }
    public TestScriptTest[]? Test { get; set; }
    public ResourceReference[]? Profile { get; set; }
    
    public class TestScriptVariable : BackboneElement
    {
        public string? Name { get; set; }
        public string? DefaultValue { get; set; }
        public string? Description { get; set; }
        public string? Expression { get; set; }
        public string? HeaderField { get; set; }
        public string? Hint { get; set; }
        public string? Path { get; set; }
        public string? SourceId { get; set; }
    }
    
    public class TestScriptSetupActionOperationRequestHeader : BackboneElement
    {
        public string? Field { get; set; }
        public string? Value { get; set; }
    }
    
    public class TestScriptSetupActionOperation : BackboneElement
    {
        public string? Description { get; set; }
        public string? Method { get; set; }
        public string? TargetId { get; set; }
        public TestScriptSetupActionOperationRequestHeader[]? RequestHeader { get; set; }
        public string? Params { get; set; }
        public Coding? Type { get; set; }
        public string? RequestId { get; set; }
        public bool? EncodeRequestUrl { get; set; }
        public string? Label { get; set; }
        public string? Resource { get; set; }
        public string? Url { get; set; }
        public int? Origin { get; set; }
        public string? ContentType { get; set; }
        public string? SourceId { get; set; }
        public string? ResponseId { get; set; }
        public int? Destination { get; set; }
        public string? Accept { get; set; }
    }
    
    public class TestScriptSetupActionAssert : BackboneElement
    {
        public string? Response { get; set; }
        public string? Description { get; set; }
        public string? Path { get; set; }
        public string? HeaderField { get; set; }
        public string? CompareToSourceId { get; set; }
        public string? Expression { get; set; }
        public string? Value { get; set; }
        public bool? WarningOnly { get; set; }
        public string? CompareToSourceExpression { get; set; }
        public string? Label { get; set; }
        public string? Resource { get; set; }
        public string? ResponseCode { get; set; }
        public string? MinimumId { get; set; }
        public string? Operator { get; set; }
        public string? ContentType { get; set; }
        public string? CompareToSourcePath { get; set; }
        public string? ValidateProfileId { get; set; }
        public string? SourceId { get; set; }
        public string? RequestMethod { get; set; }
        public string? RequestURL { get; set; }
        public string? Direction { get; set; }
        public bool? NavigationLinks { get; set; }
    }
    
    public class TestScriptSetupAction : BackboneElement
    {
        public TestScriptSetupActionOperation? Operation { get; set; }
        public TestScriptSetupActionAssert? Assert { get; set; }
    }
    
    public class TestScriptSetup : BackboneElement
    {
        public TestScriptSetupAction[]? Action { get; set; }
    }
    
    public class TestScriptOrigin : BackboneElement
    {
        public int? Index { get; set; }
        public Coding? Profile { get; set; }
    }
    
    public class TestScriptFixture : BackboneElement
    {
        public bool? Autocreate { get; set; }
        public bool? Autodelete { get; set; }
        public ResourceReference? Resource { get; set; }
    }
    
    public class TestScriptTeardownAction : BackboneElement
    {
        public TestScriptSetupActionOperation? Operation { get; set; }
    }
    
    public class TestScriptTeardown : BackboneElement
    {
        public TestScriptTeardownAction[]? Action { get; set; }
    }
    
    public class TestScriptMetadataLink : BackboneElement
    {
        public string? Url { get; set; }
        public string? Description { get; set; }
    }
    
    public class TestScriptMetadataCapability : BackboneElement
    {
        public bool? Required { get; set; }
        public bool? Validated { get; set; }
        public string? Description { get; set; }
        public int[]? Origin { get; set; }
        public int? Destination { get; set; }
        public string[]? Link { get; set; }
        public string? Capabilities { get; set; }
    }
    
    public class TestScriptMetadata : BackboneElement
    {
        public TestScriptMetadataLink[]? Link { get; set; }
        public TestScriptMetadataCapability[]? Capability { get; set; }
    }
    
    public class TestScriptDestination : BackboneElement
    {
        public int? Index { get; set; }
        public Coding? Profile { get; set; }
    }
    
    public class TestScriptTestAction : BackboneElement
    {
        public TestScriptSetupActionOperation? Operation { get; set; }
        public TestScriptSetupActionAssert? Assert { get; set; }
    }
    
    public class TestScriptTest : BackboneElement
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public TestScriptTestAction[]? Action { get; set; }
    }
    
}

