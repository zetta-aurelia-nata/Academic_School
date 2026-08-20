// ****************** TYPES ******************
export type QuestionType = 'essay' | 'multiple_choice';

// ****************** INTERFACES ******************
export interface QuestionOption {
  // Option text displayed for the user
  text: string;

  // Indicates whether this option is the correct answer
  isCorrect: boolean;
}

export interface Question {
  // Unique identifier for the question
  id: number;

  // Type of the assessment question
  type: QuestionType;

  // The main text of the question
  text: string;

  // Total score points assigned to this question
  points: number;

  // Maximum allowed word count for the answer (used for essay type)
  maxWord?: number;

  // List of answer options (used for multiple choice type)
  options?: QuestionOption[];
}
