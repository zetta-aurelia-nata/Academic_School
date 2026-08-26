// ********** ANGULAR IMPORTS **********
import { Injectable } from '@angular/core';

// ********** APPLICATION MODELS **********
import { Submission, SubmissionAnswer } from '../models/submission.model';
import { AssessmentService } from './assessment.service';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  constructor(private readonly assessmentService: AssessmentService) {}
  // ********** PRIVATE STATE **********
  private submissions: Submission[] = [
    // ===== Assessment 1: Mathematics Quiz (MC 50 + Essay 50 = 100) =====
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
          maxScore: 50,
          score: 50,
          teacherComment: '',
        },
        {
          question: 'Explain the Pythagorean theorem and provide an example of its application.',
          answer:
            'The Pythagorean theorem states that in a right triangle, a² + b² = c², where c is the hypotenuse. For example, a triangle with legs 3 and 4 has a hypotenuse of 5.',
          maxScore: 50,
          score: 42,
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
          maxScore: 50,
          score: 50,
          teacherComment: '',
        },
        {
          question: 'Explain the Pythagorean theorem and provide an example of its application.',
          answer:
            'The theorem says the sides of a right triangle relate by squares. It helps find missing side lengths.',
          maxScore: 50,
          score: 28,
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
          maxScore: 50,
          score: 50,
          teacherComment: '',
        },
        {
          question: 'Explain the Pythagorean theorem and provide an example of its application.',
          answer:
            'The Pythagorean theorem relates the sides of a right triangle: a² + b² = c². It is used to calculate distances, such as finding the diagonal of a rectangle.',
          maxScore: 50,
          score: 38,
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

    // ===== Assessment 2: English Literature Essay (Essay 50 + Essay 30 = 80) =====
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
      score: 66,
      maxScore: 80,
      answers: [
        {
          question:
            'Analyze the main theme of the novel and discuss how the author develops it throughout the story.',
          answer:
            "The novel explores themes of friendship, growth, and resilience. The author develops this through the protagonist's evolving relationships and the challenges she overcomes throughout the plot.",
          maxScore: 50,
          score: 42,
          teacherComment: '',
        },
        {
          question: 'Compare and contrast the protagonist and antagonist of the story.',
          answer:
            "The protagonist is compassionate and determined, while the antagonist is selfish and manipulative. Their conflicting values drive much of the story's tension.",
          maxScore: 30,
          score: 24,
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
      score: 55,
      maxScore: 80,
      answers: [
        {
          question:
            'Analyze the main theme of the novel and discuss how the author develops it throughout the story.',
          answer: 'The story is mainly about friendship and overcoming challenges together.',
          maxScore: 50,
          score: 35,
          teacherComment: '',
        },
        {
          question: 'Compare and contrast the protagonist and antagonist of the story.',
          answer: 'The main character is brave while the antagonist is cruel and selfish.',
          maxScore: 30,
          score: 20,
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
      score: 70,
      maxScore: 80,
      answers: [
        {
          question:
            'Analyze the main theme of the novel and discuss how the author develops it throughout the story.',
          answer:
            "The theme centers on perseverance, shown through the protagonist's growth across the story's major turning points.",
          maxScore: 50,
          score: 44,
          teacherComment: '',
        },
        {
          question: 'Compare and contrast the protagonist and antagonist of the story.',
          answer:
            "The protagonist values honesty and cooperation, in contrast to the antagonist's deceit and self-interest.",
          maxScore: 30,
          score: 26,
          teacherComment: '',
        },
      ],
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
      maxScore: 80,
      answers: [],
    },

    // ===== Assessment 3: Science Chapter 5 Test (MC 10 + Essay 20 = 30) =====
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
      score: 29,
      maxScore: 30,
      answers: [
        {
          question: 'Which organelle is responsible for producing energy in a cell?',
          answer: 'Mitochondria',
          maxScore: 10,
          score: 10,
          teacherComment: '',
        },
        {
          question: 'Describe the process of photosynthesis and its importance to living organisms.',
          answer:
            'Photosynthesis is the process by which plants convert sunlight, water, and carbon dioxide into glucose and oxygen. It is essential because it provides energy and oxygen for most living organisms.',
          maxScore: 20,
          score: 19,
          teacherComment: '',
        },
      ],
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
      score: 24,
      maxScore: 30,
      answers: [
        {
          question: 'Which organelle is responsible for producing energy in a cell?',
          answer: 'Mitochondria',
          maxScore: 10,
          score: 10,
          teacherComment: '',
        },
        {
          question: 'Describe the process of photosynthesis and its importance to living organisms.',
          answer:
            'Photosynthesis lets plants make food from sunlight. It produces oxygen that living things need to breathe.',
          maxScore: 20,
          score: 14,
          teacherComment: '',
        },
      ],
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
      score: 28,
      maxScore: 30,
      answers: [
        {
          question: 'Which organelle is responsible for producing energy in a cell?',
          answer: 'Mitochondria',
          maxScore: 10,
          score: 10,
          teacherComment: '',
        },
        {
          question: 'Describe the process of photosynthesis and its importance to living organisms.',
          answer:
            'Photosynthesis converts light energy into chemical energy stored in glucose, releasing oxygen as a byproduct. It sustains the food chain for nearly all life on Earth.',
          maxScore: 20,
          score: 18,
          teacherComment: '',
        },
      ],
    },

    // ===== Assessment 4: History Midterm (MC 15 + MC 10 = 25, fully auto-scored) =====
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
      score: 15,
      maxScore: 25,
      answers: [
        {
          question: 'Which event is considered the immediate cause of World War I?',
          answer: 'The assassination of Archduke Franz Ferdinand',
          maxScore: 15,
          score: 15,
          teacherComment: '',
        },
        {
          question: 'Which alliance did Germany belong to before World War I?',
          answer: 'Warsaw Pact',
          maxScore: 10,
          score: 0,
          teacherComment: '',
        },
      ],
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
      score: 25,
      maxScore: 25,
      answers: [
        {
          question: 'Which event is considered the immediate cause of World War I?',
          answer: 'The assassination of Archduke Franz Ferdinand',
          maxScore: 15,
          score: 15,
          teacherComment: '',
        },
        {
          question: 'Which alliance did Germany belong to before World War I?',
          answer: 'Triple Alliance',
          maxScore: 10,
          score: 10,
          teacherComment: '',
        },
      ],
    },

    // ===== Assessment 5: Biology Chapter 3 Quiz (MC 10 + Essay 20 = 30) =====
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
      score: 29,
      maxScore: 30,
      answers: [
        {
          question: 'What is the basic functional unit of the kidney?',
          answer: 'Nephron',
          maxScore: 10,
          score: 10,
          teacherComment: '',
        },
        {
          question: 'Explain the difference between mitosis and meiosis.',
          answer:
            'Mitosis produces two identical diploid cells for growth and repair, while meiosis produces four genetically varied haploid cells for reproduction.',
          maxScore: 20,
          score: 19,
          teacherComment: '',
        },
      ],
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
      maxScore: 30,
      answers: [],
    },
  ];

  // ********** GETTERS **********
  getSubmissions(assessmentId: number): Submission[] {
    return this.submissions
      .filter((submission) => submission.assessmentId === assessmentId)
      .map((submission) => this.syncSubmissionWithAssessmentQuestions(submission));
  }

  getSubmission(assessmentId: number, studentId: number): Submission | undefined {
    const submission = this.submissions.find(
      (item) => item.assessmentId === assessmentId && item.id === studentId,
    );

    return submission ? this.syncSubmissionWithAssessmentQuestions(submission) : undefined;
  }

  private syncSubmissionWithAssessmentQuestions(submission: Submission): Submission {
    const questions =
      this.assessmentService.getAssessmentById(submission.assessmentId)?.questions ?? [];

    if (questions.length === 0) {
      return { ...submission, answers: [...submission.answers] };
    }

    const answers = questions.map((question: Question) => {
      const existing = submission.answers.find((answer) => answer.question === question.text);

      const answerText =
        existing?.answer ??
        (question.type === 'multiple_choice' ? (question.options?.[0]?.text ?? '-') : '-');

      return {
        question: question.text,
        answer: answerText,
        maxScore: question.points,
        // MC selalu di-auto-score dari correctness; essay pakai skor terakhir yang disimpan teacher.
        score: this.computeAnswerScore(question, answerText, existing?.score),
        teacherComment: existing?.teacherComment ?? '',
      };
    });

    const score = answers.reduce((sum, answer) => sum + Number(answer.score || 0), 0);

    return {
      ...submission,
      answers,
      score,
      maxScore: questions.reduce((sum, question) => sum + question.points, 0),
    };
  }

  private computeAnswerScore(
    question: Question,
    answerText: string,
    existingScore?: number,
  ): number {
    if (question.type === 'multiple_choice') {
      const correctOption = (question.options ?? []).find((option) => option.isCorrect);
      return correctOption && answerText === correctOption.text ? question.points : 0;
    }

    return Number(existingScore ?? 0);
  }

  updateScore(assessmentId: number, studentId: number, score: number): void {
    const idx = this.submissions.findIndex(
      (s) => s.assessmentId === assessmentId && s.id === studentId,
    );
    if (idx === -1) return;
    this.submissions = [
      ...this.submissions.slice(0, idx),
      { ...this.submissions[idx], score },
      ...this.submissions.slice(idx + 1),
    ];
  }

  // In SubmissionService:
  updateAnswerScore(
    assessmentId: number,
    studentId: number,
    questionIndex: number,
    score: number,
  ): void {
    const idx = this.submissions.findIndex(
      (s) => s.assessmentId === assessmentId && s.id === studentId,
    );
    if (idx === -1) return;

    const targetSubmission = this.submissions[idx];
    const updatedAnswers = [...targetSubmission.answers];

    if (updatedAnswers[questionIndex]) {
      updatedAnswers[questionIndex] = {
        ...updatedAnswers[questionIndex],
        score,
      };
    }

    this.submissions = [
      ...this.submissions.slice(0, idx),
      { ...targetSubmission, answers: updatedAnswers },
      ...this.submissions.slice(idx + 1),
    ];
  }

  updateAnswerScoreByQuestion(
    assessmentId: number,
    studentId: number,
    question: string,
    score: number,
  ): void {
    const idx = this.submissions.findIndex(
      (s) => s.assessmentId === assessmentId && s.id === studentId,
    );
    if (idx === -1) return;

    const target = this.submissions[idx];
    const answers = target.answers.map((answer) =>
      answer.question === question ? { ...answer, score } : answer,
    );

    this.submissions = [
      ...this.submissions.slice(0, idx),
      { ...target, answers },
      ...this.submissions.slice(idx + 1),
    ];
  }

  updateTeacherCommentByQuestion(
    assessmentId: number,
    studentId: number,
    question: string,
    comment: string,
  ): void {
    const idx = this.submissions.findIndex(
      (s) => s.assessmentId === assessmentId && s.id === studentId,
    );
    if (idx === -1) return;

    const target = this.submissions[idx];
    const answers = target.answers.map((answer) =>
      answer.question === question ? { ...answer, teacherComment: comment } : answer,
    );

    this.submissions = [
      ...this.submissions.slice(0, idx),
      { ...target, answers },
      ...this.submissions.slice(idx + 1),
    ];
  }

  updateTeacherComment(
    assessmentId: number,
    studentId: number,
    answerIndex: number,
    comment: string,
  ): void {
    const idx = this.submissions.findIndex(
      (s) => s.assessmentId === assessmentId && s.id === studentId,
    );
    if (idx === -1) return;

    const targetSubmission = this.submissions[idx];
    const updatedAnswers = targetSubmission.answers.map((ans, index) =>
      index === answerIndex ? { ...ans, teacherComment: comment } : ans,
    );

    this.submissions = [
      ...this.submissions.slice(0, idx),
      { ...targetSubmission, answers: updatedAnswers },
      ...this.submissions.slice(idx + 1),
    ];
  }

  recalculateTotalScore(submission: Submission): number {
    return submission.answers.reduce((total, answer) => total + Number(answer.score || 0), 0);
  }
}
