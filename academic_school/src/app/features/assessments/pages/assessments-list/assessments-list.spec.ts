//********** ANGULAR TESTING IMPORT **********
// Import Angular utilities for component testing.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentsList } from './assessments-list';

//********** COMPONENT IMPORT **********
// Import the component to be tested.
describe('AssessmentsList', () => {
  let component: AssessmentsList;
  let fixture: ComponentFixture<AssessmentsList>;

  //********** TEST ENVIRONMENT SETUP **********
  /**
   * Configure the testing module and create the component.
   *  Create the component instance.
   *  Wait until the component is stable.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsList],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  //********** COMPONENT CREATION TEST **********
  // Verify that the component is created successfully.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
