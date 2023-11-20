import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AidkitUpdatePage } from './aidkit-update.page';

describe('AidkitUpdatePage', () => {
  let component: AidkitUpdatePage;
  let fixture: ComponentFixture<AidkitUpdatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AidkitUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
