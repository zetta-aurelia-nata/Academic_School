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

  private readonly statusMeta: Record<AssessmentStatus, { labelKey: string; colorVar: string }> = {
    Completed: {
      labelKey: 'Completed Assessments',
      colorVar: '--color-card-green',
    },
    Pending: {
      labelKey: 'Pending Assessments',
      colorVar: '--color-card-orange',
    },
    Failed: {
      labelKey: 'Failed Assessments',
      colorVar: '--color-card-red',
    },
    Draft: {
      labelKey: 'Draft Assessments',
      colorVar: '--color-card-grey',
    },
    'Not Submitted': {
      labelKey: 'Assessments Not Submitted',
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

  getStats(): AssessmentStat[] {
    const assessments = this.assessments;

    const totalStudents = assessments.reduce(
      (sum, assessment) => sum + (assessment.totalStudents ?? 0),
      0,
    );

    return [
      {
        labelKey: 'All Assessments',
        value: assessments.length,
        description: 'All created assessments',
        icon: 'assignment',
        colorClass: 'progress-icon--purple',
      },
      {
        labelKey: 'Total Students',
        value: totalStudents,
        description: 'Across all assessments',
        icon: 'groups',
        colorClass: 'progress-icon--green',
      },
      {
        labelKey: 'Completed Assessments',
        value: this.countByStatus('Completed'),
        description: 'Assessments completed',
        icon: 'check_circle',
        colorClass: 'progress-icon--blue',
      },
      {
        labelKey: 'Pending Assessments',
        value: this.countByStatus('Pending'),
        description: 'Awaiting your review',
        icon: 'schedule',
        colorClass: 'progress-icon--amber',
      },
      {
        labelKey: 'Failed Assessments',
        value: this.countByStatus('Failed'),
        description: 'Requires attention',
        icon: 'cancel',
        colorClass: 'progress-icon--red',
      },
      {
        labelKey: 'Draft Assessments',
        value: this.countByStatus('Draft'),
        description: 'Waiting to publish',
        icon: 'edit_note',
        colorClass: 'progress-icon--grey',
      },
    ];
  }

  getStatusDistribution(): StatusSlice[] {
    const total = this.assessments.length;

    return (Object.keys(this.statusMeta) as AssessmentStatus[])
      .map((status) => {
        const count = this.countByStatus(status);

        return {
          status,
          labelKey: this.statusMeta[status].labelKey,
          count,
          percentage: total ? Math.round((count / total) * 1000) / 10 : 0,
          colorVar: this.statusMeta[status].colorVar,
        };
      })
      .filter((slice) => slice.count > 0);
  }

  getCalculationSummary(): CalculationMetric[] {
    const total = this.assessments.length;
    const completed = this.countByStatus('Completed');
    const pending = this.countByStatus('Pending');
    const failed = this.countByStatus('Failed');

    const toRate = (value: number): number => (total ? Math.round((value / total) * 100) : 0);

    return [
      {
        labelKey: 'Completed Assessments',
        value: toRate(completed),
        description: `${completed} of ${total} assessments completed`,
        colorVar: '--color-card-green',
      },
      {
        labelKey: 'Pending Assessments',
        value: toRate(pending),
        description: `${pending} of ${total} awaiting review`,
        colorVar: '--color-card-orange',
      },
      {
        labelKey: 'Failed Assessments',
        value: toRate(failed),
        description: `${failed} of ${total} need attention`,
        colorVar: '--color-card-red',
      },
    ];
  }

  private countByStatus(status: AssessmentStatus): number {
    return this.assessments.filter((assessment) => assessment.status === status).length;
  }
}
