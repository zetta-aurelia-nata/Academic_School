import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsList } from './assessments-list';

describe('AssessmentsList', () => {
  let component: AssessmentsList;
  let fixture: ComponentFixture<AssessmentsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsList],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
