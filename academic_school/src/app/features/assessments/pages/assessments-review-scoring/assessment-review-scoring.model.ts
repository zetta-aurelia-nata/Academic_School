// ****************** TYPES ******************
// List of allowed assessment review statuses
export type ReviewStatus = 'Completed' | 'Not Submitted' | 'In Progress';

// ****************** INTERFACES ******************
export interface StudentReview {
  // Unique identifier for the review record
  id: number;

  // Full name of the student
  studentName: string;

  // Student identification code/number
  studentId: string;

  // Name of the class the student belongs to
  className: string;

  // Email address associated with the student account
  email: string;

  // Initials representing the student's name
  initials: string;

  // Current status of the assessment review
  status: ReviewStatus;

  // Timestamp when the assessment was submitted (e.g., '2026-08-18 14:30')
  submittedAt?: string;

  // Total duration taken to complete the assessment (e.g., '00:45:12')
  timeTaken?: string;

  // Final score obtained in the assessment
  score?: number;
}