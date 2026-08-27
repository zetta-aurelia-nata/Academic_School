// *************** Angular Imports ***************
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// *************** Angular Material Imports ***************
import { MatIcon } from '@angular/material/icon';

// *************** INTERFACES ***************
export interface SubmenuItem {
  id: string;
  label: string;
  link: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output() navigationSelected = new EventEmitter<void>();

  onNavigationSelected(): void {
    this.navigationSelected.emit();
  }

  // *************** PUBLIC STATE VARIABLES ***************
  isAssessmentOpen = false;
  readonly assessmentSubmenus: SubmenuItem[] = [
    { id: 'list', label: 'Assessments List', link: '/assessments' },
    { id: 'result', label: 'Assessment Scoring', link: '/assessments/result' },
    { id: 'submission', label: 'Assessment Result', link: '/assessments/review' },
  ];

  // *************** ACTION HANDLERS ***************
  /**
   * Toggles the expanded/collapsed state of the assessment menu
   */
  toggleAssessment(): void {
    this.isAssessmentOpen = !this.isAssessmentOpen;
  }

  // *************** SETTER & GETTER ***************
  /**
   * Returns the arrow indicator character based on menu expanded state
   */
  get assessmentArrowIcon(): string {
    return this.isAssessmentOpen ? '⌃' : '⌄';
  }
}
