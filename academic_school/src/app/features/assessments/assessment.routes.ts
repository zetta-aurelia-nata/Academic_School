//********** Angular imports **********
import { Routes } from '@angular/router';

export const ASSESSMENT_ROUTES: Routes = [
  // ********** ASSESSMENTS LIST **********
  {
    path: '',
    loadComponent: () =>
      import('./pages/assessments-list/assessments-list').then((m) => m.AssessmentList),
  },

  // ********** CREATE ASSESSMENT **********
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/assessments-create/assessments-create').then((m) => m.AssessmentsCreate),
  },

  // ********** EDIT ASSESSMENT **********
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/assessments-edit/assessments-edit').then((m) => m.EditAssessment),
  },

  // ********** REVIEW SUBMISSIONS (read-only browsing) **********
  {
    path: 'review',
    loadComponent: () =>
      import('./pages/assessments-review/assessments-review').then((m) => m.AssessmentsReview),
  },

  // ********** REVIEW RESULT **********
  {
    path: 'result',
    loadComponent: () =>
      import('./pages/assessments-result/assessments-result').then((m) => m.AssessmentsResult),
  },

  // ********** STUDENT SUBMISSIONS **********
  {
    path: ':id/submissions',
    loadComponent: () =>
      import('./pages/assessments-detail/assessments-detail').then((m) => m.AssessmentsDetail),
  },

  // ********** STUDENT SUBMISSION DETAIL **********
  {
    path: ':id/submissions/:studentId',
    loadComponent: () =>
      import('./pages/assessments-detail/assessments-detail').then((m) => m.AssessmentsDetail),
  },

  // ********** ASSESSMENT DETAIL **********
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/assessments-detail/assessments-detail').then((m) => m.AssessmentsDetail),
  },
];
