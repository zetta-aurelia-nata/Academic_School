//********** ANGULAR IMPORTS **********
import { Injectable, inject } from '@angular/core';

//********** APPLICATION MODELS AND SETTINGS IMPORT **********
import { AssessmentService } from '../../assessments/services/assessment.service';
import { Assessment } from '../../assessments/pages/assessments-list/assessment.list.model';
import {
  AssessmentStat,
  AssessmentStatus,
  CalculationMetric,
  StatusSlice,
} from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  //********** PRIVATE VARIABLES **********
  private readonly assessmentService = inject(AssessmentService);

  private readonly statusMeta: Record<
    AssessmentStatus,
    { labelKey: string; colorVar: string }
  > = {
    Completed: {
      labelKey: 'status.completed',
      colorVar: '--color-card-green',
    },
    Pending: {
      labelKey: 'status.pending',
      colorVar: '--color-card-orange',
    },
    Failed: {
      labelKey: 'status.failed',
      colorVar: '--color-card-red',
    },
    Draft: {
      labelKey: 'status.draft',
      colorVar: '--color-card-grey',
    },
    'Not Submitted': {
      labelKey: 'status.notSubmitted',
      colorVar: '--color-card-blue',
    },
  };

  //********** GETTER & SETTER **********
  private get assessments(): Assessment[] {
    return this.assessmentService.getAssessments();
  }

  getAssessments(): Assessment[] {
    return this.assessments;
  }

  //********** GET STATS **********
  getStats(): AssessmentStat[] {
    const assessments = this.assessments;

    return [
      {
        labelKey: 'stats.totalAssessments',
        value: assessments.length,
        descriptionKey: 'stats.totalAssessmentsDescription',
        icon: 'assignment',
        colorClass: 'progress-icon--purple',
      },
      {
        labelKey: 'stats.completed',
        value: this.countByStatus('Completed'),
        descriptionKey: 'stats.completedDescription',
        icon: 'check_circle',
        colorClass: 'progress-icon--blue',
      },
      {
        labelKey: 'stats.pending',
        value: this.countByStatus('Pending'),
        descriptionKey: 'stats.pendingDescription',
        icon: 'schedule',
        colorClass: 'progress-icon--amber',
      },
      {
        labelKey: 'stats.failed',
        value: this.countByStatus('Failed'),
        descriptionKey: 'stats.failedDescription',
        icon: 'cancel',
        colorClass: 'progress-icon--red',
      },
      {
        labelKey: 'stats.draft',
        value: this.countByStatus('Draft'),
        descriptionKey: 'stats.draftDescription',
        icon: 'edit_note',
        colorClass: 'progress-icon--grey',
      },
    ];
  }

  //********** GET STATUS DISTRIBUTION **********
  getStatusDistribution(): StatusSlice[] {
    const total = this.assessments.length;

    return (Object.keys(this.statusMeta) as AssessmentStatus[])
      .map((status) => {
        const count = this.countByStatus(status);

        return {
          status,
          labelKey: this.statusMeta[status].labelKey,
          count,
          percentage: total
            ? Math.round((count / total) * 1000) / 10
            : 0,
          colorVar: this.statusMeta[status].colorVar,
        };
      })
      .filter((slice) => slice.count > 0);
  }

  //********** GET CALCULATION SUMMARY **********
  getCalculationSummary(): CalculationMetric[] {
    const total = this.assessments.length;
    const completed = this.countByStatus('Completed');
    const pending = this.countByStatus('Pending');
    const failed = this.countByStatus('Failed');

    const toRate = (value: number): number =>
      total ? Math.round((value / total) * 100) : 0;

    return [
      {
        labelKey: 'calculation.completed',
        value: toRate(completed),
        descriptionKey: 'calculation.completedDescription',
        colorVar: '--color-card-green',
      },
      {
        labelKey: 'calculation.pending',
        value: toRate(pending),
        descriptionKey: 'calculation.pendingDescription',
        colorVar: '--color-card-orange',
      },
      {
        labelKey: 'calculation.failed',
        value: toRate(failed),
        descriptionKey: 'calculation.failedDescription',
        colorVar: '--color-card-red',
      },
    ];
  }

  //********** PRIVATE METHODS **********
  private countByStatus(status: AssessmentStatus): number {
    return this.assessments.filter(
      (assessment) => assessment.status === status,
    ).length;
  }
}