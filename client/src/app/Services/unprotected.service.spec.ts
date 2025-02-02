import { TestBed } from '@angular/core/testing';

import { UnprotectedService } from './unprotected.service';

describe('UnprotectedService', () => {
  let service: UnprotectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnprotectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
