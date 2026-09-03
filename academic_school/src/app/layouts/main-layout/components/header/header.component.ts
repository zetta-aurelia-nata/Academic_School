//********** ANGULAR IMPORTS **********
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

//********** THIRD-PARTY IMPORTS **********
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [MatIcon, TranslocoDirective],
})
export class HeaderComponent implements OnInit {
  private static readonly LANG_KEY = 'user_language';

  //********** SIDEBAR TOGGLE EVENT **********
  @Output() sidebarToggle = new EventEmitter<void>();

  //********** PUBLIC STATE VARIABLES **********
  currentLang!: string;

  //********** CONSTRUCTOR **********
  constructor(private readonly translocoService: TranslocoService) {}

  //********** LIFECYCLE HOOKS **********
  ngOnInit(): void {
    const availableLangs = this.getAvailableLangs();
    const savedLang = localStorage.getItem(HeaderComponent.LANG_KEY);

    if (savedLang && availableLangs.includes(savedLang)) {
      this.currentLang = savedLang;
      this.translocoService.setActiveLang(savedLang);
    } else {
      this.currentLang = this.translocoService.getActiveLang();
    }
  }

  //********** ACTION HANDLERS **********
  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  toggleLanguage(): void {
    const availableLangs = this.getAvailableLangs();
    const currentIndex = availableLangs.indexOf(this.currentLang);
    const nextLang = availableLangs[(currentIndex + 1) % availableLangs.length];

    this.translocoService.setActiveLang(nextLang);
    this.currentLang = nextLang;

    localStorage.setItem(HeaderComponent.LANG_KEY, nextLang);
  }

  //********** PRIVATE HELPER METHODS **********
  private getAvailableLangs(): string[] {
    return this.translocoService
      .getAvailableLangs()
      .map((lang) => (typeof lang === 'string' ? lang : lang.id));
  }
}
