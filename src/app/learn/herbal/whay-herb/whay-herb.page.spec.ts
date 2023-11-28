import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhayHerbPage } from './whay-herb.page';

describe('WhayHerbPage', () => {
  let component: WhayHerbPage;
  let fixture: ComponentFixture<WhayHerbPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WhayHerbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
