//********** ANGULAR IMPORTS **********
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

//********** THIRD-PARTY IMPORTS **********
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [MatIcon, TranslocoDirective],
})
export class HeaderComponent {
  //********** SIDEBAR TOGGLE EVENT **********
  @Output() sidebarToggle = new EventEmitter<void>();

  //********** PUBLIC STATE VARIABLES **********
  currentLang: string;

  //********** CONSTRUCTOR **********
  constructor(private readonly translocoService: TranslocoService) {
    // *************** Track the language that is actually active, not just the default
    this.currentLang = this.translocoService.getActiveLang();
  }

  //********** ACTION HANDLERS **********
  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  // *************** Cycle to the next available language and re-render translations
  toggleLanguage(): void {
    const availableLangs = this.translocoService
      .getAvailableLangs()
      .map((lang) => (typeof lang === 'string' ? lang : lang.id));

    const currentIndex = availableLangs.indexOf(this.currentLang);
    const nextLang = availableLangs[(currentIndex + 1) % availableLangs.length];

    this.translocoService.setActiveLang(nextLang);
    this.currentLang = nextLang;
  }
}
