//********** ANGULAR IMPORTS **********
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

export type QuestionType = 'essay' | 'multiple_choice';

@Component({
  selector: 'app-assessments-create',
  templateUrl: './assessments-create.html',
  styleUrl: './assessments-create.scss',
  imports: [
    CommonModule, // handle *ngIf, *ngFor, dll
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
})
export class AssessmentsCreate {
  selectedType: QuestionType | null = null;

  // toggle: klik card yang sama lagi -> form ikut nutup
  selectType(type: QuestionType): void {
    this.selectedType = this.selectedType === type ? null : type;
  }

  // dipanggil dari tombol "Cancel" di dalam form
  cancelSelection(): void {
    this.selectedType = null;
  }
}
