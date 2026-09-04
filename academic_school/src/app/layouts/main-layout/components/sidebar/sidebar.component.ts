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
  { id: 'list', label: 'Assessments List', link: '/assessments', translationKey: 'layout.sidebar.menu.submenu.list' },
  { id: 'scoring', label: 'Assessment Scoring', link: '/assessments/result', translationKey: 'layout.sidebar.menu.submenu.scoring' },
  { id: 'review', label: 'Assessment Result', link: '/assessments/review', translationKey: 'layout.sidebar.menu.submenu.review' },
];

  // *************** ACTION HANDLERS ***************
  toggleAssessment(): void {
    this.isAssessmentOpen = !this.isAssessmentOpen;
  }

  // *************** SETTER & GETTER ***************
  get assessmentArrowIcon(): string {
    return this.isAssessmentOpen ? '⌃' : '⌄';
  }
}
