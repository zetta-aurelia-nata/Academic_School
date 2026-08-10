import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsCreate } from './assessments-create';

describe('AssessmentsCreate', () => {
  let component: AssessmentsCreate;
  let fixture: ComponentFixture<AssessmentsCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
