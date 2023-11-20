import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirstaidDetailsPage } from './firstaid-details.page';

describe('FirstaidDetailsPage', () => {
  let component: FirstaidDetailsPage;
  let fixture: ComponentFixture<FirstaidDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FirstaidDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
