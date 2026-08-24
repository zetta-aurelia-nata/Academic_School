// ********** ANGULAR IMPORTS **********
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// ********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// ********** APPLICATION MODELS AND SETTINGS IMPORTS **********
import { Assessment } from '../assessments-list/assessment.list.model';
import { AssessmentService } from '../../services/assessment.service';
import { SubmissionService } from '../../services/submission.service';
import { Submission, SubmissionAnswer } from '../../models/submission.model';
import { Question } from '../../models/question.model';

// ********** INTERFACES **********
interface StudentReview {
  id: number;
  studentName: string;
  studentId: string;
  className: string;
  email: string;
  initials: string;
  status: string;
  submittedAt?: string;
  timeTaken?: string;
  score?: number;
}

interface AnswerReview {
  question: string;
  answer: string;
  score: number;
  maxScore: number;
}

@Component({
  selector: 'app-assessments-detail',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './assessments-detail.html',
  styleUrls: ['./assessments-detail.scss'],
})
export class AssessmentsDetail implements OnInit {
  // ********** PRIVATE VARIABLES **********
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly assessmentService = inject(AssessmentService);
  private readonly submissionService = inject(SubmissionService);

  // ********** PUBLIC STATE VARIABLES **********
  assessment?: Assessment;
  isStudentDetail = false;
  searchQuery = '';
  students: StudentReview[] = [];
  filteredStudents: StudentReview[] = [];
  student?: StudentReview;
  answers: AnswerReview[] = [];

  // ********** LIFECYCLE HOOKS **********
  ngOnInit(): void {
    const assessmentId = Number(this.route.snapshot.paramMap.get('id'));
    const studentIdParam = this.route.snapshot.paramMap.get('studentId');

    // ********** LOAD DATA / INIT **********
    this.assessment = this.assessmentService.getAssessmentById(assessmentId);

    const submissions = this.submissionService.getSubmissions(assessmentId);
    this.students = submissions.map((submission) => this.mapSubmissionToStudentReview(submission));
    this.filteredStudents = [...this.students];
    this.isStudentDetail = studentIdParam !== null;

    if (studentIdParam !== null) {
      const studentId = Number(studentIdParam);
      const submission = submissions.find((s) => s.id === studentId);

      if (submission) {
        this.student = this.mapSubmissionToStudentReview(submission);
        const essayQuestions = (this.assessment?.questions ?? []).filter(
          (question: Question) => question.type === 'essay',
        );

        this.answers = essayQuestions.map((question: Question) => {
          const submittedAnswer = submission.answers.find(
            (answer: SubmissionAnswer) => answer.question === question.text,
          );

          return {
            question: question.text,
            answer: submittedAnswer?.answer ?? '-',
            score: submittedAnswer?.score ?? 0,
            maxScore: question.points,
          };
        });
      }
    }
  }

  // ********** DATA MAPPING **********
  private mapSubmissionToStudentReview(submission: Submission): StudentReview {
    return {
      id: submission.id,
      studentName: submission.studentName,
      studentId: submission.studentId,
      className: submission.className,
      email: submission.email ?? '',
      initials: submission.initials,
      status: submission.status,
      submittedAt: submission.submittedAt,
      timeTaken: submission.timeTaken,
      score: submission.score,
    };
  }

  // ********** ACTION HANDLER **********
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.filterStudents();
  }

  private filterStudents(): void {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      this.filteredStudents = [...this.students];
      return;
    }

    this.filteredStudents = this.students.filter((student) => {
      return (
        student.studentName.toLowerCase().includes(query) ||
        student.studentId.toLowerCase().includes(query) ||
        student.className.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.status.toLowerCase().includes(query)
      );
    });
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filteredStudents = [...this.students];
  }

  // ********** ACTION HANDLERS **********
  onStudentClick(student: StudentReview): void {
    const assessmentId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/assessments', assessmentId, 'submissions', student.id]);
  }

  onBack(): void {
    const assessmentId = this.route.snapshot.paramMap.get('id');
    if (this.isStudentDetail) {
      this.router.navigate(['/assessments', assessmentId, 'submissions']);
      return;
    }
    this.router.navigate(['/assessments/review-scoring']);
  }

  // ********** UTILITY METHODS **********
  statusClass(status: string): string {
    return `review-status review-status--${status.toLowerCase().replaceAll(' ', '-')}`;
  }
}
