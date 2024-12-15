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

def translate_dna(seq):
    """Translate a DNA sequence to protein sequence using the standard genetic code."""
    codon_table = {
        'ATA': 'I', 'ATC': 'I', 'ATT': 'I', 'ATG': 'M',
        'ACA': 'T', 'ACC': 'T', 'ACG': 'T', 'ACT': 'T',
        'AAC': 'N', 'AAT': 'N', 'AAA': 'K', 'AAG': 'K',
        'AGC': 'S', 'AGT': 'S', 'AGA': 'R', 'AGG': 'R',
        'CTA': 'L', 'CTC': 'L', 'CTG': 'L', 'CTT': 'L',
        'CCA': 'P', 'CCC': 'P', 'CCG': 'P', 'CCT': 'P',
        'CAC': 'H', 'CAT': 'H', 'CAA': 'Q', 'CAG': 'Q',
        'CGA': 'R', 'CGC': 'R', 'CGG': 'R', 'CGT': 'R',
        'GTA': 'V', 'GTC': 'V', 'GTG': 'V', 'GTT': 'V',
        'GCA': 'A', 'GCC': 'A', 'GCG': 'A', 'GCT': 'A',
        'GAC': 'D', 'GAT': 'D', 'GAA': 'E', 'GAG': 'E',
        'GGA': 'G', 'GGC': 'G', 'GGG': 'G', 'GGT': 'G',
        'TCA': 'S', 'TCC': 'S', 'TCG': 'S', 'TCT': 'S',
        'TTC': 'F', 'TTT': 'F', 'TTA': 'L', 'TTG': 'L',
        'TAC': 'Y', 'TAT': 'Y', 'TAA': '*', 'TAG': '*',
        'TGC': 'C', 'TGT': 'C', 'TGA': '*', 'TGG': 'W',
    }
    
    seq = seq.upper()
    protein = []
    for i in range(0, len(seq) - 2, 3):
        codon = seq[i:i+3]
        if codon in codon_table:
            protein.append(codon_table[codon])
        else:
            protein.append('?')
    
    return ''.join(protein)

def find_sequence_match(seq, sub_seq):
    """Find all occurrences of a subsequence in a sequence."""
    positions = []
    seq_len = len(seq)
    sub_seq_len = len(sub_seq)
    
    for i in range(seq_len - sub_seq_len + 1):
        if seq[i:i + sub_seq_len] == sub_seq:
            positions.append(i)
    
    return positions

def find_bad_characters(seq, valid_chars=set('ATCG')):
    """Find characters that are not valid DNA bases."""
    return list(set(char for char in seq.upper() if char not in valid_chars))

def index_sorted(seq):
    """Create a sorted index of sequence positions."""
    indices = list(range(len(seq)))
    indices.sort(key=lambda i: seq[i])
    return indices

def query_pattern(text, pattern, index):
    """Count occurrences of a pattern in text using sorted index."""
    pattern_length = len(pattern)
    count = 0
    
    for i in index:
        if i + pattern_length <= len(text) and text[i:i + pattern_length] == pattern:
            count += 1
    
    return count

def find_overlap(a, b, min_length=3):
    """Find the overlap between two sequences."""
    start = 0
    
    while True:
        start = a.find(b[:min_length], start)
        
        if start == -1:
            return 0
        
        if b.startswith(a[start:]):
            return len(a) - start
        
        start += 1

def create_suffix_array(text):
    """Create a suffix array table for the sequence."""
    # Generate all suffixes
    suffixes = []
    for i in range(len(text)):
        suffixes.append(text[i:])

    # Create a copy of the original suffix list
    original_suffixes = suffixes.copy()

    # Sort the suffixes lexicographically
    suffixes.sort()

    # Create a dictionary to map each suffix to its sorted position
    sorted_position = {}
    for i in range(len(suffixes)):
        sorted_position[suffixes[i]] = i

    # Build the table
    table = []
    for i in range(len(original_suffixes)):
        table.append([
            original_suffixes[i],  # Original suffix
            i,                     # Original index
            sorted_position[original_suffixes[i]]  # Sorted position
        ])

    return table

def calculate_kmer_distance(seq1, seq2, k=3):
    """Calculate the k-mer distance between two sequences."""
    def get_kmer_frequencies(seq, k):
        kmer_dict = {}
        for i in range(len(seq) - k + 1):
            kmer = seq[i:i + k]
            kmer_dict[kmer] = kmer_dict.get(kmer, 0) + 1
        return kmer_dict

    # Calculate k-mer frequencies for both sequences
    kmer_freq1 = get_kmer_frequencies(seq1, k)
    kmer_freq2 = get_kmer_frequencies(seq2, k)

    # Create a union of all k-mers
    all_kmers = set(kmer_freq1.keys()).union(set(kmer_freq2.keys()))

    # Calculate squared differences in frequencies
    sum_squared_diff = 0
    for kmer in all_kmers:
        freq1 = kmer_freq1.get(kmer, 0)
        freq2 = kmer_freq2.get(kmer, 0)
        sum_squared_diff += (freq2 - freq1) ** 2

    # Return Euclidean distance
    return sum_squared_diff ** 0.5
