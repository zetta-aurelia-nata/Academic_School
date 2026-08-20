//********** ANGULAR IMPORTS **********
import {
  CommonModule,
} from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormsModule,
} from '@angular/forms';

//********** ANGULAR MATERIAL IMPORTS **********
import {
  MatButtonModule,
} from '@angular/material/button';
import {
  MatCardModule,
} from '@angular/material/card';
import {
  MatIconModule,
} from '@angular/material/icon';
import {
  MatSelectModule,
} from '@angular/material/select';

//********** APPLICATION MODELS AND SERVICES IMPORTS **********
import {
  AssessmentService,
} from '../../services/assessment.service';
import {
  SubmissionService,
} from '../../services/submission.service';
import {
  Submission,
  SubmissionAnswer,
} from '../../models/submission.model';
import {
  Assessment,
} from '../assessments-list/assessment.list.model';

//********** RESULT STATE INTERFACE **********
interface AssessmentResult {
  assessmentId: number;
  published: boolean;
  locked: boolean;
}

//********** RESULT ANSWER INTERFACE **********
interface EssayAnswer {
  question: string;
  answer: string;
  maxScore: number;
  score: number;
  teacherComment: string;
}

//********** RESULT STUDENT INTERFACE **********
interface ResultStudent {
  submissionId: number;
  assessmentId: number;
  studentName: string;
  studentId: string;
  className: string;
  initials: string;
  email?: string;
  status: string;
  submittedAt?: string;
  timeTaken?: string;
  score: number;
  maxScore: number;
  answers: EssayAnswer[];
}

@Component({
  selector: 'app-assessments-result',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './assessments-result.html',
  styleUrl: './assessments-result.scss',
})
export class AssessmentsResult implements OnInit {
  //********** PRIVATE SERVICES **********
  private readonly assessmentService = inject(AssessmentService);
  private readonly submissionService = inject(SubmissionService);

  //********** VIEW CHILD REFERENCES **********
  @ViewChild('publishDialog')
  publishDialog?: ElementRef<HTMLElement>;

  @ViewChild('publishCancelButton')
  publishCancelButton?: ElementRef<HTMLButtonElement>;

  //********** PRIVATE VARIABLES **********
  private publishTrigger: HTMLElement | null = null;

  //********** PUBLIC STATE VARIABLES **********
  assessments: Assessment[] = [];

  selectedAssessmentId = 1;

  selectedStudent?: ResultStudent;

  showPublishDialog = false;

  successMessage = '';

  //********** RESULT STATES **********
  resultStates: AssessmentResult[] = [
    {
      assessmentId: 1,
      published: false,
      locked: false,
    },
    {
      assessmentId: 2,
      published: false,
      locked: false,
    },
    {
      assessmentId: 3,
      published: false,
      locked: false,
    },
    {
      assessmentId: 4,
      published: false,
      locked: false,
    },
    {
      assessmentId: 5,
      published: false,
      locked: false,
    },
  ];

  //********** LIFECYCLE **********
  ngOnInit(): void {
    this.loadAssessments();
  }

  //********** DATA LOADING **********
  private loadAssessments(): void {
    this.assessments = this.assessmentService.getAssessments();

    if (this.assessments.length === 0) {
      this.selectedAssessmentId = 0;
      return;
    }

    const selectedAssessmentExists = this.assessments.some(
      (assessment) => assessment.id === this.selectedAssessmentId,
    );

    if (!selectedAssessmentExists) {
      this.selectedAssessmentId = this.assessments[0].id;
    }
  }

  //********** SETTERS & GETTERS **********
  get students(): ResultStudent[] {
    const submissions = this.submissionService.getSubmissions(
      this.selectedAssessmentId,
    );

    return submissions.map((submission) =>
      this.mapSubmissionToResultStudent(submission),
    );
  }

  get selectedAssessment(): Assessment | undefined {
    return this.assessments.find(
      (assessment) => assessment.id === this.selectedAssessmentId,
    );
  }

  get currentResultState(): AssessmentResult {
    return (
      this.resultStates.find(
        (result) => result.assessmentId === this.selectedAssessmentId,
      ) ?? {
        assessmentId: this.selectedAssessmentId,
        published: false,
        locked: false,
      }
    );
  }

  //********** DATA MAPPING **********
  private mapSubmissionToResultStudent(
    submission: Submission,
  ): ResultStudent {
    return {
      submissionId: submission.id,
      assessmentId: submission.assessmentId,
      studentName: submission.studentName,
      studentId: submission.studentId,
      className: submission.className,
      initials: submission.initials,
      email: submission.email,
      status: submission.status,
      submittedAt: submission.submittedAt,
      timeTaken: submission.timeTaken,
      score: submission.score,
      maxScore: submission.maxScore,
      answers: submission.answers.map(
        (answer: SubmissionAnswer) => ({
          question: answer.question,
          answer: answer.answer,
          maxScore: answer.maxScore,
          score: answer.score,
          teacherComment: answer.teacherComment,
        }),
      ),
    };
  }

