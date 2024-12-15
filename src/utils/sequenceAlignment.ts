export const sequenceAlignment = {
  findOverlap: (seq1: string, seq2: string, minLength: number = 3): number => {
    for (let i = 0; i < seq1.length; i++) {
      const suffix = seq1.slice(i);
      if (seq2.startsWith(suffix) && suffix.length >= minLength) {
        return suffix.length;
      }
    }
    return 0;
  },

  createSuffixArray: (sequence: string): Array<[string, number, number]> => {
    // Generate all suffixes with their original positions
    const suffixes: Array<[string, number, number]> = sequence.split('').map((_, i) => [
      sequence.slice(i), // suffix
      i, // original position
      0 // sorted position (to be filled)
    ]);

    // Sort suffixes lexicographically
    suffixes.sort((a, b) => a[0].localeCompare(b[0]));

    // Fill in sorted positions
    suffixes.forEach((suffix, index) => {
      suffix[2] = index;
    });

    return suffixes;
  },

  query: (text: string, pattern: string, index: number[]): number => {
    const patternLength = pattern.length;
    return index.reduce((count, i) => {
      if (i + patternLength <= text.length && 
          text.slice(i, i + patternLength) === pattern) {
        return count + 1;
      }
      return count;
    }, 0);
  }
};