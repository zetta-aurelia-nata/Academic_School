//********** ANGULAR TESTING IMPORT **********
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';


//********** COMPONENT TEST SUITE **********
describe('Dashboard', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;


  //********** TEST ENVIRONMENT SETUP **********
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });


  //********** COMPONENT CREATION TEST **********
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});