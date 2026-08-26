//********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

//********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

//********** FILTER MODEL **********
export interface FilterValue {
  status: string;
  subject: string;
  grade: string;
  dateFrom: string;
  dateTo: string;
  keyword: string;
  assessmentName: string;
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './filter-component.html',
  styleUrls: ['./filter-component.scss'],
})
export class FilterComponent {
  //********** VIEW CHILDREN **********
  @ViewChild('filterWrapper')
  filterWrapperRef?: ElementRef<HTMLElement>;

  //********** INPUTS **********
  @Input() statusOptions: string[] = [];
  @Input() subjectOptions: string[] = [];
  @Input() gradeOptions: string[] = [];

  //********** OUTPUTS **********
  @Output() filterApplied = new EventEmitter<FilterValue>();

  //********** PUBLIC STATE VARIABLES **********
  showFilterPanel = false;

  openDropdown: 'subject' | 'status' | 'grade' | null = null;

  //********** APPLIED FILTERS **********
  selectedStatus = 'ALL';
  selectedSubject = 'ALL';
  selectedGrade = 'ALL';
  dateFrom = '';
  dateTo = '';
  assessmentName = '';

  //********** DRAFT FILTERS **********
  draftStatus = 'ALL';
  draftSubject = 'ALL';
  draftGrade = 'ALL';
  draftDateFrom = '';
  draftDateTo = '';
  draftAssessmentName = '';

  //********** KEYBOARD HANDLERS **********
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.showFilterPanel) {
      return;
    }

    this.closeFilterPanel();
  }

  //********** OUTSIDE CLICK HANDLER (CLOSES FILTER PANEL) **********
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.showFilterPanel) {
      return;
    }

    const target = event.target as HTMLElement;

    if (
      this.filterWrapperRef &&
      !this.filterWrapperRef.nativeElement.contains(target)
    ) {
      this.closeFilterPanel();
    }
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

  //********** TOGGLE DROPDOWN **********
  toggleDropdown(name: 'subject' | 'status' | 'grade'): void {
    this.openDropdown = this.openDropdown === name ? null : name;
  }

  //********** SELECT SUBJECT **********
  selectDraftSubject(subject: string): void {
    this.draftSubject = subject;

    this.openDropdown = null;
  }

  //********** SELECT GRADE **********
  selectDraftGrade(grade: string): void {
    this.draftGrade = grade;

    this.openDropdown = null;
  }

  //********** SELECT STATUS **********
  selectDraftStatus(status: string): void {
    this.draftStatus = status;

    this.openDropdown = null;
  }

  //********** RESET GRADE **********
  resetGradeDraft(): void {
    this.draftGrade = 'ALL';
  }

  //********** RESET ASSESSMENT NAME **********
  resetAssessmentNameDraft(): void {
    this.draftAssessmentName = '';
  }

  //********** RESET DATE RANGE **********
  resetDateRangeDraft(): void {
    this.draftDateFrom = '';
    this.draftDateTo = '';
  }

  //********** RESET SUBJECT **********
  resetSubjectDraft(): void {
    this.draftSubject = 'ALL';
  }

  //********** RESET STATUS **********
  resetStatusDraft(): void {
    this.draftStatus = 'ALL';
  }

  //********** RESET ALL FILTERS **********
  resetAllDraft(): void {
    //********** RESET DRAFT **********
    this.draftStatus = 'ALL';
    this.draftSubject = 'ALL';
    this.draftGrade = 'ALL';

    this.draftDateFrom = '';
    this.draftDateTo = '';
    this.draftAssessmentName = '';

    //********** RESET APPLIED **********
    this.selectedStatus = 'ALL';
    this.selectedSubject = 'ALL';
    this.selectedGrade = 'ALL';

    this.dateFrom = '';
    this.dateTo = '';
    this.assessmentName = '';

    this.emitFilter();
  }

  //********** APPLY FILTER PANEL **********
  applyFilterPanel(): void {
    this.selectedStatus = this.draftStatus;
    this.selectedSubject = this.draftSubject;
    this.selectedGrade = this.draftGrade;

    this.dateFrom = this.draftDateFrom;
    this.dateTo = this.draftDateTo;
    this.assessmentName = this.draftAssessmentName;

    this.emitFilter();

    this.closeFilterPanel();
  }

  //********** EMIT FILTER **********
  private emitFilter(): void {
    this.filterApplied.emit({
      status: this.selectedStatus,
      subject: this.selectedSubject,
      grade: this.selectedGrade,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      assessmentName: this.assessmentName,
      keyword: ''
    });
  }

  //********** ACTIVE FILTER STATE **********
  get hasActiveFilters(): boolean {
    return (
      this.selectedStatus !== 'ALL' ||
      this.selectedSubject !== 'ALL' ||
      this.selectedGrade !== 'ALL' ||
      !!this.dateFrom ||
      !!this.dateTo ||
      this.assessmentName.trim().length > 0
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

    return count;
  }

  //********** STATUS DOT CLASS **********
  statusDotClass(status: string): string {
    return `toolbar-filter__status-dot toolbar-filter__status-dot--${status
      .toString()
      .toLowerCase()}`;
  }
}