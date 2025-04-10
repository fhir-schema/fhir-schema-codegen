
namespace Aidbox.FHIR.R4.Core;

public class SubstancePolymer : DomainResource
{
    public CodeableConcept? Class { get; set; }
    public CodeableConcept? Geometry { get; set; }
    public CodeableConcept[]? CopolymerConnectivity { get; set; }
    public string[]? Modification { get; set; }
    public SubstancePolymerMonomerSet[]? MonomerSet { get; set; }
    public SubstancePolymerRepeat[]? Repeat { get; set; }
    
    public class SubstancePolymerMonomerSetStartingMaterial : BackboneElement
    {
        public CodeableConcept? Material { get; set; }
        public CodeableConcept? Type { get; set; }
        public bool? IsDefining { get; set; }
        public SubstanceAmount? Amount { get; set; }
    }
    
    public class SubstancePolymerMonomerSet : BackboneElement
    {
        public CodeableConcept? RatioType { get; set; }
        public SubstancePolymerMonomerSetStartingMaterial[]? StartingMaterial { get; set; }
    }
    
    public class SubstancePolymerRepeatRepeatUnitDegreeOfPolymerisation : BackboneElement
    {
        public CodeableConcept? Degree { get; set; }
        public SubstanceAmount? Amount { get; set; }
    }
    
    public class SubstancePolymerRepeatRepeatUnitStructuralRepresentation : BackboneElement
    {
        public CodeableConcept? Type { get; set; }
        public string? Representation { get; set; }
        public Attachment? Attachment { get; set; }
    }
    
    public class SubstancePolymerRepeatRepeatUnit : BackboneElement
    {
        public CodeableConcept? OrientationOfPolymerisation { get; set; }
        public string? RepeatUnit { get; set; }
        public SubstanceAmount? Amount { get; set; }
        public SubstancePolymerRepeatRepeatUnitDegreeOfPolymerisation[]? DegreeOfPolymerisation { get; set; }
        public SubstancePolymerRepeatRepeatUnitStructuralRepresentation[]? StructuralRepresentation { get; set; }
    }
    
    public class SubstancePolymerRepeat : BackboneElement
    {
        public int? NumberOfUnits { get; set; }
        public string? AverageMolecularFormula { get; set; }
        public CodeableConcept? RepeatUnitAmountType { get; set; }
        public SubstancePolymerRepeatRepeatUnit[]? RepeatUnit { get; set; }
    }
    
}

