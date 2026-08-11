//********** ANGULAR APPLICATION BOOTSTRAP IMPORT **********
// Import bootstrapApplication to start the Angular application.
import { bootstrapApplication } from '@angular/platform-browser';

// Import the application configuration.
import { appConfig } from './app/app.config';

// Import the root application component.
import { AppComponent } from './app/app.component';


//********** APPLICATION BOOTSTRAP **********
/**
 * Start the Angular application using AppComponent and appConfig.
 * Handle errors that occur during application startup.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));