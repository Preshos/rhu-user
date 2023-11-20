import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmergencyDetailsPage } from './emergency-details.page';

describe('EmergencyDetailsPage', () => {
  let component: EmergencyDetailsPage;
  let fixture: ComponentFixture<EmergencyDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmergencyDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
