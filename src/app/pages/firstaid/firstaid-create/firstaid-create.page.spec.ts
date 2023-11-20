import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirstaidCreatePage } from './firstaid-create.page';

describe('FirstaidCreatePage', () => {
  let component: FirstaidCreatePage;
  let fixture: ComponentFixture<FirstaidCreatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FirstaidCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
