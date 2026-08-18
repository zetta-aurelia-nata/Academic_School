//********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, inject, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

//********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

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
  @ViewChild('deleteDialog') deleteDialog?: ElementRef<HTMLElement>;
  @ViewChild('deleteCancelButton') deleteCancelButton?: ElementRef<HTMLButtonElement>;
  
  //********** KEYBOARD HANDLERS **********
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.showDeleteDialog) {
      return;
    }

    this.onCancelDelete();
  }

  //********** PRIVATE VARIABLES **********
  private readonly router = inject(Router);
  private deleteTrigger: HTMLElement | null = null;

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

  showDeleteDialog = false;
  selectedAssessment: Assessment | null = null;

  //********** ACTION HANDLERS **********
  onCreateAssessment(): void {
    this.router.navigate(['/assessments/create']);
  }

  onView(assessment: Assessment): void {
    this.router.navigate(['/assessments', assessment.id]);
  }

  onEdit(assessment: Assessment): void {
    this.router.navigate(['/assessments/edit', assessment.id]);
  }

  onReviewAssessment(assessment: Assessment): void {
    this.router.navigate(['/assessments', assessment.id, 'submissions']);
  }

  onDelete(assessment: Assessment, event?: Event): void {
    this.selectedAssessment = assessment;
    this.deleteTrigger = event?.currentTarget as HTMLElement | null;
    this.showDeleteDialog = true;

    setTimeout(() => {
      this.deleteDialog?.nativeElement.focus();
    });
  }

  onCancelDelete(): void {
    this.showDeleteDialog = false;
    this.selectedAssessment = null;

    setTimeout(() => {
      this.deleteTrigger?.focus();
      this.deleteTrigger = null;
    });
  }

  onConfirmDelete(): void {
    if (!this.selectedAssessment) {
      return;
    }

    this.assessments = this.assessments.filter((item) => item.id !== this.selectedAssessment?.id);

    this.showDeleteDialog = false;
    this.selectedAssessment = null;

    setTimeout(() => {
      this.deleteTrigger?.focus();
      this.deleteTrigger = null;
    });
  }

  //********** UTILITY METHODS **********
  statusClass(status: AssessmentStatus): string {
    return `status-badge status-badge--${status.toLowerCase()}`;
  }
}
