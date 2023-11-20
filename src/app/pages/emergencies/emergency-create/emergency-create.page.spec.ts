import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmergencyCreatePage } from './emergency-create.page';

describe('EmergencyCreatePage', () => {
  let component: EmergencyCreatePage;
  let fixture: ComponentFixture<EmergencyCreatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmergencyCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
