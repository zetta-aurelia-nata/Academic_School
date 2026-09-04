// **************** Angular Imports ****************
import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslocoHttpLoader } from './core/i18n/transloco-loader';
import { provideTransloco } from '@jsverse/transloco';

// **************** Application Configuration ****************
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([])),
    provideTransloco({
      config : {
        availableLangs:['en', 'fr'],
        defaultLang:'en',
        reRenderOnLangChange:true,
        prodMode:!isDevMode(),
      },
      loader: TranslocoHttpLoader
    })
  ],
};
