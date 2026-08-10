import { Routes } from '@angular/router';

import { MainLayout } from './layouts/main-layout/main-layout.component';

import { Dashboard } from './features/dashboard/pages/dashboard';

import { AssessmentsList } from './features/assessments/pages/assessments-list/assessments-list';
import { AssessmentsDetail } from './features/assessments/pages/assessments-detail/assessments-detail';
import { AssessmentsCreate } from './features/assessments/pages/assessments-create/assessments-create';
import { AssessmentsReviewScoring } from './features/assessments/pages/assessments-review-scoring/assessments-review-scoring';
import { AssessmentsResult } from './features/assessments/pages/assessments-result/assessments-result';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,

    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },

      {
        path: 'assessments',
        children: [
          {
            path: '',
            component: AssessmentsList,
          },
          {
            path: 'detail',
            component: AssessmentsDetail,
          },
          {
            path: 'create',
            component: AssessmentsCreate,
          },
          {
            path: 'review-scoring',
            component: AssessmentsReviewScoring,
          },
          {
            path: 'result',
            component: AssessmentsResult,
          },
        ],
      },
    ],
  },
];