import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhyPage } from './why.page';

describe('WhyPage', () => {
  let component: WhyPage;
  let fixture: ComponentFixture<WhyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WhyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
