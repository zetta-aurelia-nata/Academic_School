// ********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// ********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// ********** APPLICATION IMPORTS **********
import { StudentReview } from '../assessments-review-scoring/assessment-review-scoring.model';
import { ASSESSMENTS } from '../../assessment.data';

@Component({
  selector: 'app-assessments-detail',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './assessments-detail.html',
  styleUrls: ['./assessments-detail.scss'],
})
export class AssessmentsDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // ********** STUDENT DATA **********
  students: StudentReview[] = [
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
  ];

  // ********** SELECTED STUDENT **********
  student?: StudentReview;

  // ********** SELECTED ASSESSMENT **********
  assessment?: any;

  // ********** MOCK ANSWERS **********
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
    const assessmentId = Number(
      this.route.snapshot.paramMap.get('id'),
    );

    const studentId = Number(
      this.route.snapshot.paramMap.get('studentId'),
    );

    // ********** FIND ASSESSMENT **********
    this.assessment = ASSESSMENTS.find(
      (assessment) => assessment.id === assessmentId,
    );

    // ********** FIND STUDENT **********
    this.student = this.students.find(
      (student) => student.id === studentId,
    );
  }

  // ********** BACK TO STUDENT LIST **********
  onBack(): void {
    const assessmentId = this.route.snapshot.paramMap.get('id');

    this.router.navigate([
      '/assessments',
      assessmentId,
      'submissions',
    ]);
  }

  // ********** STATUS CLASS **********
  statusClass(status: string): string {
    return `review-status review-status--${status
      .toLowerCase()
      .replaceAll(' ', '-')}`;
  }
}