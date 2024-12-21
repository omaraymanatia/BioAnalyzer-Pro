import React, { useState } from 'react';
import { Dna } from 'lucide-react';
import SequenceInput from './components/SequenceInput';
import AnalysisTools from './components/AnalysisTools';
import Results from './components/Results';
import { basicAnalysis, advancedAnalysis } from './utils/dnaAnalysis';

function App() {
  const [sequence, setSequence] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [secondSequence, setSecondSequence] = useState('');
  const [showSecondInput, setShowSecondInput] = useState(false);
  const [kValue, setKValue] = useState(3);

  const validateSequence = (seq: string): boolean => {
    if (!seq.trim()) {
      setResult('Please enter a DNA sequence');
      return false;
    }
    return true;
  };

  const handleAnalysis = (type: string) => {
    try {
      const dnaSequence = sequence.toUpperCase();
      
      if (!validateSequence(dnaSequence)) return;

      switch (type) {
        case 'complement':
          setResult(`Complement:\n${basicAnalysis.complementDNA(dnaSequence)}`);
          break;

        case 'reverse_complement':
          setResult(`Reverse Complement:\n${basicAnalysis.reverseComplement(dnaSequence)}`);
          break;

        case 'gc_content':
          setResult(`GC Content: ${basicAnalysis.gcContent(dnaSequence)}%`);
          break;

        case 'transcribe':
          setResult(`RNA Sequence:\n${basicAnalysis.transcribeToRNA(dnaSequence)}`);
          break;

        case 'start_codons':
          const startPositions = basicAnalysis.findStartCodons(dnaSequence);
          setResult(
            startPositions.length > 0
              ? `Start Codons (ATG) found at positions:\n${startPositions.join(', ')}`
              : 'No start codons (ATG) found in the sequence'
          );
          break;

        case 'translate':
          setResult(`Protein Sequence:\n${advancedAnalysis.translateDNA(dnaSequence)}`);
          break;

        case 'find_sequence':
          if (!secondSequence) {
            setShowSecondInput(true);
            setResult('Please enter a sequence to find');
            return;
          }
          const matches = advancedAnalysis.findSequenceMatch(dnaSequence, secondSequence.toUpperCase());
          setResult(
            matches.length > 0
              ? `Sequence found at positions:\n${matches.join(', ')}`
              : 'Sequence not found'
          );
          break;

        case 'kmer_distance':
          if (!secondSequence) {
            setShowSecondInput(true);
            setResult('Please enter a second sequence for k-mer distance calculation');
            return;
          }
          if (!validateSequence(secondSequence)) return;
          const distance = advancedAnalysis.calculateKmerDistance(
            dnaSequence, 
            secondSequence.toUpperCase(),
            kValue
          );
          setResult(`K-mer distance between sequences (k=${kValue}): ${distance.toFixed(2)}`);
          break;

        case 'suffix_array':
          const suffixArray = advancedAnalysis.createSuffixArray(dnaSequence);
          setResult('Suffix Array Table:\n' + suffixArray
            .map(([suffix, origPos, sortPos]) => 
              `Position: ${origPos}, Sorted: ${sortPos}, Suffix: ${suffix}`)
            .join('\n'));
          break;

        case 'find_overlap':
          if (!secondSequence) {
            setShowSecondInput(true);
            setResult('Please enter a second sequence to find overlap');
            return;
          }
          if (!validateSequence(secondSequence)) return;
          const overlapLength = advancedAnalysis.findOverlap(
            dnaSequence,
            secondSequence.toUpperCase()
          );
          setResult(`Overlap length between sequences: ${overlapLength} bases`);
          break;

        case 'bad_chars':
          if (!secondSequence) {
            setShowSecondInput(true);
            setResult('Please enter a second sequence to find overlap');
            return;
          }
          if (!validateSequence(secondSequence)) return;
          const badChars = advancedAnalysis.findBadCharacters(dnaSequence, secondSequence.toUpperCase());
          setResult(
            badChars !== -1
              ? `Bad characters found at index:\n${badChars}`
              : 'No Bad characters found'
          );
          break;

        case 'pattern_query':
          if (!secondSequence) {
            setShowSecondInput(true);
            setResult('Please enter a pattern to search');
            return;
          }
          const occurrences = advancedAnalysis.queryPattern(
            dnaSequence,
            secondSequence.toUpperCase()
          );
          setResult(`Pattern occurs ${occurrences} times in the sequence`);
          break;

        case 'index_sorted':
          const sortedIndices = advancedAnalysis.indexSorted(dnaSequence);
          setResult(`Sorted indices:\n${sortedIndices.join(', ')}`);
          break;

        case 'sequence_compare':
          if (!secondSequence) {
            setShowSecondInput(true);
            setResult('Please enter a second sequence to compare');
            return;
          }
          if (!validateSequence(secondSequence)) return;
          const comparison = {
            overlap: advancedAnalysis.findOverlap(dnaSequence, secondSequence.toUpperCase()),
            kmerDistance: advancedAnalysis.calculateKmerDistance(dnaSequence, secondSequence.toUpperCase(), kValue),
            matches: advancedAnalysis.findSequenceMatch(dnaSequence, secondSequence.toUpperCase()).length
          };
          setResult(
            'Sequence Comparison Results:\n' +
            `Overlap Length: ${comparison.overlap} bases\n` +
            `K-mer Distance (k=${kValue}): ${comparison.kmerDistance.toFixed(2)}\n` +
            `Exact Matches: ${comparison.matches}`
          );
          break;

        default:
          setResult('Invalid analysis type');
      }
    } catch (error) {
      setResult('Error processing sequence. Please ensure valid DNA sequence.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Dna className="w-12 h-12 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">BioAnalyzer Pro</h1>
          </div>
          <p className="text-xl text-gray-600">
            Advanced DNA Sequence Analysis Tools
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-8">
          <SequenceInput 
            sequence={sequence} 
            setSequence={setSequence}
            secondSequence={secondSequence}
            setSecondSequence={setSecondSequence}
            showSecondInput={showSecondInput}
            kValue={kValue}
            setKValue={setKValue}
          />
          
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Analysis Tools
            </h2>
            <AnalysisTools onAnalyze={handleAnalysis} />
          </div>

          <Results result={result} />
        </div>

        <footer className="mt-12 text-center text-gray-600">
          <p>Built with advanced bioinformatics algorithms</p>
          <p>&copy; 2024 BFCAI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;