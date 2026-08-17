export type ReviewStatus =
  | 'Completed'
  | 'Not Submitted'
  | 'In Progress';

export interface StudentReview {
  id: number;
  studentName: string;
  studentId: string;
  className: string;
  email: string;
  initials: string;
  status: ReviewStatus;
  submittedAt?: string;
  timeTaken?: string;
  score?: number;
}