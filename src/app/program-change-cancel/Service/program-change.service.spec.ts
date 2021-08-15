import { TestBed } from '@angular/core/testing';

import { ProgramChangeService } from './program-change.service';

describe('ProgramChangeService', () => {
  let service: ProgramChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
