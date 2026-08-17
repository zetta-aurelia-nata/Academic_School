// ********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// ********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// ********** APPLICATION MODELS AND SETTINGS IMPORTS **********
import { ASSESSMENTS } from '../../assessment.data';
import { StudentReview } from '../assessments-review-scoring/assessment-review-scoring.model';

@Component({
  selector: 'app-assessments-detail',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './assessments-detail.html',
  styleUrls: ['./assessments-detail.scss'],
})
export class AssessmentsDetail {
  // ********** PRIVATE VARIABLES **********
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // ********** PUBLIC STATE VARIABLES **********
  assessment?: (typeof ASSESSMENTS)[number];

  isStudentDetail = false;

  studentsByAssessment: Record<number, StudentReview[]> = {
    1: [
      {
        id: 1,
        studentName: 'Alice Johnson',
        studentId: 'STU-001',
        className: 'Grade 10A',
        email: 'alice.johnson@school.com',
        initials: 'AJ',
        status: 'Completed',
        submittedAt: 'May 20, 2026 · 09:15 AM',
        timeTaken: '42 minutes',
        score: 92,
      },
      {
        id: 2,
        studentName: 'Bob Smith',
        studentId: 'STU-002',
        className: 'Grade 10A',
        email: 'bob.smith@school.com',
        initials: 'BS',
        status: 'Completed',
        submittedAt: 'May 20, 2026 · 09:32 AM',
        timeTaken: '48 minutes',
        score: 78,
      },
      {
        id: 3,
        studentName: 'Charlie Brown',
        studentId: 'STU-003',
        className: 'Grade 10A',
        email: 'charlie.brown@school.com',
        initials: 'CB',
        status: 'Completed',
        submittedAt: 'May 20, 2026 · 10:05 AM',
        timeTaken: '45 minutes',
        score: 88,
      },
      {
        id: 4,
        studentName: 'Diana Wilson',
        studentId: 'STU-004',
        className: 'Grade 10A',
        email: 'diana.wilson@school.com',
        initials: 'DW',
        status: 'In Progress',
        timeTaken: '31 minutes',
      },
      {
        id: 5,
        studentName: 'Ethan Davis',
        studentId: 'STU-005',
        className: 'Grade 10A',
        email: 'ethan.davis@school.com',
        initials: 'ED',
        status: 'Not Submitted',
      },
    ],

    2: [
      {
        id: 1,
        studentName: 'Emma Davis',
        studentId: 'STU-011',
        className: 'Grade 11A',
        email: 'emma.davis@school.com',
        initials: 'ED',
        status: 'Completed',
        submittedAt: 'May 19, 2026 · 08:45 AM',
        timeTaken: '55 minutes',
        score: 91,
      },
      {
        id: 2,
        studentName: 'Liam Wilson',
        studentId: 'STU-012',
        className: 'Grade 11A',
        email: 'liam.wilson@school.com',
        initials: 'LW',
        status: 'Completed',
        submittedAt: 'May 19, 2026 · 09:10 AM',
        timeTaken: '51 minutes',
        score: 84,
      },
      {
        id: 3,
        studentName: 'Olivia Brown',
        studentId: 'STU-013',
        className: 'Grade 11A',
        email: 'olivia.brown@school.com',
        initials: 'OB',
        status: 'Completed',
        submittedAt: 'May 19, 2026 · 09:42 AM',
        timeTaken: '58 minutes',
        score: 89,
      },
      {
        id: 4,
        studentName: 'Noah Miller',
        studentId: 'STU-014',
        className: 'Grade 11A',
        email: 'noah.miller@school.com',
        initials: 'NM',
        status: 'In Progress',
        timeTaken: '35 minutes',
      },
    ],

    3: [
      {
        id: 1,
        studentName: 'Sophia Taylor',
        studentId: 'STU-021',
        className: 'Grade 9A',
        email: 'sophia.taylor@school.com',
        initials: 'ST',
        status: 'Completed',
        submittedAt: 'May 18, 2026 · 08:20 AM',
        timeTaken: '40 minutes',
        score: 95,
      },
      {
        id: 2,
        studentName: 'James Anderson',
        studentId: 'STU-022',
        className: 'Grade 9A',
        email: 'james.anderson@school.com',
        initials: 'JA',
        status: 'Completed',
        submittedAt: 'May 18, 2026 · 08:45 AM',
        timeTaken: '43 minutes',
        score: 82,
      },
      {
        id: 3,
        studentName: 'Mia Thomas',
        studentId: 'STU-023',
        className: 'Grade 9A',
        email: 'mia.thomas@school.com',
        initials: 'MT',
        status: 'Completed',
        submittedAt: 'May 18, 2026 · 09:05 AM',
        timeTaken: '39 minutes',
        score: 90,
      },
    ],

    4: [
      {
        id: 1,
        studentName: 'William Jackson',
        studentId: 'STU-031',
        className: 'Grade 10B',
        email: 'william.jackson@school.com',
        initials: 'WJ',
        status: 'Completed',
        submittedAt: 'May 17, 2026 · 08:30 AM',
        timeTaken: '50 minutes',
        score: 76,
      },
      {
        id: 2,
        studentName: 'Isabella White',
        studentId: 'STU-032',
        className: 'Grade 10B',
        email: 'isabella.white@school.com',
        initials: 'IW',
        status: 'Completed',
        submittedAt: 'May 17, 2026 · 09:00 AM',
        timeTaken: '47 minutes',
        score: 87,
      },
    ],

    5: [
      {
        id: 1,
        studentName: 'Benjamin Harris',
        studentId: 'STU-041',
        className: 'Grade 10C',
        email: 'benjamin.harris@school.com',
        initials: 'BH',
        status: 'Completed',
        submittedAt: 'May 25, 2026 · 08:15 AM',
        timeTaken: '35 minutes',
        score: 93,
      },
      {
        id: 2,
        studentName: 'Charlotte Martin',
        studentId: 'STU-042',
        className: 'Grade 10C',
        email: 'charlotte.martin@school.com',
        initials: 'CM',
        status: 'In Progress',
        timeTaken: '25 minutes',
      },
    ],
  };

