// ********** ANGULAR IMPORTS **********
import { Injectable } from '@angular/core';

// ********** APPLICATION MODELS **********
import { Submission, SubmissionAnswer } from '../models/submission.model';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  // ********** PRIVATE STATE **********
  private submissions: Submission[] = [
    {
      id: 1,
      assessmentId: 1,
      studentName: 'Alice Johnson',
      studentId: 'STU-001',
      className: 'Grade 10A',
      initials: 'AJ',
      email: 'alice.johnson@school.com',
      status: 'Completed',
      submittedAt: 'May 20, 2026 · 09:15 AM',
      timeTaken: '42 minutes',
      score: 92,
      maxScore: 100,
      answers: [
        {
          question: 'What is 5 × 5?',
          answer: '25',
          maxScore: 20,
          score: 20,
          teacherComment: '',
        },
        {
          question: 'What is the square root of 81?',
          answer: '9',
          maxScore: 20,
          score: 20,
          teacherComment: '',
        },
        {
          question: 'Solve: 12 + 18',
          answer: '30',
          maxScore: 20,
          score: 20,
          teacherComment: '',
        },
        {
          question: 'What is 100 ÷ 4?',
          answer: '25',
          maxScore: 20,
          score: 20,
          teacherComment: '',
        },
        {
          question: 'Solve: 15 × 3',
          answer: '45',
          maxScore: 20,
          score: 12,
          teacherComment: '',
        },
      ],
    },
    {
      id: 2,
      assessmentId: 1,
      studentName: 'Bob Smith',
      studentId: 'STU-002',
      className: 'Grade 10A',
      initials: 'BS',
      email: 'bob.smith@school.com',
      status: 'Completed',
      submittedAt: 'May 20, 2026 · 09:32 AM',
      timeTaken: '48 minutes',
      score: 78,
      maxScore: 100,
      answers: [
        {
          question: 'What is 5 × 5?',
          answer: '25',
          maxScore: 20,
          score: 20,
          teacherComment: '',
        },
        {
          question: 'What is the square root of 81?',
          answer: '8',
          maxScore: 20,
          score: 10,
          teacherComment: '',
        },
        {
          question: 'Solve: 12 + 18',
          answer: '30',
          maxScore: 20,
          score: 20,
          teacherComment: '',
        },
        {
          question: 'What is 100 ÷ 4?',
          answer: '20',
          maxScore: 20,
          score: 8,
          teacherComment: '',
        },
        {
          question: 'Solve: 15 × 3',
          answer: '40',
          maxScore: 20,
          score: 20,
          teacherComment: '',
        },
      ],
    },
    {
      id: 3,
      assessmentId: 1,
      studentName: 'Charlie Brown',
      studentId: 'STU-003',
      className: 'Grade 10A',
      initials: 'CB',
      email: 'charlie.brown@school.com',
      status: 'Completed',
      submittedAt: 'May 20, 2026 · 10:05 AM',
      timeTaken: '45 minutes',
      score: 88,
      maxScore: 100,
      answers: [
        {
          question: 'What is 5 × 5?',
          answer: '25',
          maxScore: 20,
          score: 20,
          teacherComment: '',
        },
        {
          question: 'What is the square root of 81?',
          answer: '9',
          maxScore: 20,
          score: 20,
          teacherComment: '',
        },
        {
          question: 'Solve: 12 + 18',
          answer: '30',
          maxScore: 20,
          score: 18,
          teacherComment: '',
        },
        {
          question: 'What is 100 ÷ 4?',
          answer: '25',
          maxScore: 20,
          score: 20,
          teacherComment: '',
        },
        {
          question: 'Solve: 15 × 3',
          answer: '45',
          maxScore: 20,
          score: 10,
          teacherComment: '',
        },
      ],
    },
    {
      id: 4,
      assessmentId: 1,
      studentName: 'Diana Wilson',
      studentId: 'STU-004',
      className: 'Grade 10A',
      initials: 'DW',
      email: 'diana.wilson@school.com',
      status: 'In Progress',
      score: 0,
      maxScore: 100,
      answers: [],
    },
    {
      id: 5,
      assessmentId: 1,
      studentName: 'Ethan Davis',
      studentId: 'STU-005',
      className: 'Grade 10A',
      initials: 'ED',
      email: 'ethan.davis@school.com',
      status: 'Not Submitted',
      score: 0,
      maxScore: 100,
      answers: [],
    },

    {
      id: 1,
      assessmentId: 2,
      studentName: 'Emma Davis',
      studentId: 'STU-011',
      className: 'Grade 11A',
      initials: 'ED',
      email: 'emma.davis@school.com',
      status: 'Completed',
      submittedAt: 'May 19, 2026 · 08:45 AM',
      timeTaken: '55 minutes',
      score: 85,
      maxScore: 100,
      answers: [
        {
          question: 'Explain the main theme of the story.',
          answer:
            'The story focuses on friendship, growth, and how people overcome challenges together.',
          maxScore: 25,
          score: 22,
          teacherComment: '',
        },
        {
          question: 'Describe the main character.',
          answer:
            'The main character is determined and learns from the challenges throughout the story.',
          maxScore: 25,
          score: 21,
          teacherComment: '',
        },
        {
          question: 'What lesson can be learned from the story?',
          answer:
            'The story teaches us that persistence and cooperation can help us overcome difficulties.',
          maxScore: 25,
          score: 22,
          teacherComment: '',
        },
        {
          question: 'Give your personal opinion about the story.',
          answer:
            'I think the story is meaningful because the characters develop through their experiences.',
          maxScore: 25,
          score: 20,
          teacherComment: '',
        },
      ],
    },
    {
      id: 2,
      assessmentId: 2,
      studentName: 'Liam Wilson',
      studentId: 'STU-012',
      className: 'Grade 11A',
      initials: 'LW',
      email: 'liam.wilson@school.com',
      status: 'Completed',
      submittedAt: 'May 19, 2026 · 09:10 AM',
      timeTaken: '51 minutes',
      score: 78,
      maxScore: 100,
      answers: [
        {
          question: 'Explain the main theme of the story.',
          answer: 'The story is about friendship and challenges.',
          maxScore: 25,
          score: 20,
          teacherComment: '',
        },
        {
          question: 'Describe the main character.',
          answer: 'The character is brave and kind.',
          maxScore: 25,
          score: 18,
          teacherComment: '',
        },
        {
          question: 'What lesson can be learned from the story?',
          answer: 'We should never give up.',
          maxScore: 25,
          score: 21,
          teacherComment: '',
        },
        {
          question: 'Give your personal opinion about the story.',
          answer: 'I enjoyed reading the story.',
          maxScore: 25,
          score: 19,
          teacherComment: '',
        },
      ],
    },
    {
      id: 3,
      assessmentId: 2,
      studentName: 'Olivia Brown',
      studentId: 'STU-013',
      className: 'Grade 11A',
      initials: 'OB',
      email: 'olivia.brown@school.com',
      status: 'Completed',
      submittedAt: 'May 19, 2026 · 09:42 AM',
      timeTaken: '58 minutes',
      score: 89,
      maxScore: 100,
      answers: [],
    },
    {
      id: 4,
      assessmentId: 2,
      studentName: 'Noah Miller',
      studentId: 'STU-014',
      className: 'Grade 11A',
      initials: 'NM',
      email: 'noah.miller@school.com',
      status: 'In Progress',
      score: 0,
      maxScore: 100,
      answers: [],
    },

    {
      id: 1,
      assessmentId: 3,
      studentName: 'Sophia Taylor',
      studentId: 'STU-021',
      className: 'Grade 9A',
      initials: 'ST',
      email: 'sophia.taylor@school.com',
      status: 'Completed',
      submittedAt: 'May 18, 2026 · 08:20 AM',
      timeTaken: '40 minutes',
      score: 95,
      maxScore: 100,
      answers: [],
    },
    {
      id: 2,
      assessmentId: 3,
      studentName: 'James Anderson',
      studentId: 'STU-022',
      className: 'Grade 9A',
      initials: 'JA',
      email: 'james.anderson@school.com',
      status: 'Completed',
      submittedAt: 'May 18, 2026 · 08:45 AM',
      timeTaken: '43 minutes',
      score: 82,
      maxScore: 100,
      answers: [],
    },
    {
      id: 3,
      assessmentId: 3,
      studentName: 'Mia Thomas',
      studentId: 'STU-023',
      className: 'Grade 9A',
      initials: 'MT',
      email: 'mia.thomas@school.com',
      status: 'Completed',
      submittedAt: 'May 18, 2026 · 09:05 AM',
      timeTaken: '39 minutes',
      score: 90,
      maxScore: 100,
      answers: [],
    },

    {
      id: 1,
      assessmentId: 4,
      studentName: 'William Jackson',
      studentId: 'STU-031',
      className: 'Grade 10B',
      initials: 'WJ',
      email: 'william.jackson@school.com',
      status: 'Completed',
      submittedAt: 'May 17, 2026 · 08:30 AM',
      timeTaken: '50 minutes',
      score: 76,
      maxScore: 100,
      answers: [],
    },
    {
      id: 2,
      assessmentId: 4,
      studentName: 'Isabella White',
      studentId: 'STU-032',
      className: 'Grade 10B',
      initials: 'IW',
      email: 'isabella.white@school.com',
      status: 'Completed',
      submittedAt: 'May 17, 2026 · 09:00 AM',
      timeTaken: '47 minutes',
      score: 87,
      maxScore: 100,
      answers: [],
    },

    {
      id: 1,
      assessmentId: 5,
      studentName: 'Benjamin Harris',
      studentId: 'STU-041',
      className: 'Grade 10C',
      initials: 'BH',
      email: 'benjamin.harris@school.com',
      status: 'Completed',
      submittedAt: 'May 25, 2026 · 08:15 AM',
      timeTaken: '35 minutes',
      score: 93,
      maxScore: 100,
      answers: [],
    },
    {
      id: 2,
      assessmentId: 5,
      studentName: 'Charlotte Martin',
      studentId: 'STU-042',
      className: 'Grade 10C',
      initials: 'CM',
      email: 'charlotte.martin@school.com',
      status: 'In Progress',
      score: 0,
      maxScore: 100,
      answers: [],
    },
  ];

  // ********** GETTERS **********
  getSubmissions(assessmentId: number): Submission[] {
    return this.submissions.filter((submission) => submission.assessmentId === assessmentId);
  }

  getSubmission(assessmentId: number, studentId: number): Submission | undefined {
    return this.submissions.find(
      (submission) => submission.assessmentId === assessmentId && submission.id === studentId,
    );
  }

  updateScore(assessmentId: number, studentId: number, score: number): void {
    const submission = this.getSubmission(assessmentId, studentId);

    if (!submission) {
      return;
    }

    submission.score = score;
  }

  updateAnswerScore(
    assessmentId: number,
    studentId: number,
    answerIndex: number,
    score: number,
  ): void {
    const submission = this.getSubmission(assessmentId, studentId);

    if (!submission || !submission.answers[answerIndex]) {
      return;
    }

    submission.answers[answerIndex].score = score;

    this.recalculateTotalScore(submission);
  }

  updateTeacherComment(
    assessmentId: number,
    studentId: number,
    answerIndex: number,
    comment: string,
  ): void {
    const submission = this.getSubmission(assessmentId, studentId);

    if (!submission || !submission.answers[answerIndex]) {
      return;
    }

    submission.answers[answerIndex].teacherComment = comment;
  }

  recalculateTotalScore(submission: Submission): void {
    submission.score = submission.answers.reduce(
      (total, answer) => total + Number(answer.score || 0),
      0,
    );
  }
}
