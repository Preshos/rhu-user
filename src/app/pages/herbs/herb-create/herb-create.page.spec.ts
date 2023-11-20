import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HerbCreatePage } from './herb-create.page';

describe('HerbCreatePage', () => {
  let component: HerbCreatePage;
  let fixture: ComponentFixture<HerbCreatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HerbCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
