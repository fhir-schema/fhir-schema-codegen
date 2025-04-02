
namespace Aidbox.FHIR.R4.Core;

public class ImagingStudy : DomainResource
{
    public string? Description { get; set; }
    public string? Started { get; set; }
    public long? NumberOfSeries { get; set; }
    public ResourceReference[]? Interpreter { get; set; }
    public ImagingStudySeries[]? Series { get; set; }
    public ResourceReference? ProcedureReference { get; set; }
    public ResourceReference? Encounter { get; set; }
    public CodeableConcept[]? ReasonCode { get; set; }
    public Coding[]? Modality { get; set; }
    public Annotation[]? Note { get; set; }
    public ResourceReference? Referrer { get; set; }
    public string? Status { get; set; }
    public Identifier[]? Identifier { get; set; }
    public ResourceReference[]? BasedOn { get; set; }
    public ResourceReference? Location { get; set; }
    public ResourceReference[]? Endpoint { get; set; }
    public ResourceReference? Subject { get; set; }
    public long? NumberOfInstances { get; set; }
    public ResourceReference[]? ReasonReference { get; set; }
    public CodeableConcept[]? ProcedureCode { get; set; }
    
    public class ImagingStudySeriesInstance : BackboneElement
    {
        public string? Uid { get; set; }
        public Coding? SopClass { get; set; }
        public long? Number { get; set; }
        public string? Title { get; set; }
    }
    
    public class ImagingStudySeriesPerformer : BackboneElement
    {
        public CodeableConcept? Function { get; set; }
        public ResourceReference? Actor { get; set; }
    }
    
    public class ImagingStudySeries : BackboneElement
    {
        public string? Description { get; set; }
        public string? Started { get; set; }
        public Coding? Laterality { get; set; }
        public ImagingStudySeriesInstance[]? Instance { get; set; }
        public long? Number { get; set; }
        public string? Uid { get; set; }
        public ResourceReference[]? Specimen { get; set; }
        public Coding? Modality { get; set; }
        public Coding? BodySite { get; set; }
        public ResourceReference[]? Endpoint { get; set; }
        public long? NumberOfInstances { get; set; }
        public ImagingStudySeriesPerformer[]? Performer { get; set; }
    }
    
}

