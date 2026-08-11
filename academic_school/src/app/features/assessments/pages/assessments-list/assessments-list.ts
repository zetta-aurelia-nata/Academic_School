//********** ANGULAR COMPONENT IMPORT **********
// Import Component decorator from Angular.
import { Component } from '@angular/core';

//********** COMPONENT CONFIGURATION **********
// Defines the component selector, template, and styling.
@Component({
  selector: 'app-assessments-list',
  imports: [],
  templateUrl: './assessments-list.html',
  styleUrl: './assessments-list.scss',
})

//********** ASSESSMENTS CREATE COMPONENT **********
// Handles the Assessment List page.
export class AssessmentsList {}
