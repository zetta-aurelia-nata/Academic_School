//********** ANGULAR COMPONENT IMPORT **********
// - Import Angular Component decorator.
import { Component } from '@angular/core';

// - Import RouterOutlet to display routed components.
import { RouterOutlet } from '@angular/router';

//********** ROOT COMPONENT CONFIGURATION **********
// - Defines the main configuration for the application root component.
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

//********** ROOT APPLICATION COMPONENT **********
// - Serves as the root component of the Angular application.
export class AppComponent {}
