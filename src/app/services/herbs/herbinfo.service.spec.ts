import { TestBed } from '@angular/core/testing';

import { HerbinfoService } from './herbinfo.service';

describe('HerbinfoService', () => {
  let service: HerbinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HerbinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
