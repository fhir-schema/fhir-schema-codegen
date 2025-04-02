
namespace Aidbox.FHIR.R4.Core;

public class TestReport : DomainResource
{
    public string? Tester { get; set; }
    public string? Name { get; set; }
    public ResourceReference? TestScript { get; set; }
    public TestReportParticipant[]? Participant { get; set; }
    public TestReportSetup? Setup { get; set; }
    public string? Status { get; set; }
    public string? Result { get; set; }
    public decimal? Score { get; set; }
    public Identifier? Identifier { get; set; }
    public string? Issued { get; set; }
    public TestReportTeardown? Teardown { get; set; }
    public TestReportTest[]? Test { get; set; }
    
    public class TestReportParticipant : BackboneElement
    {
        public string? Type { get; set; }
        public string? Uri { get; set; }
        public string? Display { get; set; }
    }
    
    public class TestReportSetupActionOperation : BackboneElement
    {
        public string? Result { get; set; }
        public string? Message { get; set; }
        public string? Detail { get; set; }
    }
    
    public class TestReportSetupActionAssert : BackboneElement
    {
        public string? Result { get; set; }
        public string? Message { get; set; }
        public string? Detail { get; set; }
    }
    
    public class TestReportSetupAction : BackboneElement
    {
        public TestReportSetupActionOperation? Operation { get; set; }
        public TestReportSetupActionAssert? Assert { get; set; }
    }
    
    public class TestReportSetup : BackboneElement
    {
        public TestReportSetupAction[]? Action { get; set; }
    }
    
    public class TestReportTeardownAction : BackboneElement
    {
        public TestReportSetupActionOperation? Operation { get; set; }
    }
    
    public class TestReportTeardown : BackboneElement
    {
        public TestReportTeardownAction[]? Action { get; set; }
    }
    
    public class TestReportTestAction : BackboneElement
    {
        public TestReportSetupActionOperation? Operation { get; set; }
        public TestReportSetupActionAssert? Assert { get; set; }
    }
    
    public class TestReportTest : BackboneElement
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public TestReportTestAction[]? Action { get; set; }
    }
    
}

