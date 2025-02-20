export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  track: string;
  topic: string;
  difficulty: string;
  year: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Track {
  id: string;
  title: string;
  description: string;
  progress: number;
  questionsCompleted: number;
  totalQuestions: number;
  lastActive: string;
  color: string;
}

export interface SearchFilters {
  year: string;
  topic: string;
  difficulty: string;
}
