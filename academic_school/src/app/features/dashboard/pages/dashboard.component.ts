//********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

//********** ANGULAR MATERIAL IMPORTS **********
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

//********** THIRD-PARTY IMPORTS **********
import { TranslocoModule, TranslocoDirective } from '@jsverse/transloco';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher';

//********** MODELS & SERVICES **********
import {
  AssessmentStat,
  CalculationMetric,
  StatusSlice,
} from '../models/dashboard.model';
import { DashboardService } from '../services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    MatIconModule,
    CommonModule,
    TranslocoModule,
    LanguageSwitcherComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  //********** PUBLIC STATE VARIABLES **********
  stats: AssessmentStat[] = [];
  statusDistribution: StatusSlice[] = [];
  calculationSummary: CalculationMetric[] = [];
  donutGradient = '';

  //********** CONSTRUCTOR **********
  constructor(private readonly dashboardService: DashboardService) {}

  //********** LIFECYCLE HOOKS **********
  ngOnInit(): void {
    this.stats = this.dashboardService.getStats();
    this.statusDistribution = this.dashboardService.getStatusDistribution();
    this.calculationSummary = this.dashboardService.getCalculationSummary();
    this.donutGradient = this.buildDonutGradient(this.statusDistribution);
  }

  //********** PRIVATE METHODS **********
  private buildDonutGradient(slices: StatusSlice[]): string {
    if (!slices.length) {
      return 'conic-gradient(var(--color-card-grey) 0% 100%)';
    }

    let cumulative = 0;

    const stops = slices.map((slice) => {
      const start = cumulative;
      cumulative += slice.percentage;

      return `var(${slice.colorVar}) ${start}% ${cumulative}%`;
    });

    return `conic-gradient(${stops.join(', ')})`;
  }
}