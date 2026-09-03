import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslocoLoader } from '@jsverse/transloco';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslocoHttpLoader implements TranslocoLoader {
  private readonly http = inject(HttpClient);

  getTranslation(lang: string): Observable<Record<string, any>> {
    const files = ['common', 'auth', 'dashboard', 'assessments'];

    const requests = files.map((file) =>
      this.http.get<Record<string, any>>(`/assets/i18n/${lang}/${file}.json`),
    );

    return forkJoin(requests).pipe(map((responses) => Object.assign({}, ...responses)));
  }
}
