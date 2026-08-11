//********** ANGULAR TESTING IMPORT **********
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';

//********** TEST SUITE **********
describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  //********** TEST ENVIRONMENT SETUP **********
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
