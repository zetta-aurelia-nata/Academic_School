//********** TYPES **********
export type AssessmentStatus = 'active' | 'completed' | 'pending_review' | 'failed' | 'draft';

// *************** ASSESSMENT ***************
export interface Assessment {
  id: string;
  title: string;
  status: AssessmentStatus;
  studentCount: number;
  createdDate: Date;
}

// *************** ASSESSMENT STAT ***************
export interface AssessmentStat {
  label: string;
  value: number;
  description: string;
  icon: string;
  colorClass: string;
}