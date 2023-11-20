import { TestBed } from '@angular/core/testing';

import { FirstaidService } from './firstaid.service';

describe('FirstaidService', () => {
  let service: FirstaidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirstaidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
