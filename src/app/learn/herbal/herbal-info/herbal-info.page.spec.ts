import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HerbalInfoPage } from './herbal-info.page';

describe('HerbalInfoPage', () => {
  let component: HerbalInfoPage;
  let fixture: ComponentFixture<HerbalInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HerbalInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
