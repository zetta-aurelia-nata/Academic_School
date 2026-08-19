// ****************** TYPES ******************
// List of allowed assessment statuses
export type AssessmentStatus = 'Completed' | 'Pending' | 'Failed' | 'Draft';

// ****************** INTERFACES ******************
export interface Assessment {
  // Unique identifier for the assessment
  id: number;

  // Title or name of the assessment
  title: string;

  // Subject or topic covered by the assessment
  subject: string;

  // Grade level or class target for the assessment
  grade: string;

  // Total number of students assigned to the assessment
  totalStudents: number;

  // Current status of the assessment
  status: AssessmentStatus;

  // Date when the assessment is scheduled or created
  date: string;
}