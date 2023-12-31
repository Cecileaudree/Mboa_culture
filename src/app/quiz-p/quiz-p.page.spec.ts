import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizPPage } from './quiz-p.page';

describe('QuizPPage', () => {
  let component: QuizPPage;
  let fixture: ComponentFixture<QuizPPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QuizPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
