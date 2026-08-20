// ********** ANGULAR IMPORTS **********
import { Injectable } from '@angular/core';

// ********** APPLICATION IMPORTS **********
import { ASSESSMENTS } from '../assessment.data';
import { Assessment, AssessmentStatus } from '../pages/assessments-list/assessment.list.model';

export interface CreateAssessmentDto {
  title: string;
  subject: string;
  grade: string;
  description: string;
  instructions: string;
  duration: number;
  totalPoints: number;
  status: AssessmentStatus;
}
@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  // ********** PRIVATE STATE **********
  private assessments: Assessment[] = [...ASSESSMENTS];

  getAssessments(): Assessment[] {
    return [...this.assessments];
  }

  getAssessmentById(id: number): Assessment | undefined {
    return this.assessments.find((assessment) => assessment.id === id);
  }

  updateAssessment(id: number, updatedAssessment: Partial<Assessment>): void {
    const index = this.assessments.findIndex((assessment) => assessment.id === id);
    if (index === -1) {
      return;
    }

    this.assessments[index] = {
      ...this.assessments[index],
      ...updatedAssessment,
    };
  }

  deleteAssessment(id: number): void {
    this.assessments = this.assessments.filter((assessment) => assessment.id !== id);
  }

  addAssessment(assessment: Assessment): void {
    this.assessments.push(assessment);
  }

  createAssessment(dto: CreateAssessmentDto): void {
    const newAssessment: Assessment = {
      id: Date.now(),
      title: dto.title,
      subject: dto.subject,
      grade: dto.grade,
      totalStudents: 0,
      status: dto.status,
      date: new Date().toISOString().split('T')[0],
    };
    this.addAssessment(newAssessment);
  }
}
