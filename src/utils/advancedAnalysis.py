"""Advanced DNA analysis module."""

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
    suffixes = []
    for i in range(len(text)):
        suffixes.append(text[i:])

    original_suffixes = suffixes.copy()
    suffixes.sort()

    sorted_position = {suffix: i for i, suffix in enumerate(suffixes)}
    
    return [
        [original_suffixes[i], i, sorted_position[original_suffixes[i]]]
        for i in range(len(original_suffixes))
    ]

def calculate_kmer_distance(seq1, seq2, k=3):
    """Calculate the k-mer distance between two sequences."""
    def get_kmer_frequencies(seq, k):
        kmer_dict = {}
        for i in range(len(seq) - k + 1):
            kmer = seq[i:i + k]
            kmer_dict[kmer] = kmer_dict.get(kmer, 0) + 1
        return kmer_dict

    kmer_freq1 = get_kmer_frequencies(seq1, k)
    kmer_freq2 = get_kmer_frequencies(seq2, k)
    all_kmers = set(kmer_freq1.keys()).union(set(kmer_freq2.keys()))

    sum_squared_diff = sum(
        (kmer_freq1.get(kmer, 0) - kmer_freq2.get(kmer, 0)) ** 2
        for kmer in all_kmers
    )

    return sum_squared_diff ** 0.5