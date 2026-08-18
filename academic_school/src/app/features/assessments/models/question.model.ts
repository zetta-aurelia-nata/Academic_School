export type QuestionType = 'essay' | 'multiple_choice';

export interface QuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  points: number;
  maxWord?: number;
  options?: QuestionOption[];
}
