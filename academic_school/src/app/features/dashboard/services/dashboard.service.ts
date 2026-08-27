//********** ANGULAR IMPORTS **********
import { Injectable } from '@angular/core';

//********** MODELS **********
import { Assessment, AssessmentStat, AssessmentStatus } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  //********** PRIVATE STATE VARIABLES **********
  // NOTE: This stands in for a real data source (e.g. an API call). Replace with
  // an HttpClient call once the assessments endpoint is available.
  private assessments: Assessment[] = [
    { id: '1', title: 'Algebra Midterm', status: 'completed', studentCount: 32, createdDate: new Date('2026-06-01') },
    { id: '2', title: 'Biology Quiz', status: 'completed', studentCount: 28, createdDate: new Date('2026-06-05') },
    { id: '3', title: 'World History Essay', status: 'completed', studentCount: 24, createdDate: new Date('2026-06-08') },
    { id: '4', title: 'Chemistry Lab Report', status: 'completed', studentCount: 19, createdDate: new Date('2026-06-12') },
    { id: '5', title: 'English Literature Test', status: 'active', studentCount: 15, createdDate: new Date('2026-07-01') },
    { id: '6', title: 'Geometry Final', status: 'active', studentCount: 12, createdDate: new Date('2026-07-04') },
    { id: '7', title: 'Physics Problem Set', status: 'active', studentCount: 8, createdDate: new Date('2026-07-10') },
    { id: '8', title: 'Spanish Vocabulary Quiz', status: 'pending_review', studentCount: 6, createdDate: new Date('2026-07-18') },
    { id: '9', title: 'Computer Science Project', status: 'pending_review', studentCount: 3, createdDate: new Date('2026-07-22') },
    { id: '10', title: 'Economics Case Study', status: 'failed', studentCount: 2, createdDate: new Date('2026-07-25') },
    { id: '11', title: 'Art History Review', status: 'failed', studentCount: 1, createdDate: new Date('2026-07-27') },
    { id: '12', title: 'Statistics Homework', status: 'draft', studentCount: 0, createdDate: new Date('2026-08-01') },
  ];

  //********** PUBLIC METHODS **********
  getAssessments(): Assessment[] {
    return this.assessments;
  }

  getStats(): AssessmentStat[] {
    const totalStudents = this.assessments.reduce((sum, assessment) => sum + assessment.studentCount, 0);

    return [
      {
        label: 'Total Assessments',
        value: this.assessments.length,
        description: 'All created assessments',
        icon: 'assignment',
        colorClass: 'progress-icon--purple',
      },
      {
        label: 'Total Students',
        value: totalStudents,
        description: 'Across all assessments',
        icon: 'groups',
        colorClass: 'progress-icon--green',
      },
      {
        label: 'Completed',
        value: this.countByStatus('completed'),
        description: 'Assessments completed',
        icon: 'check_circle',
        colorClass: 'progress-icon--blue',
      },
      {
        label: 'Pending Review',
        value: this.countByStatus('pending_review'),
        description: 'Awaiting your review',
        icon: 'schedule',
        colorClass: 'progress-icon--amber',
      },
      {
        label: 'Failed / Needs Work',
        value: this.countByStatus('failed'),
        description: 'Requires attention',
        icon: 'cancel',
        colorClass: 'progress-icon--red',
      },
      {
        label: 'Draft',
        value: this.countByStatus('draft'),
        description: 'Waiting to publish',
        icon: 'edit_note',
        colorClass: 'progress-icon--grey',
      },
    ];
  }

  //********** PRIVATE METHODS **********
  private countByStatus(status: AssessmentStatus): number {
    return this.assessments.filter((assessment) => assessment.status === status).length;
  }
}