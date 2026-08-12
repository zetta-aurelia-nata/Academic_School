//********** Angular imports **********
import { Routes } from '@angular/router';

export const ASSESSMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/assessments-list/assessments-list').then((m) => m.AssessmentList),
  },

  {
    path: 'create',
    loadComponent: () =>
      import('./pages/assessments-create/assessments-create').then((m) => m.AssessmentsCreate),
  },

  {
    path: 'review-scoring',
    loadComponent: () =>
      import('./pages/assessments-review-scoring/assessments-review-scoring').then(
        (m) => m.AssessmentsReviewScoring,
      ),
  },

  {
    path: 'result',
    loadComponent: () =>
      import('./pages/assessments-result/assessments-result').then((m) => m.AssessmentsResult),
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./pages/assessments-detail/assessments-detail').then((m) => m.AssessmentsDetail),
  },
];
