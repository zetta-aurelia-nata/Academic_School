//********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

//********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

//********** APPLICATION IMPORTS **********
import { AssessmentService } from '../../services/assessment.service';
import { Assessment, AssessmentStatus } from './assessment.list.model';

@Component({
  selector: 'app-assessment-list',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
  ],
  templateUrl: './assessments-list.html',
  styleUrls: ['./assessments-list.scss'],
})
export class AssessmentList {
  //********** VIEW CHILDREN **********
  @ViewChild('deleteDialog')
  deleteDialog?: ElementRef<HTMLElement>;

  @ViewChild('deleteCancelButton')
  deleteCancelButton?: ElementRef<HTMLButtonElement>;

  //********** SERVICES **********
  private readonly router = inject(Router);
  private readonly assessmentService = inject(AssessmentService);

  //********** PRIVATE VARIABLES **********
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

  assessments: Assessment[] = [];
  filteredAssessments: Assessment[] = [];
  searchQuery = '';
  showDeleteDialog = false;
  selectedAssessment: Assessment | null = null;

  //********** KEYBOARD HANDLERS **********
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.showDeleteDialog) {
      return;
    }

    this.onCancelDelete();
  }

  //********** LIFECYCLE **********
  ngOnInit(): void {
    this.loadAssessments();
  }

  private loadAssessments(): void {
    this.assessments = this.assessmentService.getAssessments();

    this.applySearch();
  }

  // ********** ACTION HANDLERS **********
  onSearch(): void {
    this.applySearch();
  }

  private applySearch(): void {
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

  // ********** ACTION HANDLERS **********

  clearSearch(): void {
    this.searchQuery = '';

    this.filteredAssessments = [...this.assessments];
  }

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

    this.assessmentService.deleteAssessment(this.selectedAssessment.id);
    this.loadAssessments();
    this.showDeleteDialog = false;
    this.selectedAssessment = null;

    setTimeout(() => {
      this.deleteTrigger?.focus();

      this.deleteTrigger = null;
    });
  }

  //********** STATUS CLASS **********
  statusClass(status: AssessmentStatus): string {
    return `status-badge status-badge--${status.toLowerCase()}`;
  }
}
