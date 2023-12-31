import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NombreJouersPage } from './nombre-jouers.page';

describe('NombreJouersPage', () => {
  let component: NombreJouersPage;
  let fixture: ComponentFixture<NombreJouersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NombreJouersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
