//********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

//********** ANGULAR MATERIAL IMPORTS **********
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface AssessmentStat {
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
  stats: AssessmentStat[] = [
    {
      label: 'Total Assessments',
      value: 24,
      icon: 'assignment',
      colorClass: 'progress-icon--purple',
    },
    {
      label: 'Assessment Done',
      value: 7,
      icon: 'check_circle',
      colorClass: 'progress-icon--green',
    },
    {
      label: 'Active Assessments',
      value: 8,
      icon: 'play_circle',
      colorClass: 'progress-icon--blue',
    },
    {
      label: 'Pending Reviews',
      value: 6,
      icon: 'hourglass_empty',
      colorClass: 'progress-icon--amber',
    },
    {
      label: 'Draft Assessments',
      value: 3,
      icon: 'edit_note',
      colorClass: 'progress-icon--gray',
    },
  ];
}
