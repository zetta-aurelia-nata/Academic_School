import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsResult } from './assessments-result';

describe('AssessmentsResult', () => {
  let component: AssessmentsResult;
  let fixture: ComponentFixture<AssessmentsResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsResult],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
