import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface ResultsProps {
  result: string | null;
}

const Results: React.FC<ResultsProps> = ({ result }) => {
  if (!result) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Analysis Result</h3>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <ClipboardCheck className="w-4 h-4" />
          Copy
        </button>
      </div>
      <div className="bg-gray-50 rounded-lg overflow-x-auto">
        <SyntaxHighlighter
          language="plaintext"
          style={docco}
          customStyle={{
            padding: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: '#f8fafc'
          }}
        >
          {result}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default Results;