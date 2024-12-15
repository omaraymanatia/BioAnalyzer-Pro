import React from 'react';
import { Dna, Hash } from 'lucide-react';

interface SequenceInputProps {
  sequence: string;
  setSequence: (sequence: string) => void;
  secondSequence: string;
  setSecondSequence: (sequence: string) => void;
  showSecondInput: boolean;
  kValue: number;
  setKValue: (value: number) => void;
}

const SequenceInput: React.FC<SequenceInputProps> = ({ 
  sequence, 
  setSequence, 
  secondSequence, 
  setSecondSequence, 
  showSecondInput,
  kValue,
  setKValue
}) => {
  return (
    <div className="space-y-6">
      <div className="w-full">
        <div className="flex items-center gap-2 mb-2">
          <Dna className="w-5 h-5 text-indigo-600" />
          <label htmlFor="sequence" className="text-lg font-medium text-gray-700">
            Primary DNA Sequence
          </label>
        </div>
        <textarea
          id="sequence"
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          placeholder="Enter DNA sequence (e.g., ATCGTAGCTAGC)"
          className="w-full h-32 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          spellCheck="false"
        />
      </div>

      {showSecondInput && (
        <div className="w-full">
          <div className="flex items-center gap-2 mb-2">
            <Dna className="w-5 h-5 text-indigo-600" />
            <label htmlFor="secondSequence" className="text-lg font-medium text-gray-700">
              Secondary DNA Sequence
            </label>
            <span className="text-sm text-gray-500">
              (for comparison, pattern matching, or overlap analysis)
            </span>
          </div>
          <textarea
            id="secondSequence"
            value={secondSequence}
            onChange={(e) => setSecondSequence(e.target.value)}
            placeholder="Enter second DNA sequence for comparison"
            className="w-full h-32 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            spellCheck="false"
          />
        </div>
      )}

      <div className="w-full flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-indigo-600" />
          <label htmlFor="kValue" className="text-sm font-medium text-gray-700">
            K-mer Size
          </label>
        </div>
        <input
          type="number"
          id="kValue"
          value={kValue}
          onChange={(e) => setKValue(Math.max(1, parseInt(e.target.value)))}
          min="1"
          className="w-20 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <span className="text-sm text-gray-500">
          (used for k-mer distance calculation)
        </span>
      </div>
    </div>
  );
};

export default SequenceInput;