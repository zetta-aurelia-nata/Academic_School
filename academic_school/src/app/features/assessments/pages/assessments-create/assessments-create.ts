//********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

//********** SERVICE IMPORTS **********
import { AssessmentService } from '../../services/assessment.service';

//********** MODEL IMPORTS **********
import { Question, QuestionType } from '../../models/question.model';

@Component({
  selector: 'app-assessments-create',
  standalone: true,
  templateUrl: './assessments-create.html',
  styleUrl: './assessments-create.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatExpansionModule,
  ],
})
export class AssessmentsCreate implements OnInit {
  //********** PRIVATE DEPENDENCIES **********
  private readonly fb: FormBuilder;
  private readonly router: Router;
  private readonly assessmentService: AssessmentService;

  //********** PUBLIC STATE VARIABLES **********
  assessmentForm!: FormGroup;
  selectedType: QuestionType | null = null;
  correctOptionIndex = 0;
  questions: Question[] = [];

  /**
   * Used to generate a unique ID for each question.
   */
  private questionIdCounter = 1;
  constructor(fb: FormBuilder, router: Router, assessmentService: AssessmentService) {
    this.fb = fb;
    this.router = router;
    this.assessmentService = assessmentService;
  }

  //********** INIT **********
  ngOnInit(): void {
    this.assessmentForm = this.fb.group({
      title: ['', Validators.required],
      subject: ['', Validators.required],
      grade: ['', Validators.required],
      description: [''],
      instructions: [''],
      duration: [60, [Validators.required, Validators.min(1)]],
      totalPoints: [100, [Validators.required, Validators.min(1)]],
      status: ['Draft', Validators.required],
      questionText: [''],
      maxWord: [300, Validators.min(1)],
      questionPoints: [10, [Validators.required, Validators.min(1)]],
      options: this.fb.array([]),
    });
  }

  //********** GETTER **********
  get options(): FormArray {
    return this.assessmentForm.get('options') as FormArray;
  }

  //********** ACTION HANDLERS **********
  selectType(type: QuestionType): void {
    /*
     * If the same question type is selected, keep the form open.
     * This allows the user to create another question.
     */
    if (this.selectedType === type) {
      return;
    }

    this.selectedType = type;
    this.resetQuestionForm();

    if (this.selectedType === 'multiple_choice') {
      this.createDefaultOptions();
    }
  }

  private resetQuestionForm(): void {
    this.assessmentForm.patchValue({
      questionText: '',
      maxWord: 300,
      questionPoints: 10,
    });

    this.options.clear();
    this.correctOptionIndex = 0;
  }

  private createDefaultOptions(): void {
    for (let i = 0; i < 4; i++) {
      this.options.push(this.fb.control('', Validators.required));
    }
  }

  addOption(): void {
    this.options.push(this.fb.control('', Validators.required));
  }

  removeOption(index: number): void {
    if (this.options.length <= 2) {
      return;
    }

    this.options.removeAt(index);
    if (this.correctOptionIndex === index) {
      this.correctOptionIndex = 0;
    } else if (this.correctOptionIndex > index) {
      this.correctOptionIndex--;
    }
  }

  setCorrectOption(index: number): void {
    this.correctOptionIndex = index;
  }

  addQuestion(): void {
    if (!this.selectedType) {
      return;
    }

    const questionTextControl = this.assessmentForm.get('questionText');
    const questionText = questionTextControl?.value?.trim();

    if (!questionText) {
      questionTextControl?.markAsTouched();
      return;
    }

    const points = Number(this.assessmentForm.get('questionPoints')?.value);

    if (this.selectedType === 'essay') {
      const maxWord = Number(this.assessmentForm.get('maxWord')?.value);

      this.questions.push({
        id: this.questionIdCounter++,
        type: 'essay',
        text: questionText,
        points,
        maxWord,
      });
    }

    if (this.selectedType === 'multiple_choice') {
      const optionValues = this.options.getRawValue();

      if (optionValues.some((option: string) => !option?.trim())) {
        this.options.markAllAsTouched();

        return;
      }

      if (this.correctOptionIndex >= optionValues.length) {
        this.correctOptionIndex = 0;
      }

      this.questions.push({
        id: this.questionIdCounter++,
        type: 'multiple_choice',
        text: questionText,
        points,
        options: optionValues.map((option: string, index: number) => ({
          text: option.trim(),

          isCorrect: index === this.correctOptionIndex,
        })),
      });
    }

    this.resetQuestionForm();
    if (this.selectedType === 'multiple_choice') {
      this.createDefaultOptions();
    }
  }

  removeCreatedQuestion(index: number): void {
    if (index < 0 || index >= this.questions.length) return;
    this.questions = this.questions.filter((_, i) => i !== index);
  }

  questionTypeLabel(type: QuestionType): string {
    return type === 'essay' ? 'Essay' : 'Multiple Choice';
  }

  cancelQuestion(): void {
    this.resetQuestionForm();
    this.selectedType = null;
  }

  noQuestionError = false;

  onSave(): void {
    if (this.assessmentForm.invalid) {
      this.assessmentForm.markAllAsTouched();
      return;
    }
    if (this.questions.length === 0) {
      this.noQuestionError = true;
      return;
    }
    this.noQuestionError = false;

    const formValue = this.assessmentForm.getRawValue();
    const assessmentData = {
      title: formValue.title,
      subject: formValue.subject,
      grade: formValue.grade,
      description: formValue.description,
      instructions: formValue.instructions,
      duration: Number(formValue.duration),
      totalPoints: Number(formValue.totalPoints),
      status: formValue.status,
      questions: this.questions,
    };

    this.assessmentService.createAssessment(assessmentData);
    this.router.navigate(['/assessments']);
  }

  onCancel(): void {
    this.router.navigate(['/assessments']);
  }
}
