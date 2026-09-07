//********** ANGULAR IMPORTS **********
import { Component } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-footer',
  imports: [TranslocoDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})

export class FooterComponent {}
