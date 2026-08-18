// ********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// ********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

// ********** APPLICATION MODELS AND DATA IMPORTS **********
import { ASSESSMENT_QUESTIONS } from '../../assessment.data';
import { Question, QuestionType } from '../../models/question.model';

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
    MatRadioModule,
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
      questions: this.fb.array([]),
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

    // ********** LOAD QUESTIONS & ANSWERS **********
    const questions = ASSESSMENT_QUESTIONS[Number(this.assessmentId)] ?? [];

    questions.forEach((question) => {
      this.questions.push(this.createQuestionGroup(question));
    });
  }

  // ********** QUESTIONS FORM ARRAY **********
  get questions(): FormArray {
    return this.assessmentForm.get('questions') as FormArray;
  }

  questionOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  private createQuestionGroup(question: Partial<Question>): FormGroup {
    const type: QuestionType = question.type ?? 'essay';

    const optionControls = (question.options ?? []).map((option) =>
      this.fb.control(option.text, Validators.required),
    );

    const correctOptionIndex =
      question.options?.findIndex((option) => option.isCorrect) ?? -1;

    return this.fb.group({
      id: [question.id ?? Date.now()],
      type: [type, Validators.required],
      text: [question.text ?? '', Validators.required],
      points: [question.points ?? 10, [Validators.required, Validators.min(1)]],
      maxWord: [question.maxWord ?? 300, [Validators.min(1)]],
      correctOptionIndex: [correctOptionIndex >= 0 ? correctOptionIndex : 0],
      options: this.fb.array(
        type === 'multiple_choice'
          ? optionControls.length
            ? optionControls
            : this.defaultOptions()
          : [],
      ),
    });
  }

  private defaultOptions() {
    return [
      this.fb.control('', Validators.required),
      this.fb.control('', Validators.required),
    ];
  }

  // ********** ACTION HANDLERS: QUESTIONS **********
  addQuestion(type: QuestionType): void {
    this.questions.push(
      this.createQuestionGroup({
        type,
        text: '',
        points: 10,
        maxWord: type === 'essay' ? 300 : undefined,
      }),
    );
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  // ********** ACTION HANDLERS: OPTIONS **********
  addOption(questionIndex: number): void {
    this.questionOptions(questionIndex).push(
      this.fb.control('', Validators.required),
    );
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    const options = this.questionOptions(questionIndex);

    if (options.length <= 2) {
      return;
    }

    options.removeAt(optionIndex);

    const questionGroup = this.questions.at(questionIndex);
    const correctControl = questionGroup.get('correctOptionIndex');
    const currentCorrect = correctControl?.value ?? 0;

    if (currentCorrect === optionIndex) {
      correctControl?.setValue(0);
    } else if (currentCorrect > optionIndex) {
      correctControl?.setValue(currentCorrect - 1);
    }
  }

  // ********** UTILITY METHODS **********
  questionTypeLabel(type: QuestionType): string {
    return type === 'essay' ? 'Essay' : 'Multiple Choice';
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
    
    this.router.navigate(['/assessments']);
  }

  onCancel(): void {
    this.router.navigate(['/assessments']);
  }
}
