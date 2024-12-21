import { DNA_CODON_TABLE, DNA_COMPLEMENT, VALID_DNA_BASES } from "./constants";

// Basic DNA Analysis Functions
export const basicAnalysis = {
  complementDNA: (sequence: string): string => {
    return sequence
      .toUpperCase()
      .split("")
      .map((base) => DNA_COMPLEMENT[base] || base)
      .join("");
  },

  reverseComplement: (sequence: string): string => {
    return basicAnalysis.complementDNA(sequence.split("").reverse().join(""));
  },

  gcContent: (sequence: string): number => {
    const upperSequence = sequence.toUpperCase();
    const gcCount = (upperSequence.match(/[GC]/g) || []).length;
    return Number(((gcCount / sequence.length) * 100).toFixed(2));
  },

  transcribeToRNA: (sequence: string): string => {
    return sequence.toUpperCase().replace(/T/g, "U");
  },

  findStartCodons: (sequence: string): number[] => {
    const positions: number[] = [];
    const upperSequence = sequence.toUpperCase();

    for (let i = 0; i < sequence.length - 2; i++) {
      if (upperSequence.slice(i, i + 3) === "ATG") {
        positions.push(i + 1);
      }
    }

    return positions;
  },
};

// Advanced DNA Analysis Functions
export const advancedAnalysis = {
  translateDNA: (sequence: string): string => {
    const seq = sequence.toUpperCase();
    const protein: string[] = [];

    for (let i = 0; i < seq.length - 2; i += 3) {
      const codon = seq.slice(i, i + 3);
      protein.push(DNA_CODON_TABLE[codon] || "?");
    }

    return protein.join("");
  },

  findSequenceMatch: (sequence: string, subSequence: string): number[] => {
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

  calculateKmerDistance: (
    seq1: string,
    seq2: string,
    k: number = 3
  ): number => {
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
    allKmers.forEach((kmer) => {
      const f1 = freq1[kmer] || 0;
      const f2 = freq2[kmer] || 0;
      sumSquaredDiff += Math.pow(f2 - f1, 2);
    });

    return Math.sqrt(sumSquaredDiff);
  },

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
    const suffixes: Array<[string, number, number]> = sequence
      .split("")
      .map((_, i) => [sequence.slice(i), i, 0]);

    suffixes.sort((a, b) => a[0].localeCompare(b[0]));
    suffixes.forEach((suffix, index) => {
      suffix[2] = index;
    });

    return suffixes;
  },

  findBadCharacters: (sequence: string, subSequence: string): number => {
    const createBadCharTable = (subSeq: string) => {
      const badCharTable: { [key: string]: number } = {};
      for (let i = 0; i < subSeq.length; i++) {
        badCharTable[subSeq[i]] = i;
      }
      return badCharTable;
    };

    const badCharTable = createBadCharTable(subSequence);
    const n = sequence.length;
    const m = subSequence.length;
    let lastIndex = -1;
    let i = 0;

    while (i <= n - m) {
      let j = m - 1;

      while (j >= 0 && subSequence[j] === sequence[i + j]) {
        j--;
      }

      if (j < 0) {
        lastIndex = i;
        i += 1;
      } else {
        const badCharShift =
          badCharTable[sequence[i + j]] !== undefined
            ? badCharTable[sequence[i + j]]
            : -1;
        i += Math.max(1, j - badCharShift);
      }
    }

    return lastIndex;
  },

  indexSorted: (sequence: string): [string, number][] => {
    length=3;
    const index: [string, number][] = [];
    const seqLen = sequence.length;
  
    for (let i = 0; i <= seqLen - length; i++) {
      index.push([sequence.slice(i, i + length), i]);
    }
  
    index.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  
    return index;
  },
  
  queryPattern: (text: string, pattern: string, length: number = 3): number[] => {
    const index = advancedAnalysis.indexSorted(text);
    const keys = index.map((entry) => entry[0]);
    const patternPrefix = pattern.slice(0, length);
  
    const st = keys.findIndex((key) => key >= patternPrefix);
    const en = keys.findIndex((key) => key > patternPrefix, st);
  
    const hits = index.slice(st, en !== -1 ? en : undefined);
  
    const offsets: number[] = [];
    for (const hit of hits) {
      const [_, i] = hit;
      if (text.slice(i, i + pattern.length) === pattern) {
        offsets.push(i);
      }
    }
  
    return offsets;
  }
};