export type AssessmentStatus = 'Completed' | 'Pending' | 'Failed' | 'Draft';

export interface Assessment {
  id: number;
  title: string;
  subject: string;
  grade: string;
  totalStudents: number;
  status: AssessmentStatus;
  date: string;
}