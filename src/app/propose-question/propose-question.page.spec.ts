import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProposeQuestionPage } from './propose-question.page';

describe('ProposeQuestionPage', () => {
  let component: ProposeQuestionPage;
  let fixture: ComponentFixture<ProposeQuestionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProposeQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
