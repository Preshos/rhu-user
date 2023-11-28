import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirstaidInfoPage } from './firstaid-info.page';

describe('FirstaidInfoPage', () => {
  let component: FirstaidInfoPage;
  let fixture: ComponentFixture<FirstaidInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FirstaidInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
