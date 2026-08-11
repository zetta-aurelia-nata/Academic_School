//********** ANGULAR COMPONENT IMPORT **********
// Import Component from Angular.
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Footer } from './components/footer/footer';

//********** COMPONENT CONFIGURATION **********
// Defines the component selector, imports,template, and styling.
@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    Footer,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})

//********** ASSESSMENTS CREATE COMPONENT **********
// Handles the Assessment Dashboard page.
export class MainLayout {}