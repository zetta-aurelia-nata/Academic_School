import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';
import { AssessmentsReview } from './assessments-review';

describe('AssessmentsReview', () => {
  let component: AssessmentsReview;
  let fixture: ComponentFixture<AssessmentsReview>;
  let mockRouter: { navigate: ReturnType<typeof vi.fn> };

  const mockAssessments = [
    { id: '1', title: 'Math Test' },
    { id: '2', title: 'Science Quiz' }
  ];

  beforeEach(async () => {
    mockRouter = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [AssessmentsReview],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsReview);
    component = fixture.componentInstance;

    if ('assessments' in component) {
      (component as any).assessments = mockAssessments;
    }

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter assessments when searchQuery is set', () => {
    component.searchQuery = 'Math';
    fixture.detectChanges();

    const filtered = component.filteredAssessments;
    expect(filtered.length).toBe(1);
    expect(filtered[0].title).toBe('Math Test');
  });

  it('should restore the full list when clearSearch() is called', () => {
    component.searchQuery = 'Math';
    fixture.detectChanges();

    component.clearSearch();
    fixture.detectChanges();

    expect(component.searchQuery).toBe('');
    expect(component.filteredAssessments.length).toBe(mockAssessments.length);
  });

  it('should navigate to assessment submissions on onReview()', () => {
    const targetAssessment = mockAssessments[0];

    component.onReview(targetAssessment as any);

    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/assessments',
      targetAssessment.id,
      'submissions'
    ]);
  });
});