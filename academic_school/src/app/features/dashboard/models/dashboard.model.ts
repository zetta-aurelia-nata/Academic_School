//********** SHARED TYPES **********
import { AssessmentStatus } from '../../assessments/pages/assessments-list/assessment.list.model';

export type { AssessmentStatus };
// *************** ASSESSMENT STAT ***************
export interface AssessmentStat {
  labelKey: string;
  value: number;
  description: string;
  icon: string;
  colorClass: string;
}

// *************** STATUS SLICE (for status distribution chart) ***************
export interface StatusSlice {
  status: AssessmentStatus;
  labelKey: string;
  count: number;
  percentage: number;
  colorVar: string;
}

// *************** CALCULATION METRIC (for calculated rate bars) ***************
export interface CalculationMetric {
  labelKey: string;
  value: number;
  description: string;
  colorVar: string;
}
