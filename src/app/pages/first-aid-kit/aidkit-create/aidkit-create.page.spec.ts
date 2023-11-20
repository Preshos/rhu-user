import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AidkitCreatePage } from './aidkit-create.page';

describe('AidkitCreatePage', () => {
  let component: AidkitCreatePage;
  let fixture: ComponentFixture<AidkitCreatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AidkitCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
