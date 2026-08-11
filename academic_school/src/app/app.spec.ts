//********** ANGULAR TESTING IMPORT **********
//Import TestBed for configuring and creating the component test environment.
import { TestBed } from '@angular/core/testing';

//Import the root application component to be tested.
import { AppComponent } from './app.component';

//********** APP COMPONENT TEST SUITE **********
//Groups all tests for the root AppComponent.
describe('App', () => {
  //********** TEST ENVIRONMENT SETUP **********
  // Configure the testing environment before each test.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // - Register AppComponent for testing.
      imports: [AppComponent],
    }).compileComponents();
  });

  //********** COMPONENT CREATION TEST **********
  // Verify that the AppComponent can be created successfully.
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  //********** APPLICATION TITLE TEST **********
  /**
   * Verify that the expected title is displayed in the template.
   * Wait until the component is stable.
   * Access the rendered HTML content.
   *   Check whether the h1 contains the expected title
   */
  it('should render title', async () => {
    const fixture = TestBed.createComponent(AppComponent);

    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, My-app');
  });
});
