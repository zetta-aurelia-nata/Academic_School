//********** ANGULAR ROUTING IMPORT **********
// Import Routes to define application navigation routes.
import { Routes } from '@angular/router';

//********** LAYOUT AND PAGE COMPONENT IMPORTS **********
// Import the main layout and page components used by the application.
import { MainLayout } from './layouts/main-layout/main-layout.component';
import { Dashboard } from './features/dashboard/pages/dashboard';
import { AssessmentsList } from './features/assessments/pages/assessments-list/assessments-list';
import { AssessmentsDetail } from './features/assessments/pages/assessments-detail/assessments-detail';
import { AssessmentsCreate } from './features/assessments/pages/assessments-create/assessments-create';
import { AssessmentsReviewScoring } from './features/assessments/pages/assessments-review-scoring/assessments-review-scoring';
import { AssessmentsResult } from './features/assessments/pages/assessments-result/assessments-result';

//********** APPLICATION ROUTES **********
// Defines the navigation structure and page components for the application.
export const routes: Routes = [
  //********** MAIN LAYOUT ROUTE **********
  // Uses MainLayout as the shared layout for application pages.
  {
    path: '',
    component: MainLayout,

    children: [
      //********** DASHBOARD ROUTE **********
      // Displays the Dashboard page.
      {
        path: 'dashboard',
        component: Dashboard,
      },

      //********** ASSESSMENTS ROUTES **********
      /**
       * Groups all Assessment-related pages under the /assessments path.
       * Displays the Assessment List page.
       * Displays the Assessment Detail page.
       * Displays the Assessment Create page.
       * Displays the Assessment Review Scoring page.
       * Displays the Assessment Result page.
       */
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
