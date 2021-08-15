import { TestBed } from '@angular/core/testing';

import { ProgramStreamService } from './program-stream.service';

describe('ProgramStreamService', () => {
  let service: ProgramStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
