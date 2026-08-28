import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  // *************** PRIVATE VARIABLES ***************
  private http = inject(HttpClient);

  getTranslation(lang: string): Observable<Record<string, any>> {
    // *************** Define Translation Files
    const files = ['common', 'auth'];

    // *************** Create Requests for Each File
    const requests: Observable<Record<string, any>>[] = files.map((file) =>
      this.http.get<Record<string, any>>(`/assets/i18n/${lang}/${file}.json`),
    );

    // *************** Fetch and Merge Translations
    return forkJoin(requests).pipe(
      map((responses: Record<string, any>[]) => {
        return Object.assign({}, ...responses);
      }),
    );
  }
}
