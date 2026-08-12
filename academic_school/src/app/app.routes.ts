//********** ANGULAR IMPORTS **********
import { Routes } from '@angular/router';

import { MainLayout } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'assessments',
        loadChildren: () =>
          import('./features/assessments/assessment.routes').then((m) => m.ASSESSMENT_ROUTES),
      },
    ],
  },
];
