//********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

//********** ANGULAR MATERIAL IMPORTS **********
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

//********** MODELS & SERVICES **********
import { AssessmentStat } from '../models/dashboard.model';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  //********** PUBLIC STATE VARIABLES **********
  stats: AssessmentStat[] = [];

  //********** CONSTRUCTOR **********
  constructor(private readonly dashboardService: DashboardService) {}

  //********** LIFECYCLE HOOKS **********
  ngOnInit(): void {
    this.stats = this.dashboardService.getStats();
  }
}