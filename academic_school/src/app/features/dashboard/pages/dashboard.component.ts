//********** Angular Imports **********
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  stats: AssessmentStat[] = [
    {
      label: 'Total Assessments',
      value: 24,
      icon: 'assignment',
      colorClass: 'progress-icon--purple',
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
    { label: 'Done', value: 7, icon: 'check_circle', colorClass: 'progress-icon--green' },
    { label: 'Draft Assessments', value: 3, icon: 'edit_note', colorClass: 'progress-icon--gray' },
  ];
}
