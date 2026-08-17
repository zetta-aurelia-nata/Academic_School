//********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

//********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
//********** APPLICATION MODELS AND SETTINGS IMPORTS **********
import { Assessment, AssessmentStatus } from './assessment.list.model';
import { ASSESSMENTS } from '../../assessment.data';

@Component({
  selector: 'app-assessment-list',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './assessments-list.html',
  styleUrls: ['./assessments-list.scss'],
})
export class AssessmentList {
  private readonly router = inject(Router);

  //********** PUBLIC STATE VARIABLES **********
  displayedColumns: string[] = [
    'title',
    'subject',
    'grade',
    'totalStudents',
    'status',
    'date',
    'actions',
  ];

assessments: Assessment[] = ASSESSMENTS;

  //********** ACTION HANDLERS **********
  onCreateAssessment(): void {
    this.router.navigate(['/assessments/create']);
  }

  onView(assessment: Assessment): void {
    this.router.navigate(['/assessments', assessment.id]);
  }

  onEdit(assessment: Assessment): void {
    this.router.navigate(['/assessments', assessment.id]);
  }

    onReviewAssessment(assessment: Assessment): void {
    this.router.navigate([
      '/assessments',
      assessment.id,
      'submissions',
    ]);
  }

  onDelete(assessment: Assessment): void {}

  //********** UTILITY METHODS **********
  statusClass(status: AssessmentStatus): string {
    return `status-badge status-badge--${status.toLowerCase()}`;
  }
}
