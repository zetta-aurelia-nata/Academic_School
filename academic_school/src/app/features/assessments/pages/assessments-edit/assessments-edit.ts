// ********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// ********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

// ********** APPLICATION MODELS AND DATA IMPORTS **********
import { ASSESSMENT_QUESTIONS } from '../../assessment.data';
import { AssessmentService } from '../../services/assessment.service';
import { Question, QuestionType } from '../../models/question.model';

@Component({
  selector: 'app-assessments-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // ********** MATERIAL MODULES **********
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
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
  private readonly fb: FormBuilder;
  private readonly route: ActivatedRoute;
  private readonly router: Router;
  private readonly assessmentService: AssessmentService;

  // ********** CONSTRUCTOR **********
  constructor(
    fb: FormBuilder,
    route: ActivatedRoute,
    router: Router,
    assessmentService: AssessmentService,
  ) {
    this.fb = fb;
    this.route = route;
    this.router = router;
    this.assessmentService = assessmentService;
  }

  // ********** PUBLIC STATE VARIABLES **********
  assessmentForm!: FormGroup;
  assessmentId!: number;

  // ********** LIFECYCLE HOOKS **********
  ngOnInit(): void {
    this.assessmentId = Number(this.route.snapshot.paramMap.get('id'));
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
    const assessment = this.assessmentService.getAssessmentById(this.assessmentId);

    if (!assessment) {
      this.router.navigate(['/assessments']);
      return;
    }

    this.assessmentForm.patchValue({
      title: assessment.title,
      subject: assessment.subject,
      grade: assessment.grade,
      status: assessment.status,
    });

    const questions = ASSESSMENT_QUESTIONS[this.assessmentId] ?? [];

    questions.forEach((question) => {
      this.questions.push(this.createQuestionGroup(question));
    });
  }

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
    const correctOptionIndex = question.options?.findIndex((option) => option.isCorrect) ?? -1;

    return this.fb.group({
      id: [question.id ?? Date.now()],
      type: [type, Validators.required],
      text: [question.text ?? '', Validators.required],
      points: [question.points ?? 10, [Validators.required, Validators.min(1)]],
      maxWord: [question.maxWord ?? 300, Validators.min(1)],
      correctOptionIndex: [correctOptionIndex >= 0 ? correctOptionIndex : 0],
      options: this.fb.array(
        type === 'multiple_choice'
          ? optionControls.length > 0
            ? optionControls
            : this.defaultOptions()
          : [],
      ),
    });
  }

  private defaultOptions(): FormControl[] {
    return [this.fb.control('', Validators.required), this.fb.control('', Validators.required)];
  }

  // ********** ACTION HANDLERS : QUESTIONS **********
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

  // ********** ACTION HANDLERS : OPTIONS **********
  addOption(questionIndex: number): void {
    this.questionOptions(questionIndex).push(this.fb.control('', Validators.required));
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    const options = this.questionOptions(questionIndex);

    // ********** MINIMUM 2 OPTIONS **********
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

  // ********** ACTION HANDLERS  **********
  onSave(): void {
    // ********** VALIDATE FORM **********
    if (this.assessmentForm.invalid) {
      this.assessmentForm.markAllAsTouched();
      return;
    }

    // ********** GET FORM VALUE **********
    const formValue = this.assessmentForm.getRawValue();

    // ********** UPDATE ASSESSMENT **********
    this.assessmentService.updateAssessment(this.assessmentId, {
      title: formValue.title,
      subject: formValue.subject,
      grade: formValue.grade,
      status: formValue.status,

      description: formValue.description,

      instructions: formValue.instructions,

      duration: formValue.duration,

      totalPoints: formValue.totalPoints,
    });

    // ********** NAVIGATE BACK **********
    this.router.navigate(['/assessments']);
  }

  // ********************************************************
  // ********** CANCEL **********
  // ********************************************************

  onCancel(): void {
    this.router.navigate(['/assessments']);
  }
}
