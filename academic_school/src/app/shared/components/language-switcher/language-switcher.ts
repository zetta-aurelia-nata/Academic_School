import { Component } from '@angular/core';
import { TranslocoService, TranslocoDirective } from '@jsverse/transloco';
import { NgFor } from '@angular/common';

@Component({
  selector: 'language-switcher',
  standalone: true,
  imports: [NgFor, TranslocoDirective],
  templateUrl: './language-switcher.html',
})
export class LanguageSwitcherComponent {
  currentLang: string;
  languages: string[];

  constructor(private translocoService: TranslocoService) {
    this.currentLang = this.translocoService.getDefaultLang();
    const availableLangs = this.translocoService.getAvailableLangs();

    if (Array.isArray(availableLangs) && typeof availableLangs[0] === 'string') {
      this.languages = availableLangs as string[];
    } else {
      this.languages = (availableLangs as { id: string; label: string }[]).map((lang) => lang.id);
    }
  }

  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const langCode = target.value;

    this.translocoService.setActiveLang(langCode);
    this.currentLang = langCode;
  }
}
