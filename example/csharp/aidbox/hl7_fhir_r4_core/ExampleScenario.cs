
namespace Aidbox.FHIR.R4.Core;

public class ExampleScenario : DomainResource
{
    public string? Date { get; set; }
    public string? Publisher { get; set; }
    public ExampleScenarioInstance[]? Instance { get; set; }
    public CodeableConcept[]? Jurisdiction { get; set; }
    public string? Purpose { get; set; }
    public string? Name { get; set; }
    public ExampleScenarioProcess[]? Process { get; set; }
    public UsageContext[]? UseContext { get; set; }
    public string? Copyright { get; set; }
    public bool? Experimental { get; set; }
    public string[]? Workflow { get; set; }
    public string? Status { get; set; }
    public string? Url { get; set; }
    public Identifier[]? Identifier { get; set; }
    public string? Version { get; set; }
    public ContactDetail[]? Contact { get; set; }
    public ExampleScenarioActor[]? Actor { get; set; }
    
    public class ExampleScenarioInstanceVersion : BackboneElement
    {
        public string? VersionId { get; set; }
        public string? Description { get; set; }
    }
    
    public class ExampleScenarioInstanceContainedInstance : BackboneElement
    {
        public string? ResourceId { get; set; }
        public string? VersionId { get; set; }
    }
    
    public class ExampleScenarioInstance : BackboneElement
    {
        public string? ResourceId { get; set; }
        public string? ResourceType { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public ExampleScenarioInstanceVersion[]? Version { get; set; }
        public ExampleScenarioInstanceContainedInstance[]? ContainedInstance { get; set; }
    }
    
    public class ExampleScenarioProcessStepOperation : BackboneElement
    {
        public ExampleScenarioInstanceContainedInstance? Response { get; set; }
        public string? Description { get; set; }
        public ExampleScenarioInstanceContainedInstance? Request { get; set; }
        public string? Number { get; set; }
        public string? Name { get; set; }
        public string? Initiator { get; set; }
        public string? Type { get; set; }
        public bool? ReceiverActive { get; set; }
        public bool? InitiatorActive { get; set; }
        public string? Receiver { get; set; }
    }
    
    public class ExampleScenarioProcessStepAlternative : BackboneElement
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public ExampleScenarioProcessStep[]? Step { get; set; }
    }
    
    public class ExampleScenarioProcessStep : BackboneElement
    {
        public ExampleScenarioProcess[]? Process { get; set; }
        public bool? Pause { get; set; }
        public ExampleScenarioProcessStepOperation? Operation { get; set; }
        public ExampleScenarioProcessStepAlternative[]? Alternative { get; set; }
    }
    
    public class ExampleScenarioProcess : BackboneElement
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? PreConditions { get; set; }
        public string? PostConditions { get; set; }
        public ExampleScenarioProcessStep[]? Step { get; set; }
    }
    
    public class ExampleScenarioActor : BackboneElement
    {
        public string? ActorId { get; set; }
        public string? Type { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
    
}

