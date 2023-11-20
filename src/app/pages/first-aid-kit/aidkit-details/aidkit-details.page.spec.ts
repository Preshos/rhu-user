import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AidkitDetailsPage } from './aidkit-details.page';

describe('AidkitDetailsPage', () => {
  let component: AidkitDetailsPage;
  let fixture: ComponentFixture<AidkitDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AidkitDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
