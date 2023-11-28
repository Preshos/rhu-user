import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AimPage } from './aim.page';

describe('AimPage', () => {
  let component: AimPage;
  let fixture: ComponentFixture<AimPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
