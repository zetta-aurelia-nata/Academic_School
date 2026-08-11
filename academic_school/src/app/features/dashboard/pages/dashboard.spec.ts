//********** ANGULAR TESTING IMPORT **********
//Import Angular utilities for component testing.
import { ComponentFixture, TestBed } from '@angular/core/testing';


//********** COMPONENT IMPORT **********
// Import the component to be tested.
import { Dashboard } from './dashboard';


//********** COMPONENT TEST SUITE **********
// Groups all tests for Dashboard.
describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;


  //********** TEST ENVIRONMENT SETUP **********
  /**
   * Configure the testing module and create the component.
   *  Create the component instance.
   *  Wait until the component is stable.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });


  //********** COMPONENT CREATION TEST **********
  // Verify that the component is created successfully.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});