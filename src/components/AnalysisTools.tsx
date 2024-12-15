import React from 'react';
import { 
  Dna, 
  RefreshCw, 
  Percent, 
  FileCode, 
  Search, 
  Calculator,
  Combine,
  Ruler,
  Table,
  AlignLeft,
  Scissors,
  ArrowRightLeft,
  Microscope,
  SplitSquareVertical
} from 'lucide-react';
import { AnalysisToolType } from '../types/analysis';

interface AnalysisToolsProps {
  onAnalyze: (type: string) => void;
}

const tools: AnalysisToolType[] = [
  // Basic DNA Analysis
  {
    name: 'Complement',
    icon: <Dna className="w-5 h-5" />,
    action: 'complement',
    description: 'Get the complementary DNA sequence'
  },
  {
    name: 'Reverse Complement',
    icon: <RefreshCw className="w-5 h-5" />,
    action: 'reverse_complement',
    description: 'Get the reverse complement of the sequence'
  },
  {
    name: 'GC Content',
    icon: <Percent className="w-5 h-5" />,
    action: 'gc_content',
    description: 'Calculate GC content percentage'
  },
  {
    name: 'Transcribe to RNA',
    icon: <FileCode className="w-5 h-5" />,
    action: 'transcribe',
    description: 'Convert DNA to RNA sequence'
  },
  {
    name: 'Find Start Codons',
    icon: <Search className="w-5 h-5" />,
    action: 'start_codons',
    description: 'Locate ATG start codons'
  },
  {
    name: 'Translate to Protein',
    icon: <Calculator className="w-5 h-5" />,
    action: 'translate',
    description: 'Translate DNA to protein sequence'
  },
  // Advanced Analysis
  {
    name: 'Find Sequence',
    icon: <Search className="w-5 h-5" />,
    action: 'find_sequence',
    description: 'Find a specific DNA sequence'
  },
  {
    name: 'K-mer Distance',
    icon: <Ruler className="w-5 h-5" />,
    action: 'kmer_distance',
    description: 'Calculate k-mer distance between sequences'
  },
  {
    name: 'Suffix Array',
    icon: <Table className="w-5 h-5" />,
    action: 'suffix_array',
    description: 'Generate suffix array table'
  },
  {
    name: 'Find Overlap',
    icon: <Combine className="w-5 h-5" />,
    action: 'find_overlap',
    description: 'Find overlap between sequences'
  },
  {
    name: 'Bad Characters',
    icon: <Scissors className="w-5 h-5" />,
    action: 'bad_chars',
    description: 'Find invalid DNA characters'
  },
  {
    name: 'Pattern Query',
    icon: <ArrowRightLeft className="w-5 h-5" />,
    action: 'pattern_query',
    description: 'Query pattern occurrences'
  },
  {
    name: 'Index Analysis',
    icon: <Microscope className="w-5 h-5" />,
    action: 'index_sorted',
    description: 'Analyze sequence indices'
  },
  {
    name: 'Sequence Compare',
    icon: <SplitSquareVertical className="w-5 h-5" />,
    action: 'sequence_compare',
    description: 'Compare two DNA sequences'
  }
];

const AnalysisTools: React.FC<AnalysisToolsProps> = ({ onAnalyze }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {tools.map((tool) => (
        <button
          key={tool.action}
          onClick={() => onAnalyze(tool.action)}
          className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-indigo-300"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-3">
            {tool.icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{tool.name}</h3>
          <p className="text-sm text-gray-600 text-center">{tool.description}</p>
        </button>
      ))}
    </div>
  );
};

export default AnalysisTools;