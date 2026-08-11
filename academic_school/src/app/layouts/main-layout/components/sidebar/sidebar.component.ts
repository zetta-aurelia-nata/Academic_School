//********** ANGULAR COMPONENT IMPORT **********
// Import Component decorator from Angular.
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

//********** COMPONENT CONFIGURATION **********
// Defines the component selector, template, and styling.
@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})



//********** ASSESSMENTS CREATE COMPONENT **********
/**
 * Toggles the Assessment submenu visibility.
 * Handles the Assessment Sidebar navigation page.
 */
export class SidebarComponent {

  isAssessmentOpen = false;

  toggleAssessment(): void {
    this.isAssessmentOpen = !this.isAssessmentOpen;
  }

}