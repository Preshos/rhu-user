import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AidkitHomePage } from './aidkit-home.page';

describe('AidkitHomePage', () => {
  let component: AidkitHomePage;
  let fixture: ComponentFixture<AidkitHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AidkitHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
