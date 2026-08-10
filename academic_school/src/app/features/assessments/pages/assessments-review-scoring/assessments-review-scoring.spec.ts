import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsReviewScoring } from './assessments-review-scoring';

describe('AssessmentsReviewScoring', () => {
  let component: AssessmentsReviewScoring;
  let fixture: ComponentFixture<AssessmentsReviewScoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsReviewScoring],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsReviewScoring);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
