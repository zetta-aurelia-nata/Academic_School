//********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

//********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

//********** SWEETALERT IMPORT **********
import Swal from 'sweetalert2';

//********** THIRD-PARTY IMPORTS **********
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

//********** APPLICATION IMPORTS **********
import { AssessmentService } from '../../services/assessment.service';
import { Assessment, AssessmentStatus } from './assessment.list.model';

//********** SHARED COMPONENT IMPORTS **********
import {
  FilterComponent,
  FilterValue,
} from '../../../../shared/components/filter-component/filter-component';

@Component({
  selector: 'app-assessment-list',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatTooltipModule,
    FilterComponent,
    TranslocoDirective,
  ],

  templateUrl: './assessments-list.html',
  styleUrls: ['./assessments-list.scss'],
})
export class AssessmentList {
  //********** SERVICES **********
  private readonly router = inject(Router);
  private readonly assessmentService = inject(AssessmentService);
  private readonly transloco = inject(TranslocoService);

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

  //********** APPLIED FILTERS **********
  selectedStatus = 'ALL';
  selectedSubject = 'ALL';
  selectedGrade = 'ALL';
  dateFrom = '';
  dateTo = '';
  keyword = '';
  assessmentName = '';

  readonly statusOptions: AssessmentStatus[] = ['Completed', 'Pending', 'Failed', 'Draft'];

  //********** LIFECYCLE **********
  ngOnInit(): void {
    this.loadAssessments();
  }

  //********** LOAD ASSESSMENTS **********
  private loadAssessments(): void {
    this.assessments = this.assessmentService.getAssessments();

    this.applyFilters();
  }

  //********** ACTION HANDLERS **********
  onSearch(): void {
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchQuery = '';

    this.applyFilters();
  }

  onFilterApplied(filters: FilterValue): void {
    this.selectedStatus = filters.status;
    this.selectedSubject = filters.subject;
    this.selectedGrade = filters.grade;

    this.dateFrom = filters.dateFrom;
    this.dateTo = filters.dateTo;
    this.assessmentName = filters.assessmentName;

    this.applyFilters();
  }

  private applyFilters(): void {
    const topQuery = this.searchQuery.trim().toLowerCase();
    const keywordQuery = this.keyword.trim().toLowerCase();
    const nameQuery = this.assessmentName.trim().toLowerCase();
    const targetStatus = this.selectedStatus.toString().trim().toLowerCase();
    const targetSubject = this.selectedSubject.toString().trim().toLowerCase();
    const targetGrade = this.selectedGrade.toString().trim().toLowerCase();
    const fromDate = this.dateFrom ? new Date(this.dateFrom) : null;
    const toDate = this.dateTo ? new Date(this.dateTo) : null;

    const matchesQuery = (assessment: Assessment, query: string): boolean =>
      !query ||
      [
        assessment.title,
        assessment.subject,
        assessment.grade,
        assessment.totalStudents,
        assessment.status,
      ].some((field) => field?.toString().toLowerCase().includes(query));

    this.filteredAssessments = this.assessments.filter((assessment) => {
      const matchesSearch =
        matchesQuery(assessment, topQuery) && matchesQuery(assessment, keywordQuery);
      const assessmentTitle = assessment.title?.toString().trim().toLowerCase() ?? '';
      const matchesName = !nameQuery || assessmentTitle.includes(nameQuery);
      const assessmentStatus = assessment.status?.toString().trim().toLowerCase();
      const matchesStatus = targetStatus === 'all' || assessmentStatus === targetStatus;
      const assessmentSubject = assessment.subject?.toString().trim().toLowerCase();
      const matchesSubject = targetSubject === 'all' || assessmentSubject === targetSubject;
      const assessmentGrade = assessment.grade?.toString().trim().toLowerCase();
      const matchesGrade = targetGrade === 'all' || assessmentGrade === targetGrade;
      const assessmentDate = new Date(assessment.date);
      const matchesFrom = !fromDate || assessmentDate >= fromDate;
      const matchesTo = !toDate || assessmentDate <= toDate;

      return (
        matchesSearch &&
        matchesName &&
        matchesStatus &&
        matchesSubject &&
        matchesGrade &&
        matchesFrom &&
        matchesTo
      );
    });
  }

  //********** SETTER & GETTER **********
  get subjectOptions(): string[] {
    const subjects = this.assessments
      .map((assessment) => assessment.subject)
      .filter((subject): subject is string => !!subject);

    return Array.from(new Set(subjects)).sort();
  }

  get gradeOptions(): string[] {
    const grades = this.assessments
      .map((assessment) => assessment.grade)
      .filter((grade): grade is string => !!grade);

    return Array.from(new Set(grades)).sort();
  }

  //********** STATUS TRANSLATION **********
  getStatusTranslationKey(status: AssessmentStatus): string {
    const statusKeys: Record<AssessmentStatus, string> = {
      Completed: 'assessment.list.status.completed',
      Pending: 'assessment.list.status.pending',
      Failed: 'assessment.list.status.failed',
      Draft: 'assessment.list.status.draft',
      'Not Submitted': 'assessment.list.status.notSubmitted',
    };

    return statusKeys[status];
  }

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

  onDelete(assessment: Assessment): void {
    Swal.fire({
      title: this.transloco.translate('assessment.list.delete.confirmTitle'),
      html: this.transloco.translate('assessment.list.delete.confirmText', {
        title: assessment.title,
      }),
      icon: 'warning',
      iconColor:'var(--color-card-red',
      showCancelButton: true,
      confirmButtonText: this.transloco.translate('assessment.list.delete.confirmButton'),
      cancelButtonText: this.transloco.translate('assessment.list.delete.cancelButton'),
      confirmButtonColor: 'var(--color-card-red)',
      reverseButtons: true,
      focusCancel: true,
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.assessmentService.deleteAssessment(assessment.id);

        this.loadAssessments();

        Swal.fire({
          title: this.transloco.translate('assessment.list.delete.successTitle'),
          text: this.transloco.translate('assessment.list.delete.successText'),
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }

  statusClass(status: AssessmentStatus): string {
    return `status-badge status-badge--${status.toString().toLowerCase()}`;
  }
}
