
//********** ANGULAR COMPONENT IMPORT **********
// Import Component decorator from Angular.
import { Component } from '@angular/core';

//********** COMPONENT CONFIGURATION **********
// Defines the component selector, template, and styling.
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})

//********** ASSESSMENTS CREATE COMPONENT **********
// Handles the Assessment Dashboard page.
export class Dashboard {}
