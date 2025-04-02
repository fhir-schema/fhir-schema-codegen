
namespace Aidbox.FHIR.R4.Core;

public class MolecularSequence : DomainResource
{
    public ResourceReference? Patient { get; set; }
    public MolecularSequenceStructureVariant[]? StructureVariant { get; set; }
    public MolecularSequenceRepository[]? Repository { get; set; }
    public MolecularSequenceVariant[]? Variant { get; set; }
    public ResourceReference? Specimen { get; set; }
    public string? Type { get; set; }
    public ResourceReference[]? Pointer { get; set; }
    public string? ObservedSeq { get; set; }
    public Identifier[]? Identifier { get; set; }
    public MolecularSequenceQuality[]? Quality { get; set; }
    public ResourceReference? Device { get; set; }
    public Quantity? Quantity { get; set; }
    public int? CoordinateSystem { get; set; }
    public MolecularSequenceReferenceSeq? ReferenceSeq { get; set; }
    public ResourceReference? Performer { get; set; }
    public int? ReadCoverage { get; set; }
    
    public class MolecularSequenceStructureVariantOuter : BackboneElement
    {
        public int? Start { get; set; }
        public int? End { get; set; }
    }
    
    public class MolecularSequenceStructureVariantInner : BackboneElement
    {
        public int? Start { get; set; }
        public int? End { get; set; }
    }
    
    public class MolecularSequenceStructureVariant : BackboneElement
    {
        public CodeableConcept? VariantType { get; set; }
        public bool? Exact { get; set; }
        public int? Length { get; set; }
        public MolecularSequenceStructureVariantOuter? Outer { get; set; }
        public MolecularSequenceStructureVariantInner? Inner { get; set; }
    }
    
    public class MolecularSequenceRepository : BackboneElement
    {
        public string? Type { get; set; }
        public string? Url { get; set; }
        public string? Name { get; set; }
        public string? DatasetId { get; set; }
        public string? VariantsetId { get; set; }
        public string? ReadsetId { get; set; }
    }
    
    public class MolecularSequenceVariant : BackboneElement
    {
        public int? Start { get; set; }
        public int? End { get; set; }
        public string? ObservedAllele { get; set; }
        public string? ReferenceAllele { get; set; }
        public string? Cigar { get; set; }
        public ResourceReference? VariantPointer { get; set; }
    }
    
    public class MolecularSequenceQualityRoc : BackboneElement
    {
        public int[]? Score { get; set; }
        public int[]? NumTP { get; set; }
        public int[]? NumFP { get; set; }
        public int[]? NumFN { get; set; }
        public decimal[]? Precision { get; set; }
        public decimal[]? Sensitivity { get; set; }
        public decimal[]? FMeasure { get; set; }
    }
    
    public class MolecularSequenceQuality : BackboneElement
    {
        public decimal? TruthTP { get; set; }
        public decimal? FScore { get; set; }
        public decimal? TruthFN { get; set; }
        public decimal? QueryFP { get; set; }
        public CodeableConcept? Method { get; set; }
        public decimal? Precision { get; set; }
        public int? Start { get; set; }
        public decimal? QueryTP { get; set; }
        public string? Type { get; set; }
        public decimal? Recall { get; set; }
        public MolecularSequenceQualityRoc? Roc { get; set; }
        public Quantity? Score { get; set; }
        public int? End { get; set; }
        public CodeableConcept? StandardSequence { get; set; }
        public decimal? GtFP { get; set; }
    }
    
    public class MolecularSequenceReferenceSeq : BackboneElement
    {
        public CodeableConcept? Chromosome { get; set; }
        public CodeableConcept? ReferenceSeqId { get; set; }
        public int? WindowEnd { get; set; }
        public string? Strand { get; set; }
        public string? GenomeBuild { get; set; }
        public string? Orientation { get; set; }
        public ResourceReference? ReferenceSeqPointer { get; set; }
        public string? ReferenceSeqString { get; set; }
        public int? WindowStart { get; set; }
    }
    
}

