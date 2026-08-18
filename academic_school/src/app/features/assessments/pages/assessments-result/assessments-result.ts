//********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

//********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

//********** APPLICATION MODELS AND SETTINGS IMPORTS **********
import { ASSESSMENTS } from '../../assessment.data';
import { Assessment } from '../assessments-list/assessment.list.model';

interface EssayAnswer {
  question: string;
  answer: string;
  maxScore: number;
  score: number;
}

interface ResultStudent {
  id: number;
  studentName: string;
  studentId: string;
  className: string;
  initials: string;
  status: 'Completed' | 'Not Submitted' | 'In Progress';
  score: number;
  maxScore: number;
  answers: EssayAnswer[];
}

interface AssessmentResult {
  assessmentId: number;
  published: boolean;
  locked: boolean;
}

@Component({
  selector: 'app-assessments-result',
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
export class AssessmentsResult {
  //********** VIEW CHILD REFERENCES **********
  @ViewChild('publishDialog')
  publishDialog?: ElementRef<HTMLElement>;

  @ViewChild('publishCancelButton')
  publishCancelButton?: ElementRef<HTMLButtonElement>;

  //********** PRIVATE VARIABLES **********
  private publishTrigger: HTMLElement | null = null;

  //********** PUBLIC STATE VARIABLES **********
  assessments: Assessment[] = ASSESSMENTS;

  selectedAssessmentId = 1;

  studentsByAssessment: Record<number, ResultStudent[]> = {
    1: [
      {
        id: 1,
        studentName: 'Alice Johnson',
        studentId: 'STU-001',
        className: 'Grade 10A',
        initials: 'AJ',
        status: 'Completed',
        score: 92,
        maxScore: 100,
        answers: [
          {
            question: 'What is 5 × 5?',
            answer: '25',
            maxScore: 20,
            score: 20,
          },
          {
            question: 'What is the square root of 81?',
            answer: '9',
            maxScore: 20,
            score: 20,
          },
          {
            question: 'Solve: 12 + 18',
            answer: '30',
            maxScore: 20,
            score: 20,
          },
          {
            question: 'What is 100 ÷ 4?',
            answer: '25',
            maxScore: 20,
            score: 20,
          },
          {
            question: 'Solve: 15 × 3',
            answer: '45',
            maxScore: 20,
            score: 12,
          },
        ],
      },
      {
        id: 2,
        studentName: 'Bob Smith',
        studentId: 'STU-002',
        className: 'Grade 10A',
        initials: 'BS',
        status: 'Completed',
        score: 78,
        maxScore: 100,
        answers: [
          {
            question: 'What is 5 × 5?',
            answer: '25',
            maxScore: 20,
            score: 20,
          },
          {
            question: 'What is the square root of 81?',
            answer: '8',
            maxScore: 20,
            score: 10,
          },
          {
            question: 'Solve: 12 + 18',
            answer: '30',
            maxScore: 20,
            score: 20,
          },
          {
            question: 'What is 100 ÷ 4?',
            answer: '20',
            maxScore: 20,
            score: 8,
          },
          {
            question: 'Solve: 15 × 3',
            answer: '40',
            maxScore: 20,
            score: 20,
          },
        ],
      },
      {
        id: 3,
        studentName: 'Charlie Brown',
        studentId: 'STU-003',
        className: 'Grade 10A',
        initials: 'CB',
        status: 'Completed',
        score: 88,
        maxScore: 100,
        answers: [
          {
            question: 'What is 5 × 5?',
            answer: '25',
            maxScore: 20,
            score: 20,
          },
          {
            question: 'What is the square root of 81?',
            answer: '9',
            maxScore: 20,
            score: 20,
          },
          {
            question: 'Solve: 12 + 18',
            answer: '30',
            maxScore: 20,
            score: 18,
          },
          {
            question: 'What is 100 ÷ 4?',
            answer: '25',
            maxScore: 20,
            score: 20,
          },
          {
            question: 'Solve: 15 × 3',
            answer: '45',
            maxScore: 20,
            score: 10,
          },
        ],
      },
      {
        id: 4,
        studentName: 'Diana Wilson',
        studentId: 'STU-004',
        className: 'Grade 10A',
        initials: 'DW',
        status: 'In Progress',
        score: 0,
        maxScore: 100,
        answers: [],
      },
    ],

    2: [
      {
        id: 1,
        studentName: 'Emma Davis',
        studentId: 'STU-011',
        className: 'Grade 11A',
        initials: 'ED',
        status: 'Completed',
        score: 85,
        maxScore: 100,
        answers: [
          {
            question: 'Explain the main theme of the story.',
            answer:
              'The story focuses on friendship, growth, and how people overcome challenges together.',
            maxScore: 25,
            score: 22,
          },
          {
            question: 'Describe the main character.',
            answer:
              'The main character is determined and learns from the challenges throughout the story.',
            maxScore: 25,
            score: 21,
          },
          {
            question: 'What lesson can be learned from the story?',
            answer:
              'The story teaches us that persistence and cooperation can help us overcome difficulties.',
            maxScore: 25,
            score: 22,
          },
          {
            question: 'Give your personal opinion about the story.',
            answer:
              'I think the story is meaningful because the characters develop through their experiences.',
            maxScore: 25,
            score: 20,
          },
        ],
      },
      {
        id: 2,
        studentName: 'Liam Wilson',
        studentId: 'STU-012',
        className: 'Grade 11A',
        initials: 'LW',
        status: 'Completed',
        score: 78,
        maxScore: 100,
        answers: [
          {
            question: 'Explain the main theme of the story.',
            answer: 'The story is about friendship and challenges.',
            maxScore: 25,
            score: 20,
          },
          {
            question: 'Describe the main character.',
            answer: 'The character is brave and kind.',
            maxScore: 25,
            score: 18,
          },
          {
            question: 'What lesson can be learned from the story?',
            answer: 'We should never give up.',
            maxScore: 25,
            score: 21,
          },
          {
            question: 'Give your personal opinion about the story.',
            answer: 'I enjoyed reading the story.',
            maxScore: 25,
            score: 19,
          },
        ],
      },
    ],

    3: [
      {
        id: 1,
        studentName: 'Sophia Taylor',
        studentId: 'STU-021',
        className: 'Grade 9A',
        initials: 'ST',
        status: 'Completed',
        score: 95,
        maxScore: 100,
        answers: [],
      },
      {
        id: 2,
        studentName: 'James Anderson',
        studentId: 'STU-022',
        className: 'Grade 9A',
        initials: 'JA',
        status: 'Completed',
        score: 82,
        maxScore: 100,
        answers: [],
      },
    ],

    4: [
      {
        id: 1,
        studentName: 'William Jackson',
        studentId: 'STU-031',
        className: 'Grade 10B',
        initials: 'WJ',
        status: 'Completed',
        score: 76,
        maxScore: 100,
        answers: [],
      },
      {
        id: 2,
        studentName: 'Isabella White',
        studentId: 'STU-032',
        className: 'Grade 10B',
        initials: 'IW',
        status: 'Completed',
        score: 87,
        maxScore: 100,
        answers: [],
      },
    ],

    5: [
      {
        id: 1,
        studentName: 'Benjamin Harris',
        studentId: 'STU-041',
        className: 'Grade 10C',
        initials: 'BH',
        status: 'Completed',
        score: 93,
        maxScore: 100,
        answers: [],
      },
      {
        id: 2,
        studentName: 'Charlotte Martin',
        studentId: 'STU-042',
        className: 'Grade 10C',
        initials: 'CM',
        status: 'In Progress',
        score: 0,
        maxScore: 100,
        answers: [],
      },
    ],
  };

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

  selectedStudent?: ResultStudent;

  showPublishDialog = false;

  successMessage = '';

  //********** SETTERS & GETTERS **********
  get students(): ResultStudent[] {
    return this.studentsByAssessment[this.selectedAssessmentId] ?? [];
  }

  get selectedAssessment(): Assessment | undefined {
    return this.assessments.find((assessment) => assessment.id === this.selectedAssessmentId);
  }

  get currentResultState(): AssessmentResult {
    return (
      this.resultStates.find((result) => result.assessmentId === this.selectedAssessmentId) ?? {
        assessmentId: this.selectedAssessmentId,
        published: false,
        locked: false,
      }
    );
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

  onScoreChange(answer: EssayAnswer, value: number): void {
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
      (sum, answer) => sum + Number(answer.score),
      0,
    );

    this.selectedStudent.score = total;
  }

  onSaveScore(): void {
    if (!this.selectedStudent) {
      return;
    }

    if (this.currentResultState.locked) {
      return;
    }

    this.calculateTotalScore();

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

    this.publishTrigger = event.currentTarget as HTMLElement;

    this.showPublishDialog = true;

    setTimeout(() => {
      this.publishDialog?.nativeElement.focus();
    });
  }

  confirmPublish(): void {
    const state = this.currentResultState;

    state.published = true;

    this.showPublishDialog = false;

    this.successMessage = 'Assessment results have been published successfully.';

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

    this.successMessage = 'Assessment results have been unpublished.';

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  //********** KEYBOARD HANDLERS **********
  @HostListener('document:keydown', ['$event'])
  onDialogKeydown(event: KeyboardEvent): void {
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

    const dialog = this.publishDialog?.nativeElement;

    if (!dialog) {
      return;
    }

    const focusableElements = dialog.querySelectorAll<HTMLElement>(
      'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    //********** SHIFT + TAB **********
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    //********** TAB **********
    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  //********** RESULT LOCK HANDLER **********
  lockResult(): void {
    if (!this.currentResultState.published) {
      this.successMessage = 'Publish the result before locking it.';

      setTimeout(() => {
        this.successMessage = '';
      }, 3000);

      return;
    }

    this.currentResultState.locked = true;

    this.successMessage = 'Assessment result is now locked.';

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
    return `result-status result-status--${status.toLowerCase().replaceAll(' ', '-')}`;
  }
}