  students: StudentReview[] = [];

  student?: StudentReview;

  answers = [
    {
      question: 'What is 5 × 5?',
      answer: '25',
      score: 10,
      maxScore: 10,
    },
    {
      question: 'What is the square root of 81?',
      answer: '9',
      score: 10,
      maxScore: 10,
    },
    {
      question: 'Solve: 12 + 18',
      answer: '30',
      score: 10,
      maxScore: 10,
    },
    {
      question: 'What is 100 ÷ 4?',
      answer: '25',
      score: 10,
      maxScore: 10,
    },
    {
      question: 'Solve: 15 × 3',
      answer: '45',
      score: 8,
      maxScore: 10,
    },
  ];

  ngOnInit(): void {
    const assessmentId = Number(this.route.snapshot.paramMap.get('id'));
    const studentIdParam = this.route.snapshot.paramMap.get('studentId');

    // ********** INIT / LOAD DATA **********
    this.assessment = ASSESSMENTS.find(
      (assessment) => assessment.id === assessmentId,
    );

    this.students = this.studentsByAssessment[assessmentId] ?? [];

    this.isStudentDetail = studentIdParam !== null;

    if (studentIdParam !== null) {
      const studentId = Number(studentIdParam);

      this.student = this.students.find(
        (student) => student.id === studentId,
      );
    }
  }

  // ********** ACTION HANDLERS **********
  onStudentClick(student: StudentReview): void {
    const assessmentId = this.route.snapshot.paramMap.get('id');

    this.router.navigate([
      '/assessments',
      assessmentId,
      'submissions',
      student.id,
    ]);
  }

  onBack(): void {
    const assessmentId = this.route.snapshot.paramMap.get('id');

    if (this.isStudentDetail) {
      this.router.navigate([
        '/assessments',
        assessmentId,
        'submissions',
      ]);

      return;
    }

    this.router.navigate(['/assessments/review-scoring']);
  }

  // ********** UTILITY METHODS **********
  statusClass(status: string): string {
    return `review-status review-status--${status
      .toLowerCase()
      .replaceAll(' ', '-')}`;
  }
}