// *************** Angular Imports ***************
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// *************** Angular Material Imports ***************
import { MatIcon } from '@angular/material/icon';
import { TranslocoDirective } from '@jsverse/transloco';

// *************** INTERFACES ***************
export interface SubmenuItem {
  id: string;
  translationKey: string;
  link: string;
  label:string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatIcon,TranslocoDirective],
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
    { id: 'list', label: 'Assessments List', link: '/assessments',translationKey:'sidebar.submenu.list' },
    { id: 'result', label: 'Assessment Scoring', link: '/assessments/result', translationKey:'sidebar.submenu.result'},
    { id: 'submission', label: 'Assessment Result', link: '/assessments/review', translationKey:'sidebar.submenu.submission'},
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
