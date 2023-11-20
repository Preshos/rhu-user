import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirstaidHomePage } from './firstaid-home.page';

describe('FirstaidHomePage', () => {
  let component: FirstaidHomePage;
  let fixture: ComponentFixture<FirstaidHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FirstaidHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