  //********** ACTION HANDLERS **********
  onAssessmentChange(): void {
    this.selectedStudent = undefined;
    this.successMessage = '';
  }

  onReviewAnswers(student: ResultStudent): void {
    this.selectedStudent = student;
    this.successMessage = '';
  }

  onCloseReview(): void {
    this.selectedStudent = undefined;
  }

  //********** SCORE HANDLERS **********
  onScoreChange(
    answer: EssayAnswer,
    value: number,
  ): void {
    if (this.currentResultState.locked) {
      return;
    }

    let score = Number(value);

    if (Number.isNaN(score)) {
      score = 0;
    }

    if (score < 0) {
      score = 0;
    }

    if (score > answer.maxScore) {
      score = answer.maxScore;
    }

    answer.score = score;

    this.calculateTotalScore();
  }

  calculateTotalScore(): void {
    if (!this.selectedStudent) {
      return;
    }

    const total = this.selectedStudent.answers.reduce(
      (sum, answer) => sum + Number(answer.score || 0),
      0,
    );

    this.selectedStudent.score = total;
  }

  //********** SAVE SCORE **********
  onSaveScore(): void {
    if (!this.selectedStudent) {
      return;
    }

    if (this.currentResultState.locked) {
      return;
    }

    this.calculateTotalScore();

    this.selectedStudent.answers.forEach(
      (answer, index) => {
        this.submissionService.updateAnswerScore(
          this.selectedAssessmentId,
          this.selectedStudent!.submissionId,
          index,
          answer.score,
        );
      },
    );

    this.submissionService.updateScore(
      this.selectedAssessmentId,
      this.selectedStudent.submissionId,
      this.selectedStudent.score,
    );

    this.successMessage = `Score for ${this.selectedStudent.studentName} has been saved.`;

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  //********** PUBLISH RESULT HANDLERS **********
  onPublish(event: Event): void {
    if (this.currentResultState.locked) {
      return;
    }

    if (this.currentResultState.published) {
      this.unpublishResult();
      return;
    }

    this.publishTrigger =
      event.currentTarget as HTMLElement;

    this.showPublishDialog = true;

    setTimeout(() => {
      this.publishDialog?.nativeElement.focus();
    });
  }

  confirmPublish(): void {
    const state = this.currentResultState;
    state.published = true;
    this.showPublishDialog = false;
    this.successMessage =
      'Assessment results have been published successfully.';

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);

    this.restorePublishTriggerFocus();
  }

  cancelPublish(): void {
    this.showPublishDialog = false;
    this.restorePublishTriggerFocus();
  }

  unpublishResult(): void {
    if (this.currentResultState.locked) {
      return;
    }

    this.currentResultState.published = false;

    this.successMessage =
      'Assessment results have been unpublished.';

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  //********** KEYBOARD HANDLERS **********
  @HostListener(
    'document:keydown',
    ['$event'],
  )
  onDialogKeydown(
    event: KeyboardEvent,
  ): void {
    if (!this.showPublishDialog) {
      return;
    }

    //********** ESCAPE TO CLOSE DIALOG **********
    if (event.key === 'Escape') {
      event.preventDefault();
      this.cancelPublish();
      return;
    }

    //********** FOCUS TRAP **********
    if (event.key !== 'Tab') {
      return;
    }

    const dialog =
      this.publishDialog?.nativeElement;

    if (!dialog) {
      return;
    }

    const focusableElements =
      dialog.querySelectorAll<HTMLElement>(
        'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])',
      );

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement =
      focusableElements[0];

    const lastElement =
      focusableElements[
        focusableElements.length - 1
      ];

    //********** SHIFT + TAB **********
    if (
      event.shiftKey &&
      document.activeElement === firstElement
    ) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    //********** TAB **********
    if (
      !event.shiftKey &&
      document.activeElement === lastElement
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  //********** RESULT LOCK HANDLER **********
  lockResult(): void {
    if (!this.currentResultState.published) {
      this.successMessage =
        'Publish the result before locking it.';

      setTimeout(() => {
        this.successMessage = '';
      }, 3000);

      return;
    }

    this.currentResultState.locked = true;

    this.successMessage =
      'Assessment result is now locked.';

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  //********** UTILITY METHODS **********
  private restorePublishTriggerFocus(): void {
    setTimeout(() => {
      this.publishTrigger?.focus();
      this.publishTrigger = null;
    });
  }

  statusClass(status: string): string {
    return `result-status result-status--${status
      .toLowerCase()
      .replaceAll(' ', '-')}`;
  }
}