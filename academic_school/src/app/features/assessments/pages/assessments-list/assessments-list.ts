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
import { MatDividerModule } from '@angular/material/divider';

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
    MatDividerModule,
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

  @ViewChild('filterWrapper')
  filterWrapperRef?: ElementRef<HTMLElement>;

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
  selectedStatus: string = 'ALL';
  selectedSubject: string = 'ALL';
  selectedGrade: string = 'ALL';
  dateFrom = '';
  dateTo = '';
  keyword = '';
  assessmentName = '';

  //********** FILTER PANEL STATE **********
  showFilterPanel = false;
  openDropdown: 'subject' | 'status' | 'grade' | null = null;

  //********** FILTER PANEL DRAFT STATE **********
  draftStatus: string = 'ALL';
  draftSubject: string = 'ALL';
  draftGrade: string = 'ALL';
  draftDateFrom = '';
  draftDateTo = '';
  draftKeyword = '';
  draftAssessmentName = '';

  //********** STATUS OPTIONS **********
  readonly statusOptions: AssessmentStatus[] = [
    'COMPLETED' as AssessmentStatus,
    'PENDING' as AssessmentStatus,
    'FAILED' as AssessmentStatus,
    'DRAFT' as AssessmentStatus,
    'PUBLISHED' as AssessmentStatus,
    'ARCHIVED' as AssessmentStatus,
  ];

  //********** KEYBOARD HANDLERS **********
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.showFilterPanel) {
      this.closeFilterPanel();
      return;
    }

    if (!this.showDeleteDialog) {
      return;
    }

    this.onCancelDelete();
  }

  //********** OUTSIDE CLICK HANDLER (CLOSES FILTER PANEL) **********
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.showFilterPanel) {
      return;
    }

    const target = event.target as HTMLElement;

    if (this.filterWrapperRef && !this.filterWrapperRef.nativeElement.contains(target)) {
      this.closeFilterPanel();
    }
  }

  //********** LIFECYCLE **********
  ngOnInit(): void {
    this.loadAssessments();
  }

  //********** LOAD ASSESSMENTS **********
  private loadAssessments(): void {
    this.assessments = this.assessmentService.getAssessments();

    this.applyFilters();
  }

  //********** SEARCH (TOP TOOLBAR SEARCH) **********
  onSearch(): void {
    this.applyFilters();
  }

  //********** CLEAR SEARCH **********
  clearSearch(): void {
    this.searchQuery = '';

    this.applyFilters();
  }

  //********** TOGGLE FILTER PANEL **********
  toggleFilterPanel(): void {
    this.showFilterPanel = !this.showFilterPanel;

    if (this.showFilterPanel) {
      //********** SYNC DRAFT WITH APPLIED VALUES **********
      this.draftStatus = this.selectedStatus;
      this.draftSubject = this.selectedSubject;
      this.draftGrade = this.selectedGrade;

      this.draftDateFrom = this.dateFrom;
      this.draftDateTo = this.dateTo;
      this.draftKeyword = this.keyword;
      this.draftAssessmentName = this.assessmentName;
    } else {
      this.openDropdown = null;
    }
  }

  //********** CLOSE FILTER PANEL **********
  closeFilterPanel(): void {
    this.showFilterPanel = false;

    this.openDropdown = null;
  }

  //********** TOGGLE DROPDOWN (SUBJECT / STATUS) **********
