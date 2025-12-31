
export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface Quiz {
  id: string;
  icon: string;
  title: string;
  description: string;
  link?: string;
  questions?: Question[];
}
