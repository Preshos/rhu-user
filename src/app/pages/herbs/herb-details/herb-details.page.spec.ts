import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HerbDetailsPage } from './herb-details.page';

describe('HerbDetailsPage', () => {
  let component: HerbDetailsPage;
  let fixture: ComponentFixture<HerbDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HerbDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
