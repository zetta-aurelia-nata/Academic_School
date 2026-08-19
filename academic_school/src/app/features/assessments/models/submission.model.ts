// ****************** TYPES ******************
export type SubmissionStatus =
  | 'Completed'
  | 'Not Submitted'
  | 'In Progress';

// ****************** INTERFACES ******************
export interface SubmissionAnswer {
  question: string;
  answer: string;
  maxScore: number;
  score: number;
  teacherComment: string;
}

export interface Submission {
  id: number;
  assessmentId: number;
  studentName: string;
  studentId: string;
  className: string;
  initials: string;
  email?: string;
  status: SubmissionStatus;
  submittedAt?: string;
  timeTaken?: string;
  score: number;
  maxScore: number;
  answers: SubmissionAnswer[];
}