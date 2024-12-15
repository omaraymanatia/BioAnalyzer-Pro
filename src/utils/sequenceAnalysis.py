"""Sequence analysis module."""

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