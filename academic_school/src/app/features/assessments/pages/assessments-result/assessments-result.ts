//********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

//********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

//********** APPLICATION IMPORTS **********
import { AssessmentService } from '../../services/assessment.service';
import { SubmissionService } from '../../services/submission.service';
import { Submission } from '../../models/submission.model';
import { Question } from '../../models/question.model';
import { Assessment } from '../assessments-list/assessment.list.model';

//********** INTERFACES **********
interface AssessmentResult {
  assessmentId: number;
  published: boolean;
  locked: boolean;
}

interface ResultAnswer {
  question: string;
  type: 'essay' | 'multiple_choice';
  answer: string;
  maxScore: number;
  score: number;
  teacherComment: string;
  options: { text: string; isCorrect: boolean }[];
  correctAnswer?: string;
}

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
  answers: ResultAnswer[];
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
  private readonly assessmentService = inject(AssessmentService);
  private readonly submissionService = inject(SubmissionService);

  @ViewChild('publishDialog') publishDialog?: ElementRef<HTMLElement>;

  private publishTrigger: HTMLElement | null = null;

  assessments: Assessment[] = [];
  selectedAssessmentId = 1;
  selectedStudent?: ResultStudent;
  showPublishDialog = false;
  successMessage = '';
  scoreJustSaved = false;
  resultStates: AssessmentResult[] = [];

  //********** LIFECYCLE HOOKS **********
  ngOnInit(): void {
    this.loadAssessments();
  }

  private loadAssessments(): void {
    this.assessments = this.assessmentService.getAssessments();

    this.resultStates = this.assessments.map((assessment) => ({
      assessmentId: assessment.id,
      published: false,
      locked: false,
    }));

    if (!this.assessments.some((assessment) => assessment.id === this.selectedAssessmentId)) {
      this.selectedAssessmentId = this.assessments[0]?.id ?? 0;
    }
  }

  //********** SETTER & GETTER **********
  get selectedAssessment(): Assessment | undefined {
    return this.assessments.find((assessment) => assessment.id === this.selectedAssessmentId);
  }

  get students(): ResultStudent[] {
    return this.submissionService
      .getSubmissions(this.selectedAssessmentId)
      .map((submission) => this.mapSubmissionToResultStudent(submission));
  }

  get essayAnswers(): ResultAnswer[] {
    return this.selectedStudent?.answers.filter((answer) => answer.type === 'essay') ?? [];
  }

  get currentResultState(): AssessmentResult {
    return (
      this.resultStates.find((state) => state.assessmentId === this.selectedAssessmentId) ?? {
        assessmentId: this.selectedAssessmentId,
        published: false,
        locked: false,
      }
    );
  }

  private mapSubmissionToResultStudent(submission: Submission): ResultStudent {
    const questions = this.selectedAssessment?.questions ?? [];

    const answers: ResultAnswer[] = questions.map((question: Question) => {
      const submitted = submission.answers.find((answer) => answer.question === question.text);

      const options = question.options ?? [];
      const answerText = submitted?.answer ?? '-';
      const isMultipleChoice = question.type === 'multiple_choice';

      const isCorrect =
        isMultipleChoice && options.length > 0
          ? answerText === options.find((option) => option.isCorrect)?.text
          : false;

      return {
        question: question.text,
        type: question.type,
        answer: answerText,
        maxScore: question.points,
        score: isMultipleChoice ? (isCorrect ? question.points : 0) : Number(submitted?.score ?? 0),
        teacherComment: submitted?.teacherComment ?? '',
        options,
        correctAnswer: options.find((option) => option.isCorrect)?.text,
      };
    });

    const score = answers.reduce((total, answer) => total + answer.score, 0);
    const maxScore = questions.reduce((total, question) => total + question.points, 0);

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
      score,
      maxScore,
      answers,
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

  onScoreChange(answer: ResultAnswer, value: number): void {
    if (this.currentResultState.locked || answer.type !== 'essay' || !this.selectedStudent) return;

    let score = Number(value);
    if (Number.isNaN(score)) score = 0;

    score = Math.min(Math.max(score, 0), answer.maxScore);

    answer.score = score;
    this.calculateTotalScore();
  }

  calculateTotalScore(): void {
    if (!this.selectedStudent) return;
    this.selectedStudent.score = this.selectedStudent.answers.reduce(
      (sum, answer) => sum + Number(answer.score || 0),
      0,
    );
  }

  onSaveScore(): void {
    if (!this.selectedStudent || this.currentResultState.locked) return;

    this.calculateTotalScore();

    const submissionID = this.selectedStudent.submissionId;

    this.selectedStudent.answers.forEach((answer) => {
      if (answer.type !== 'essay') return;

      this.submissionService.updateAnswerScoreByQuestion(
        this.selectedAssessmentId,
        submissionID,
        answer.question,
        answer.score,
      );

      this.submissionService.updateTeacherCommentByQuestion(
        this.selectedAssessmentId,
        submissionID,
        answer.question,
        answer.teacherComment,
      );
    });

    this.submissionService.updateScore(
      this.selectedAssessmentId,
      submissionID,
      this.selectedStudent.score,
    );

    const upatedSubmission = this.submissionService.getSubmission(
      this.selectedAssessmentId,
      submissionID,
    );

    if (upatedSubmission) {
      this.selectedStudent = this.mapSubmissionToResultStudent(upatedSubmission);
    }

    this.successMessage = `Score for ${this.selectedStudent.studentName} has been saved.`;
    this.scoreJustSaved = true;

    setTimeout(() => (this.successMessage = ''), 3000);
    setTimeout(() => (this.scoreJustSaved = false), 2000);
  }

  onPublish(event: Event): void {
    if (this.currentResultState.locked) return;

    if (this.currentResultState.published) {
      this.unpublishResult();
      return;
    }

    this.publishTrigger = event.currentTarget as HTMLElement;
    this.showPublishDialog = true;

    setTimeout(() => this.publishDialog?.nativeElement.focus());
  }

  confirmPublish(): void {
    this.resultStates = this.resultStates.map((state) =>
      state.assessmentId === this.selectedAssessmentId ? { ...state, published: true } : state,
    );
    this.showPublishDialog = false;
    this.successMessage = 'Assessment results have been published successfully.';
    setTimeout(() => (this.successMessage = ''), 3000);
    this.restorePublishTriggerFocus();
  }

  cancelPublish(): void {
    this.showPublishDialog = false;
    this.restorePublishTriggerFocus();
  }

  unpublishResult(): void {
    this.resultStates = this.resultStates.map((state) =>
      state.assessmentId === this.selectedAssessmentId ? { ...state, published: false } : state,
    );
    this.successMessage = 'Assessment results have been unpublished.';
    setTimeout(() => (this.successMessage = ''), 3000);
  }

  lockResult(): void {
    if (!this.currentResultState.published) {
      this.successMessage = 'Publish the result before locking it.';
      setTimeout(() => (this.successMessage = ''), 3000);
      return;
    }

    this.resultStates = this.resultStates.map((state) =>
      state.assessmentId === this.selectedAssessmentId ? { ...state, locked: true } : state,
    );

    this.successMessage = 'Assessment result is now locked.';
    setTimeout(() => (this.successMessage = ''), 3000);
  }

  @HostListener('document:keydown', ['$event'])
  onDialogKeydown(event: KeyboardEvent): void {
    if (!this.showPublishDialog) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.cancelPublish();
      return;
    }

    if (event.key !== 'Tab') return;

    const dialog = this.publishDialog?.nativeElement;
    if (!dialog) return;

    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])',
    );

    if (!focusable.length) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private restorePublishTriggerFocus(): void {
    setTimeout(() => {
      this.publishTrigger?.focus();
      this.publishTrigger = null;
    });
  }

  statusClass(status: string): string {
    return `result-status result-status--${status.toLowerCase().replaceAll(' ', '-')}`;
  }
}
