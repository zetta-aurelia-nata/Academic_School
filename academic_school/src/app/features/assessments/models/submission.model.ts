// ****************** TYPES ******************
export type SubmissionStatus = 'Completed' | 'Not Submitted' | 'In Progress';

// ****************** INTERFACES ******************
export interface SubmissionAnswer {
  // Question text displayed for the user
  question: string;

  // Answered text that displayed to user and input by user
  answer: string;

  // Total maximum score for each question
  maxScore: number;

  // Total score for each questions
  score: number;

  // Commented text to each question
  teacherComment: string;
}

export interface Submission {
  // Unique identifier for the question
  id: number;

  // Unique identifier for each assessment
  assessmentId: number;

  // Name text that displayed for user
  studentName: string;

  // student id text for each student
  studentId: string;

  // Unique identifier for each assessment
  className: string;

  // Student initial name text that displayed for user
  initials: string;

  // Email address associated with the user account
  email?: string;

  // status badge for each submission
  status: SubmissionStatus;

  // Assessment submission time 
  submittedAt?: string;

  // Total completion time 
  timeTaken?: string;

  // Total score for each questions
  score: number;

  // Total maximum score for each question
  maxScore: number;

  // Answered text from each question that will be displayed for user
  answers: SubmissionAnswer[];
}
