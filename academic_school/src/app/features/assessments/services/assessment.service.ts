// ********** ANGULAR IMPORTS **********
import { Injectable } from '@angular/core';

// ********** APPLICATION IMPORTS **********
import { ASSESSMENTS } from '../assessment.data';
import { Assessment } from '../pages/assessments-list/assessment.list.model';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  createAssessment(assessmentData: { title: any; subject: any; grade: any; description: any; instructions: any; duration: number; totalPoints: number; status: any; }) {
    throw new Error('Method not implemented.');
  }
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
}