toggleDropdown(name: 'subject' | 'status' | 'grade'): void {
  this.openDropdown = this.openDropdown === name ? null : name;
}
  //********** SELECT DRAFT SUBJECT **********
  selectDraftSubject(subject: string): void {
    this.draftSubject = subject;

    this.openDropdown = null;
  }

  //********** SELECT DRAFT GRADE **********
  selectDraftGrade(grade: string): void {
    this.draftGrade = grade;

    this.openDropdown = null;
  }

  //********** RESET GRADE DRAFT **********
  resetGradeDraft(): void {
    this.draftGrade = 'ALL';
  }

  //********** RESET ASSESSMENT NAME DRAFT **********
  resetAssessmentNameDraft(): void {
    this.draftAssessmentName = '';
  }

  //********** SELECT DRAFT STATUS **********
  selectDraftStatus(status: string): void {
    this.draftStatus = status;

    this.openDropdown = null;
  }

  //********** RESET INDIVIDUAL SECTIONS (DRAFT ONLY) **********
  resetDateRangeDraft(): void {
    this.draftDateFrom = '';
    this.draftDateTo = '';
  }

  resetSubjectDraft(): void {
    this.draftSubject = 'ALL';
  }

  resetStatusDraft(): void {
    this.draftStatus = 'ALL';
  }

  resetKeywordDraft(): void {
    this.draftKeyword = '';
  }

  //********** RESET ALL (DRAFT + APPLIED, IMMEDIATE) **********
  resetAllDraft(): void {
    //********** RESET DRAFT **********
    this.draftStatus = 'ALL';
    this.draftSubject = 'ALL';
    this.draftGrade = 'ALL';

    this.draftDateFrom = '';
    this.draftDateTo = '';
    this.draftKeyword = '';
    this.draftAssessmentName = '';

    //********** RESET APPLIED **********
    this.selectedStatus = 'ALL';
    this.selectedSubject = 'ALL';
    this.selectedGrade = 'ALL';

    this.dateFrom = '';
    this.dateTo = '';
    this.keyword = '';
    this.assessmentName = '';

    this.applyFilters();
  }

  //********** APPLY FILTER PANEL (COMMIT DRAFT -> APPLIED) **********
  applyFilterPanel(): void {
    this.selectedStatus = this.draftStatus;
    this.selectedSubject = this.draftSubject;
    this.selectedGrade = this.draftGrade;

    this.dateFrom = this.draftDateFrom;
    this.dateTo = this.draftDateTo;
    this.keyword = this.draftKeyword;
    this.assessmentName = this.draftAssessmentName;

    this.applyFilters();

    this.closeFilterPanel();
  }

  //********** APPLY SEARCH + FILTERS **********
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

  //********** SUBJECT OPTIONS **********
  get subjectOptions(): string[] {
    const subjects = this.assessments
      .map((assessment) => assessment.subject)
      .filter((subject): subject is string => !!subject);

    return Array.from(new Set(subjects)).sort();
  }

  //********** GRADE OPTIONS **********
  get gradeOptions(): string[] {
    const grades = this.assessments
      .map((assessment) => assessment.grade)
      .filter((grade): grade is string => !!grade);

    return Array.from(new Set(grades)).sort();
  }

  //********** ACTIVE FILTERS **********
  get hasActiveFilters(): boolean {
    return (
      this.searchQuery.trim().length > 0 ||
      this.assessmentName.trim().length > 0 ||
      this.selectedStatus !== 'ALL' ||
      this.selectedSubject !== 'ALL' ||
      this.selectedGrade !== 'ALL' ||
      !!this.dateFrom ||
      !!this.dateTo ||
      this.keyword.trim().length > 0
    );
  }

  //********** ACTIVE FILTER COUNT **********
  get activeFilterCount(): number {
    let count = 0;

    if (this.assessmentName.trim().length > 0) {
      count++;
    }

    if (this.selectedStatus !== 'ALL') {
      count++;
    }

    if (this.selectedSubject !== 'ALL') {
      count++;
    }

    if (this.selectedGrade !== 'ALL') {
      count++;
    }

    if (this.dateFrom || this.dateTo) {
      count++;
    }

    if (this.keyword.trim().length > 0) {
      count++;
    }

    return count;
  }

  //********** CREATE ASSESSMENT **********
  onCreateAssessment(): void {
    this.router.navigate(['/assessments/create']);
  }

  //********** VIEW ASSESSMENT **********
  onView(assessment: Assessment): void {
    this.router.navigate(['/assessments', assessment.id]);
  }

  //********** EDIT ASSESSMENT **********
  onEdit(assessment: Assessment): void {
    this.router.navigate(['/assessments/edit', assessment.id]);
  }

  //********** REVIEW ASSESSMENT **********
  onReviewAssessment(assessment: Assessment): void {
    this.router.navigate(['/assessments', assessment.id, 'submissions']);
  }

  //********** DELETE ASSESSMENT **********
  onDelete(assessment: Assessment, event?: Event): void {
    this.selectedAssessment = assessment;

    this.deleteTrigger = event?.currentTarget as HTMLElement | null;

    this.showDeleteDialog = true;

    setTimeout(() => {
      this.deleteDialog?.nativeElement.focus();
    });
  }

  //********** CANCEL DELETE **********
  onCancelDelete(): void {
    this.showDeleteDialog = false;

    this.selectedAssessment = null;

    setTimeout(() => {
      this.deleteTrigger?.focus();

      this.deleteTrigger = null;
    });
  }

  //********** CONFIRM DELETE **********
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

  //********** FILTER STATUS DOT CLASS **********
  statusDotClass(status: string): string {
    return `toolbar-filter__status-dot toolbar-filter__status-dot--${status
      .toString()
      .toLowerCase()}`;
  }
}
