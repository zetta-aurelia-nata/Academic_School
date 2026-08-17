// ********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// ********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-assessments-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './assessments-edit.html',
  styleUrl: './assessments-edit.scss',
})
export class EditAssessment implements OnInit {
  // ********** PRIVATE VARIABLES **********
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  // ********** PUBLIC STATE VARIABLES **********
  assessmentForm!: FormGroup;
  assessmentId!: string;

  // ********** LIFECYCLE HOOKS **********
  ngOnInit(): void {
    this.assessmentId = this.route.snapshot.paramMap.get('id') || '';

    this.assessmentForm = this.fb.group({
      title: ['', Validators.required],
      subject: ['', Validators.required],
      grade: ['', Validators.required],
      description: [''],
      instructions: [''],
      duration: [60, [Validators.required, Validators.min(1)]],
      totalPoints: [100, [Validators.required, Validators.min(1)]],
      status: ['Draft', Validators.required],
    });

    this.loadAssessment();
  }

  // ********** INIT / LOAD DATA **********
  loadAssessment(): void {
    const assessment = {
      id: this.assessmentId,
      title: 'Mathematics Midterm Assessment',
      subject: 'Mathematics',
      grade: 'Grade 10',
      description: 'Midterm assessment for Mathematics subject.',
      instructions: 'Read each question carefully before answering.',
      duration: 60,
      totalPoints: 100,
      status: 'Published',
    };

    this.assessmentForm.patchValue(assessment);
  }

  // ********** ACTION HANDLERS **********
  onSave(): void {
    if (this.assessmentForm.invalid) {
      this.assessmentForm.markAllAsTouched();
      return;
    }

    const updatedAssessment = {
      id: this.assessmentId,
      ...this.assessmentForm.value,
    };

    console.log('Updated Assessment:', updatedAssessment);

    this.router.navigate(['/assessments']);
  }

  onCancel(): void {
    this.router.navigate(['/assessments']);
  }
}
