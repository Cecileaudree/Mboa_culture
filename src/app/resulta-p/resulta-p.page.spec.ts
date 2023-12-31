import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultaPPage } from './resulta-p.page';

describe('ResultaPPage', () => {
  let component: ResultaPPage;
  let fixture: ComponentFixture<ResultaPPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResultaPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
