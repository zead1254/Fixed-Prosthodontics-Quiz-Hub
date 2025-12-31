
export interface Question {
  id: string;
  text: string;
  options: string[];
  answer: string;
}

export interface QuizData {
  id: string;
  title: string;
  description: string;
  icon: string;
  isExternal: boolean;
  link?: string;
  questions?: Question[];
}

export type ViewState = 'home' | 'quiz' | 'result';
