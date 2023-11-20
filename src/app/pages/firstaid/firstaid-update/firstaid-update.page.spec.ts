import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirstaidUpdatePage } from './firstaid-update.page';

describe('FirstaidUpdatePage', () => {
  let component: FirstaidUpdatePage;
  let fixture: ComponentFixture<FirstaidUpdatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FirstaidUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
