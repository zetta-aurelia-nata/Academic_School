//********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//********** ANGULAR CDK IMPORTS **********
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, CdkDragPlaceholder } from '@angular/cdk/drag-drop';

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
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder
  ],
})
export class AssessmentsCreate implements OnInit {
  //********** PRIVATE DEPENDENCIES **********
  private readonly fb: FormBuilder;
  private readonly router: Router;
  private readonly assessmentService: AssessmentService;

  //********** PUBLIC STATE VARIABLES **********
  assessmentForm!: FormGroup;
  questionForm!: FormGroup;
  selectedType: QuestionType | null = null;
  correctOptionIndex = 0;
  questions: Question[] = [];
   
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
      duration: ['', [Validators.required, Validators.min(1)]],
      totalPoints: ['', [Validators.required, Validators.min(1)]],
      status: ['', Validators.required],
    });

    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      maxWord: ['', Validators.required, Validators.min(1)],
      questionPoints: ['', [Validators.required, Validators.min(1)]],
      options: this.fb.array([]),
    });
    
  }

  //********** SETTER & GETTER **********
  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  //********** ACTION HANDLERS **********
  selectType(type: QuestionType): void {
    if (this.selectedType === type) {
      return;
    }

    this.selectedType = type;
    this.resetQuestionForm();

    if (this.selectedType === 'multiple_choice') {
      this.createDefaultOptions();
    }
  }

  //********** PRIVATE VARIABLES **********
  private resetQuestionForm(): void {
    this.questionForm.reset({
      questionText: '',
      maxWord: '',
      questionPoints: '',
    });

    this.options.clear();
    this.correctOptionIndex = 0;
  }

  //********** PRIVATE VARIABLES **********
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

    const questionTextControl = this.questionForm.get('questionText');
    const questionText = questionTextControl?.value?.trim();
    const questionPointsControl = this.questionForm.get('questionPoints');

    if (!questionText || questionPointsControl?.invalid) {
      questionTextControl?.markAsTouched();
      questionPointsControl?.markAsTouched();
      return;
    }

    const points = Number(questionPointsControl?.value);

    if (this.selectedType === 'essay') {
      const maxWord = Number(this.questionForm.get('maxWord')?.value);

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

  // ********** ACTION HANDLERS **********
  dropCreatedQuestion(event: CdkDragDrop<Question[]>): void {
    if (event.previousIndex === event.currentIndex) {
      return;
    }

    const reordered = [...this.questions];
    moveItemInArray(reordered, event.previousIndex, event.currentIndex);
    this.questions = reordered;
  }

  moveCreatedQuestionUp(index: number): void {
    if (index <= 0) {
      return;
    }

    const reordered = [...this.questions];
    moveItemInArray(reordered, index, index - 1);
    this.questions = reordered;
  }

  moveCreatedQuestionDown(index: number): void {
    if (index >= this.questions.length - 1) {
      return;
    }

    const reordered = [...this.questions];
    moveItemInArray(reordered, index, index + 1);
    this.questions = reordered;
  }

  questionTypeLabel(type: QuestionType): string {
    return type === 'essay' ? 'Essay' : 'Multiple Choice';
  }

  cancelQuestion(): void {
    this.resetQuestionForm();
    this.selectedType = null;
  }

  noQuestionError = false;

  // ********** ACTION HANDLER **********F
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

  // ********** ACTION HANDLER **********
  onCancel(): void {
    this.router.navigate(['/assessments']);
  }
}
