// ********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

// ********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// ********** APPLICATION MODELS AND SETTINGS IMPORTS **********
import { ASSESSMENTS } from '../../assessment.data';
import { Assessment, AssessmentStatus } from '../assessments-list/assessment.list.model';

@Component({
  selector: 'app-review-scoring',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './assessments-review-scoring.html',
  styleUrls: ['./assessments-review-scoring.scss'],
})
export class AssessmentsReviewScoring {
  // ********** PRIVATE VARIABLES **********
  private readonly router = inject(Router);

  // ********** PUBLIC STATE VARIABLES **********
  assessments: Assessment[] = ASSESSMENTS;

  // ********** ACTION HANDLERS **********
  onReview(assessment: Assessment): void {
    this.router.navigate(['/assessments', assessment.id, 'submissions']);
  }

  // ********** UTILITY METHODS **********
  statusClass(status: AssessmentStatus): string {
    return `status-badge status-badge--${status.toLowerCase()}`;
  }
}
