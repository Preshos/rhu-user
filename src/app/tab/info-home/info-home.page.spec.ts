import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoHomePage } from './info-home.page';

describe('InfoHomePage', () => {
  let component: InfoHomePage;
  let fixture: ComponentFixture<InfoHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
