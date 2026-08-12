// **************** Angular Imports ****************
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// **************** Application Configuration ****************
/**
 * Global application configuration.
 * 
 * Provides browser error listeners and application routing.
 */
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes)],
};
