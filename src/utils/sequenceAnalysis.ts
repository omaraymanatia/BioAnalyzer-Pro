// Advanced Sequence Analysis Functions
export const sequenceAnalysis = {
  calculateKmerDistance: (seq1: string, seq2: string, k: number = 3): number => {
    const getKmerFrequencies = (seq: string, k: number) => {
      const frequencies: { [key: string]: number } = {};
      for (let i = 0; i <= seq.length - k; i++) {
        const kmer = seq.slice(i, i + k);
        frequencies[kmer] = (frequencies[kmer] || 0) + 1;
      }
      return frequencies;
    };

    const freq1 = getKmerFrequencies(seq1, k);
    const freq2 = getKmerFrequencies(seq2, k);
    const allKmers = new Set([...Object.keys(freq1), ...Object.keys(freq2)]);

    let sumSquaredDiff = 0;
    allKmers.forEach(kmer => {
      const f1 = freq1[kmer] || 0;
      const f2 = freq2[kmer] || 0;
      sumSquaredDiff += Math.pow(f2 - f1, 2);
    });

    return Math.sqrt(sumSquaredDiff);
  }
};