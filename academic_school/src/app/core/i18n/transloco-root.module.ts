//********** ANGULAR IMPORTS **********
import { isDevMode, NgModule } from '@angular/core';

//********** APPLICATION IMPORTS **********
import { TranslocoHttpLoader } from './transloco-loader';
import { TranslocoModule, provideTransloco } from '@jsverse/transloco';

@NgModule({
  exports: [TranslocoModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: ['en', 'fr', 'es', 'id'],
        defaultLang: 'fr',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
})
export class TranslocoRootModule {}
