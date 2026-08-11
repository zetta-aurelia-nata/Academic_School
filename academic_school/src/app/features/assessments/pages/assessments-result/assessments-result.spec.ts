//********** ANGULAR TESTING IMPORT **********
// Import Angular utilities for component testing.
import { ComponentFixture, TestBed } from '@angular/core/testing';

//********** COMPONENT IMPORT **********
// Import the component to be tested.
import { AssessmentsResult } from './assessments-result';

//********** COMPONENT TEST SUITE **********
// Groups all tests for AssessmentsCreate.
describe('AssessmentsResult', () => {
  let component: AssessmentsResult;
  let fixture: ComponentFixture<AssessmentsResult>;

  //********** TEST ENVIRONMENT SETUP **********
  /**
   * Configure the testing module and create the component.
   *  Create the component instance.
   *  Wait until the component is stable.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsResult],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  //********** COMPONENT CREATION TEST **********
  // Verify that the component is created successfully.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
