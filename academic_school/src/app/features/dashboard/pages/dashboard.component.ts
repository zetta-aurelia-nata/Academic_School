//********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

//********** ANGULAR MATERIAL IMPORTS **********
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface AssessmentStat {
description: any;
  label: string;
  value: number;
  icon: string;
  colorClass: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  //********** PUBLIC STATE VARIABLES **********
stats = [
  {
    label: 'Total Assessments',
    value: 12,
    description: 'All created assessments',
    icon: 'assignment',
    colorClass: 'progress-icon--purple',
  },
  {
    label: 'Total Students',
    value: 150,
    description: 'Across all assessments',
    icon: 'groups',
    colorClass: 'progress-icon--green',
  },
  {
    label: 'Completed',
    value: 5,
    description: 'Assessments completed',
    icon: 'check_circle',
    colorClass: 'progress-icon--blue',
  },
  {
    label: 'Pending Review',
    value: 4,
    description: 'Awaiting your review',
    icon: 'schedule',
    colorClass: 'progress-icon--amber',
  },
  {
    label: 'Failed / Needs Work',
    value: 3,
    description: 'Requires attention',
    icon: 'cancel',
    colorClass: 'progress-icon--red',
  },
];
}
