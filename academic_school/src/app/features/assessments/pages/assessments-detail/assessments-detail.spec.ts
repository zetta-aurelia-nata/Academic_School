//********** ANGULAR TESTING IMPORT **********
// Import Angular utilities for component testing.
import { ComponentFixture, TestBed } from '@angular/core/testing';

//********** COMPONENT IMPORT **********
// Import the component to be tested.
import { AssessmentsDetail } from './assessments-detail';

//********** COMPONENT TEST SUITE **********
// Groups all tests for AssessmentsDetail.
describe('AssessmentsDetail', () => {
  let component: AssessmentsDetail;
  let fixture: ComponentFixture<AssessmentsDetail>;

  //********** TEST ENVIRONMENT SETUP **********
  /**
   * Configure the testing module and create the component.
   *  Create the component instance.
   *  Wait until the component is stable.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  //********** COMPONENT CREATION TEST **********
  // Verify that the component is created successfully.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
