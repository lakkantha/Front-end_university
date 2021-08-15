import { TestBed } from '@angular/core/testing';

import { SchedulingComService } from './scheduling-dop.service';

describe('SchedulingComService', () => {
  let service: SchedulingComService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulingComService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
