//********** ANGULAR IMPORTS **********
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})

//********** PUBLIC STATE VARIABLES **********
export class SidebarComponent {
  isAssessmentOpen = false;

  //********** ACTION HANDLERS **********

  toggleAssessment(): void {
    this.isAssessmentOpen = !this.isAssessmentOpen;
  }
}
