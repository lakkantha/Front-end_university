import { TestBed } from '@angular/core/testing';

import { SchedulingAdService } from './scheduling-ad.service';

describe('SchedulingAdService', () => {
  let service: SchedulingAdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulingAdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
