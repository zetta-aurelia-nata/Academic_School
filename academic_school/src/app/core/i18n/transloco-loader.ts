import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslocoLoader } from '@jsverse/transloco';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslocoHttpLoader implements TranslocoLoader {
  private readonly http = inject(HttpClient);
  private readonly files = ['common', 'auth', 'dashboard', 'assessments'] as const;

  getTranslation(lang: string): Observable<Record<string, any>> {
    const requests = this.files.map((file) =>
      this.http.get<Record<string, any>>(`/assets/i18n/${lang}/${file}.json`),
    );

    return forkJoin(requests).pipe(
      map((responses) =>
        this.files.reduce<Record<string, any>>((acc, file, i) => {
          acc[file] = responses[i];
          return acc;
        }, {}),
      ),
    );
  }
}