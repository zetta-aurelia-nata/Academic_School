//********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

//********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export type QuestionType = 'essay' | 'multiple_choice';

@Component({
  selector: 'app-assessments-create',
  templateUrl: './assessments-create.html',
  styleUrl: './assessments-create.scss',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
})
export class AssessmentsCreate {
  //********** PUBLIC STATE VARIABLES **********
  selectedType: QuestionType | null = null;

  //********** ACTION HANDLERS **********
  selectType(type: QuestionType): void {
    this.selectedType = this.selectedType === type ? null : type;
  }

  cancelSelection(): void {
    this.selectedType = null;
  }
}
