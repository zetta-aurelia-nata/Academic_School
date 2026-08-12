//********** ANGULAR TESTING IMPORT **********
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentList } from './assessments-list';

describe('AssessmentsList', () => {
  let component: AssessmentList;
  let fixture: ComponentFixture<AssessmentList>;

  //********** TEST ENVIRONMENT SETUP **********
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentList],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
