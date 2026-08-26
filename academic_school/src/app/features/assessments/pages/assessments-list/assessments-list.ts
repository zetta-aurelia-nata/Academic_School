//********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
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
    FilterComponent,
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

  //********** APPLIED FILTERS **********
  selectedStatus = 'ALL';
  selectedSubject = 'ALL';
  selectedGrade = 'ALL';
  dateFrom = '';
  dateTo = '';
  keyword = '';
  assessmentName = '';

  readonly statusOptions: AssessmentStatus[] = [
    'Completed',
    'Not Submitted',
    'Pending',
    'Failed',
    'Draft',
  ];

  //********** LIFECYCLE **********
  ngOnInit(): void {
    this.loadAssessments();
  }

  //********** LOAD ASSESSMENTS **********
  private loadAssessments(): void {
    this.assessments = this.assessmentService.getAssessments();

    this.applyFilters();
  }

  //********** SEARCH HANDLERS **********
  onSearch(): void {
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchQuery = '';

    this.applyFilters();
  }

  //********** FILTER HANDLER **********
  onFilterApplied(filters: FilterValue): void {
    //********** UPDATE APPLIED FILTERS **********
    this.selectedStatus = filters.status;
    this.selectedSubject = filters.subject;
    this.selectedGrade = filters.grade;

    this.dateFrom = filters.dateFrom;
    this.dateTo = filters.dateTo;
    this.keyword = filters.keyword;
    this.assessmentName = filters.assessmentName;

    this.applyFilters();
  }

  //********** APPLY FILTERS **********
  private applyFilters(): void {
    const topQuery = this.searchQuery.trim().toLowerCase();
    const keywordQuery = this.keyword.trim().toLowerCase();
    const nameQuery = this.assessmentName.trim().toLowerCase();

    const targetStatus = this.selectedStatus.toString().trim().toLowerCase();
    const targetSubject = this.selectedSubject.toString().trim().toLowerCase();
    const targetGrade = this.selectedGrade.toString().trim().toLowerCase();

    const fromDate = this.dateFrom ? new Date(this.dateFrom) : null;

    const toDate = this.dateTo ? new Date(this.dateTo) : null;

    //********** SEARCH MATCHER **********
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
      //********** SEARCH (TOP BAR + KEYWORD SECTION) **********
      const matchesSearch =
        matchesQuery(assessment, topQuery) && matchesQuery(assessment, keywordQuery);

      //********** ASSESSMENT NAME **********
      const assessmentTitle = assessment.title?.toString().trim().toLowerCase() ?? '';

      const matchesName = !nameQuery || assessmentTitle.includes(nameQuery);

      //********** STATUS **********
      const assessmentStatus = assessment.status?.toString().trim().toLowerCase();

      const matchesStatus = targetStatus === 'all' || assessmentStatus === targetStatus;

      //********** SUBJECT **********
      const assessmentSubject = assessment.subject?.toString().trim().toLowerCase();

      const matchesSubject = targetSubject === 'all' || assessmentSubject === targetSubject;

      //********** GRADE **********
      const assessmentGrade = assessment.grade?.toString().trim().toLowerCase();

      const matchesGrade = targetGrade === 'all' || assessmentGrade === targetGrade;

      //********** DATE RANGE **********
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

  //********** DELETE HANDLERS **********
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
    return `status-badge status-badge--${status.toString().toLowerCase()}`;
  }
}
