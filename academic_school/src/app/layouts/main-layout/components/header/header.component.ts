//********** ANGULAR IMPORTS **********
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [MatIcon],
})
export class HeaderComponent {
  //********** SIDEBAR TOGGLE EVENT **********
  @Output() sidebarToggle = new EventEmitter<void>();

  //********** ACTION HANDLERS **********
  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }
}
