import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HerbUpdatePage } from './herb-update.page';

describe('HerbUpdatePage', () => {
  let component: HerbUpdatePage;
  let fixture: ComponentFixture<HerbUpdatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HerbUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
