//********** Angular Imports **********
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayout } from './main-layout.component';

//********** COMPONENT TEST SUITE **********
describe('MainLayout', () => {
  let component: MainLayout;
  let fixture: ComponentFixture<MainLayout>;

  //********** TEST ENVIRONMENT SETUP **********
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  //********** COMPONENT CREATION TEST **********
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
