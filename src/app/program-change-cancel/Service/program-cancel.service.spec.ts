import { TestBed } from '@angular/core/testing';

import { ProgramCancelService } from './program-cancel.service';

describe('ProgramCancelService', () => {
  let service: ProgramCancelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramCancelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
