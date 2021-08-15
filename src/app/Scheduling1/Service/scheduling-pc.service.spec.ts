import { TestBed } from '@angular/core/testing';

import { SchedulingCoordinatorService } from './scheduling-pc.service';

describe('SchedulingCoordinatorService', () => {
  let service: SchedulingCoordinatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulingCoordinatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
