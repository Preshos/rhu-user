import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HerbHomePage } from './herb-home.page';

describe('HerbHomePage', () => {
  let component: HerbHomePage;
  let fixture: ComponentFixture<HerbHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HerbHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
