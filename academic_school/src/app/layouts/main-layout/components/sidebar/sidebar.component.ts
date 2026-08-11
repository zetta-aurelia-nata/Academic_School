//********** ANGULAR COMPONENT IMPORT **********
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

//********** COMPONENT CONFIGURATION **********
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})

//********** ASSESSMENTS CREATE COMPONENT **********
export class SidebarComponent {
  isAssessmentOpen = false;

  toggleAssessment(): void {
    this.isAssessmentOpen = !this.isAssessmentOpen;
  }
}
