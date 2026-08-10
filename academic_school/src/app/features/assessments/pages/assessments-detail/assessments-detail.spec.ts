import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsDetail } from './assessments-detail';

describe('AssessmentsDetail', () => {
  let component: AssessmentsDetail;
  let fixture: ComponentFixture<AssessmentsDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
