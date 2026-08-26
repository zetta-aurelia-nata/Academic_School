// ********** ANGULAR IMPORTS **********
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';
import { AssessmentsReview } from './assessments-review';

// ********** TEST INPUT **********
describe('AssessmentsReview', () => {
  let component: AssessmentsReview;
  let fixture: ComponentFixture<AssessmentsReview>;
  let mockRouter: { navigate: ReturnType<typeof vi.fn> };

  const mockAssessments = [
    { id: '1', title: 'Mathematics Quiz' },
    { id: '2', title: 'History Midterm' }
  ];

  beforeEach(async () => {
    mockRouter = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [AssessmentsReview],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsReview);
    component = fixture.componentInstance;
  });

  it('should navigate to assessment submissions on onReview()', () => {
    const targetAssessment = mockAssessments[0];
    component.onReview(targetAssessment as any);

    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/assessments',
      targetAssessment.id,
      'submissions'
    ]);
  });
});