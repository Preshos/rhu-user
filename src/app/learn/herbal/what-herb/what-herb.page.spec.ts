import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhatHerbPage } from './what-herb.page';

describe('WhatHerbPage', () => {
  let component: WhatHerbPage;
  let fixture: ComponentFixture<WhatHerbPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WhatHerbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
