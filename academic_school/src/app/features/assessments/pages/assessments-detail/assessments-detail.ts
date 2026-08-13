//********** ANGULAR IMPORTS **********
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assessments-detail',
  imports: [],
  templateUrl: './assessments-detail.html',
  styleUrl: './assessments-detail.scss',
})
export class AssessmentsDetail {
  private readonly route = inject(ActivatedRoute);

  //********** ASSESSMENT ID **********
  assessmentId = this.route.snapshot.paramMap.get('id');
}