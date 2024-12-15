export const bioAnalyzer = {
  complementDNA: (sequence: string): string => {
    const complementMap: { [key: string]: string } = { 'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C' };
    return sequence
      .toUpperCase()
      .split('')
      .map(base => complementMap[base] || base)
      .join('');
  },

  reverseComplement: (sequence: string): string => {
    return bioAnalyzer.complementDNA(sequence.split('').reverse().join(''));
  },

  gcContent: (sequence: string): number => {
    const upperSequence = sequence.toUpperCase();
    const gcCount = (upperSequence.match(/[GC]/g) || []).length;
    return Number(((gcCount / sequence.length) * 100).toFixed(2));
  },

  transcribeToRNA: (sequence: string): string => {
    return sequence.toUpperCase().replace(/T/g, 'U');
  },

  findStartCodons: (sequence: string): number[] => {
    const positions: number[] = [];
    const upperSequence = sequence.toUpperCase();
    
    for (let i = 0; i < sequence.length - 2; i++) {
      if (upperSequence.slice(i, i + 3) === 'ATG') {
        positions.push(i + 1);
      }
    }
    
    return positions;
  }
};