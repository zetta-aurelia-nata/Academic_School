//********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

//********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

//********** APPLICATION COMPONENTS IMPORTS **********
import { DeleteAssessmentDialog } from './delete-assessment-dialog/delete-assessment-dialog';

//********** APPLICATION MODELS AND SETTINGS IMPORTS **********
import { ASSESSMENTS } from '../../assessment.data';
import { Assessment, AssessmentStatus } from './assessment.list.model';

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
  //********** PRIVATE VARIABLES **********
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

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

  onEdit(assessment: Assessment): void {
    this.router.navigate(['/assessments/edit', assessment.id]);
  }

  onReviewAssessment(assessment: Assessment): void {
    this.router.navigate(['/assessments', assessment.id, 'submissions']);
  }

  onDelete(assessment: Assessment): void {
    const dialogRef = this.dialog.open(DeleteAssessmentDialog, {
      width: '420px',
      maxWidth: 'calc(100vw - 32px)',
      data: assessment,
      autoFocus: 'first-tabbable',
      restoreFocus: true,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) {
        return;
      }

      this.assessments = this.assessments.filter((item) => item.id !== assessment.id);
    });
  }

  //********** UTILITY METHODS **********
  statusClass(status: AssessmentStatus): string {
    return `status-badge status-badge--${status.toLowerCase()}`;
  }
}
