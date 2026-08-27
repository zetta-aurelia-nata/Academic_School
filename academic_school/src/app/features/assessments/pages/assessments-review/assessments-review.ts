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
//********** SHARED COMPONENT IMPORTS **********
import {
  FilterComponent,
  FilterValue,
} from '../../../../shared/components/filter-component/filter-component';

@Component({
  selector: 'app-assessments-review',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FilterComponent,
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

  private activeFilter: FilterValue | null = null;

  // ********** LIFECYCLE **********
  ngOnInit(): void {
    this.loadAssessments();
  }

  private loadAssessments(): void {
    this.assessments = this.assessmentService.getAssessments();

    this.filteredAssessments = [...this.assessments];
  }

  // ********** FILTER OPTIONS (derived from data) **********
  get statusOptions(): string[] {
    return this.uniqueValues((assessment) => assessment.status);
  }

  get subjectOptions(): string[] {
    return this.uniqueValues((assessment) => assessment.subject);
  }

  get gradeOptions(): string[] {
    return this.uniqueValues((assessment) => assessment.grade);
  }

  private uniqueValues(pick: (assessment: Assessment) => unknown): string[] {
    const values = this.assessments
      .map((assessment) => pick(assessment)?.toString().trim())
      .filter((value): value is string => !!value);

    return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
  }

  // ********** ACTION HANDLERS **********
  onSearch(): void {
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchQuery = '';

    this.applyFilters();
  }

  onFilterApplied(filter: FilterValue): void {
    this.activeFilter = filter;

    this.applyFilters();
  }

  onReview(assessment: Assessment): void {
    this.router.navigate(['/assessments', assessment.id, 'submissions']);
  }

  statusClass(status: AssessmentStatus): string {
    return `status-badge status-badge--${status.toLowerCase()}`;
  }

  // ********** COMBINED SEARCH + FILTER LOGIC **********
  private applyFilters(): void {
    const query = this.searchQuery.trim().toLowerCase();
    const filter = this.activeFilter;

    this.filteredAssessments = this.assessments.filter((assessment) => {
      const title = assessment.title?.toString().toLowerCase() ?? '';
      const subject = assessment.subject?.toString().toLowerCase() ?? '';
      const grade = assessment.grade?.toString().toLowerCase() ?? '';
      const status = assessment.status?.toString().toLowerCase() ?? '';

      const matchesSearch =
        !query ||
        title.includes(query) ||
        subject.includes(query) ||
        grade.includes(query) ||
        status.includes(query);

      if (!matchesSearch) {
        return false;
      }

      if (!filter) {
        return true;
      }

      const matchesStatus =
        filter.status === 'ALL' || status === filter.status.toString().toLowerCase();

      const matchesSubject =
        filter.subject === 'ALL' || subject === filter.subject.toString().toLowerCase();

      const matchesGrade =
        filter.grade === 'ALL' || grade === filter.grade.toString().toLowerCase();

      const matchesDate = this.isWithinDateRange(
        assessment.date,
        filter.dateFrom,
        filter.dateTo
      );

      return matchesStatus && matchesSubject && matchesGrade && matchesDate;
    });
  }

  private isWithinDateRange(
    date: unknown,
    dateFrom: string,
    dateTo: string
  ): boolean {
    if (!dateFrom && !dateTo) {
      return true;
    }

    if (!date) {
      return false;
    }

    const assessmentDate = new Date(date as string | number | Date).getTime();

    if (Number.isNaN(assessmentDate)) {
      return true;
    }

    if (dateFrom && assessmentDate < new Date(dateFrom).getTime()) {
      return false;
    }

    if (dateTo && assessmentDate > new Date(dateTo).getTime()) {
      return false;
    }

    return true;
  }
}