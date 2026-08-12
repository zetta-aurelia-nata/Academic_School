//********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

//********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';

//********** APPLICATION MODELS AND SETTINGS IMPORTS **********
import { Assessment, AssessmentStatus } from './assessment.list.model';

@Component({
  selector: 'app-assessment-list',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbar,
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

  assessments: Assessment[] = [
    {
      id: 1,
      title: 'Mathematics Quiz',
      subject: 'Mathematics',
      grade: 'Grade 10',
      totalStudents: 25,
      status: 'Completed',
      date: '2026-05-20',
    },
    {
      id: 2,
      title: 'English Literature Essay',
      subject: 'English Literature',
      grade: 'Grade 11',
      totalStudents: 28,
      status: 'Pending',
      date: '2026-05-19',
    },
    {
      id: 3,
      title: 'Science Chapter 5 Test',
      subject: 'Science',
      grade: 'Grade 9',
      totalStudents: 30,
      status: 'Completed',
      date: '2026-05-18',
    },
    {
      id: 4,
      title: 'History Midterm',
      subject: 'History',
      grade: 'Grade 10',
      totalStudents: 27,
      status: 'Failed',
      date: '2026-05-17',
    },
    {
      id: 5,
      title: 'Biology Chapter 3 Quiz',
      subject: 'Biology',
      grade: 'Grade 10',
      totalStudents: 20,
      status: 'Draft',
      date: '2026-05-25',
    },
  ];

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

  onDelete(assessment: Assessment): void {}

  //********** UTILITY METHODS **********
  statusClass(status: AssessmentStatus): string {
    return `status-badge status-badge--${status.toLowerCase()}`;
  }
}
