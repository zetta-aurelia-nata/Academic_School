//********** ANGULAR COMPONENT IMPORT **********
// Import Component decorator from Angular.
import { ComponentFixture, TestBed } from '@angular/core/testing';

//********** COMPONENT IMPORT **********
// Import the component to be tested.
import { MainLayout } from './main-layout.component';

//********** COMPONENT TEST SUITE **********
// Groups all tests for Dashboard.
describe('MainLayout', () => {
  let component: MainLayout;
  let fixture: ComponentFixture<MainLayout>;

  //********** TEST ENVIRONMENT SETUP **********
  /**
   * Configure the testing module and create the component.
   *  Create the component instance.
   *  Wait until the component is stable.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  //********** COMPONENT CREATION TEST **********
  // Verify that the component is created successfully.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
