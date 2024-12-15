"""Basic DNA operations module."""

def complement_dna(sequence):
    """Return the complement of a DNA sequence."""
    complement_dict = {'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'}
    return ''.join(complement_dict.get(base.upper(), base) for base in sequence)

def reverse_complement(sequence):
    """Return the reverse complement of a DNA sequence."""
    return complement_dna(sequence)[::-1]

def gc_content(sequence):
    """Calculate the GC content percentage of a DNA sequence."""
    sequence = sequence.upper()
    gc_count = sequence.count('G') + sequence.count('C')
    total = len(sequence)
    return (gc_count / total * 100) if total > 0 else 0

def transcribe_dna_to_rna(sequence):
    """Convert DNA sequence to RNA sequence."""
    return sequence.upper().replace('T', 'U')

def find_start_codons(sequence):
    """Find all start codons (ATG) in a DNA sequence."""
    sequence = sequence.upper()
    start_positions = []
    for i in range(0, len(sequence)-2):
        if sequence[i:i+3] == 'ATG':
            start_positions.append(i)
    return start_positions