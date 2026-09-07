// ********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

// ********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

// ********** THIRD-PARTY IMPORTS **********
import { TranslocoDirective } from '@jsverse/transloco';

// ********** INTERFACES **********
export interface FilterValue {
  status: string;
  subject: string;
  grade: string;
  dateFrom: string;
  dateTo: string;
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
    TranslocoDirective,
  ],
  templateUrl: './filter-component.html',
  styleUrls: ['./filter-component.scss'],
})
export class FilterComponent {
  @ViewChild('filterWrapper')
  filterWrapperRef?: ElementRef<HTMLElement>;

  // ********** DECORATION VARIABLES **********
  @Input() statusOptions: string[] = [];
  @Input() subjectOptions: string[] = [];
  @Input() gradeOptions: string[] = [];
  @Output() filterApplied = new EventEmitter<FilterValue>();

  // ********** PUBLIC STATE VARIABLES **********
  showFilterPanel = false;
  openDropdown: 'subject' | 'status' | 'grade' | null = null;
  selectedStatus = 'ALL';
  selectedSubject = 'ALL';
  selectedGrade = 'ALL';
  dateFrom = '';
  dateTo = '';
  assessmentName = '';

  draftStatus = 'ALL';
  draftSubject = 'ALL';
  draftGrade = 'ALL';
  draftDateFrom = '';
  draftDateTo = '';
  draftAssessmentName = '';

  // ********** STATUS -> TRANSLATION KEY MAP **********
  private readonly statusKeyMap: Record<string, string> = {
    Completed: 'status.completed',
    Pending: 'status.pending',
    Failed: 'status.failed',
    Draft: 'status.draft',
    'Not Submitted': 'status.notSubmitted',
  };

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.showFilterPanel) {
      return;
    }

    this.closeFilterPanel();
  }

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

  toggleFilterPanel(): void {
    this.showFilterPanel = !this.showFilterPanel;

    if (this.showFilterPanel) {
      this.draftStatus = this.selectedStatus;
      this.draftSubject = this.selectedSubject;
      this.draftGrade = this.selectedGrade;

      this.draftDateFrom = this.dateFrom;
      this.draftDateTo = this.dateTo;
    } else {
      this.openDropdown = null;
    }
  }

  closeFilterPanel(): void {
    this.showFilterPanel = false;

    this.openDropdown = null;
  }

  toggleDropdown(name: 'subject' | 'status' | 'grade'): void {
    this.openDropdown = this.openDropdown === name ? null : name;
  }

  selectDraftSubject(subject: string): void {
    this.draftSubject = subject;

    this.openDropdown = null;
  }

  selectDraftGrade(grade: string): void {
    this.draftGrade = grade;

    this.openDropdown = null;
  }

  selectDraftStatus(status: string): void {
    this.draftStatus = status;

    this.openDropdown = null;
  }

  resetGradeDraft(): void {
    this.draftGrade = 'ALL';
  }

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

  resetAllDraft(): void {
    this.draftStatus = 'ALL';
    this.draftSubject = 'ALL';
    this.draftGrade = 'ALL';

    this.draftDateFrom = '';
    this.draftDateTo = '';

    this.selectedStatus = 'ALL';
    this.selectedSubject = 'ALL';
    this.selectedGrade = 'ALL';

    this.dateFrom = '';
    this.dateTo = '';

    this.emitFilter();
  }

  applyFilterPanel(): void {
    this.selectedStatus = this.draftStatus;
    this.selectedSubject = this.draftSubject;
    this.selectedGrade = this.draftGrade;

    this.dateFrom = this.draftDateFrom;
    this.dateTo = this.draftDateTo;

    this.emitFilter();

    this.closeFilterPanel();
  }

  private emitFilter(): void {
    this.filterApplied.emit({
      status: this.selectedStatus,
      subject: this.selectedSubject,
      grade: this.selectedGrade,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      assessmentName: this.assessmentName,
    });
  }

  // ********** SETTER & GETTER **********
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

  get activeFilterCount(): number {
    let count = 0;

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

  statusDotClass(status: string): string {
    return `toolbar-filter__status-dot toolbar-filter__status-dot--${status
      .toString()
      .toLowerCase()}`;
  }

  // ********** STATUS TRANSLATION KEY **********
  statusLabelKey(status: string): string {
    return this.statusKeyMap[status] ?? 'status.draft';
  }
}
