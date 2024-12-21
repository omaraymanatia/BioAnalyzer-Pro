import { ReactNode } from 'react';

export interface AnalysisToolType {
  name: string;
  icon: ReactNode;
  action: string;
  description: string;
}

export interface AnalysisResult {
  type: string;
  data: any;
  error?: string;
}