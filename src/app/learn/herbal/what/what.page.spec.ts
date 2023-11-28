import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhatPage } from './what.page';

describe('WhatPage', () => {
  let component: WhatPage;
  let fixture: ComponentFixture<WhatPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WhatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
