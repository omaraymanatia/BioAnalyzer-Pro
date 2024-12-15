// Sequence Matching and Pattern Analysis Functions
export const sequenceMatching = {
  match: (sequence: string, subSequence: string): number[] => {
    const positions: number[] = [];
    const seqLen = sequence.length;
    const subSeqLen = subSequence.length;
    
    for (let i = 0; i <= seqLen - subSeqLen; i++) {
      if (sequence.slice(i, i + subSeqLen) === subSequence) {
        positions.push(i);
      }
    }
    
    return positions;
  },

  findBadCharacters: (sequence: string, validChars: Set<string>): string[] => {
    return [...new Set(sequence.split('').filter(char => !validChars.has(char)))];
  },

  indexSorted: (sequence: string): number[] => {
    const indices = Array.from({ length: sequence.length }, (_, i) => i);
    return indices.sort((a, b) => sequence[a].localeCompare(sequence[b]));
  }
};