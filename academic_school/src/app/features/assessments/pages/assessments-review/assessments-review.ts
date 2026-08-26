// ********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// ********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// ********** APPLICATION MODELS AND SERVICES **********
import { AssessmentService } from '../../services/assessment.service';
import { Assessment, AssessmentStatus } from '../assessments-list/assessment.list.model';

@Component({
  selector: 'app-assessments-review',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './assessments-review.html',
  styleUrls: ['./assessments-review.scss'],
})
export class AssessmentsReview implements OnInit {
  // ********** PRIVATE SERVICES **********
  private readonly router = inject(Router);
  private readonly assessmentService = inject(AssessmentService);

  // ********** PUBLIC STATE VARIABLES **********
  assessments: Assessment[] = [];
  filteredAssessments: Assessment[] = [];
  searchQuery = '';

  // ********** LIFECYCLE **********
  ngOnInit(): void {
    this.loadAssessments();
  }

  private loadAssessments(): void {
    this.assessments = this.assessmentService.getAssessments();

    this.filteredAssessments = [...this.assessments];
  }

  // ********** ACTION HANDLERS **********
  onSearch(): void {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      this.filteredAssessments = [...this.assessments];

      return;
    }

    this.filteredAssessments = this.assessments.filter((assessment) => {
      const title = assessment.title?.toString().toLowerCase() ?? '';
      const subject = assessment.subject?.toString().toLowerCase() ?? '';
      const grade = assessment.grade?.toString().toLowerCase() ?? '';
      const totalStudents = assessment.totalStudents?.toString().toLowerCase() ?? '';
      const status = assessment.status?.toString().toLowerCase() ?? '';

      return (
        title.includes(query) ||
        subject.includes(query) ||
        grade.includes(query) ||
        totalStudents.includes(query) ||
        status.includes(query)
      );
    });
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filteredAssessments = [...this.assessments];
  }

  // ********** ACTION HANDLERS **********
  onReview(assessment: Assessment): void {
    this.router.navigate(['/assessments', assessment.id, 'submissions']);
  }

  statusClass(status: AssessmentStatus): string {
    return `status-badge status-badge--${status.toLowerCase()}`;
  }
}
