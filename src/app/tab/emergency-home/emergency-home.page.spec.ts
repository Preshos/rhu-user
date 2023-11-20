import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmergencyHomePage } from './emergency-home.page';

describe('EmergencyHomePage', () => {
  let component: EmergencyHomePage;
  let fixture: ComponentFixture<EmergencyHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmergencyHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
