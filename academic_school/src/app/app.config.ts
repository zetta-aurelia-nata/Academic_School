//********** ANGULAR APPLICATION CONFIGURATION IMPORT **********
/**
 * Import ApplicationConfig for configuring the Angular application.
 * Import browser error listeners for global error handling.
 * Import provideRouter to enable Angular routing.
 */
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

//********** APPLICATION ROUTES IMPORT **********
//Import the application's route definitions.
import { routes } from './app.routes';

//********** APPLICATION CONFIGURATION **********
/**
 * Defines global providers used by the Angular application.
 * Enables global browser error listeners.
 * Registers application routes for navigation.
 */
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes)],
};
