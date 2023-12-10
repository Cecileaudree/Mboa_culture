import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NiveauxPage } from './niveaux.page';

describe('NiveauxPage', () => {
  let component: NiveauxPage;
  let fixture: ComponentFixture<NiveauxPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NiveauxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
