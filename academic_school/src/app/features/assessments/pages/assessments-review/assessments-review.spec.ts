//********** ANGULAR TESTING IMPORT **********
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentsReview } from './assessments-review';

//**********  TEST SUITE **********
describe('AssessmentsReview', () => {
  let component: AssessmentsReview;
  let fixture: ComponentFixture<AssessmentsReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsReview],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsReview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
