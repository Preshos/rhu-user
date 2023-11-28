import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AimHerbPage } from './aim-herb.page';

describe('AimHerbPage', () => {
  let component: AimHerbPage;
  let fixture: ComponentFixture<AimHerbPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AimHerbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
