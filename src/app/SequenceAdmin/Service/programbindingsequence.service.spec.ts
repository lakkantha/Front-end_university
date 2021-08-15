import { TestBed } from '@angular/core/testing';

import { ProgrambindingsequenceService } from './programbindingsequence.service';

describe('ProgrambindingsequenceService', () => {
  let service: ProgrambindingsequenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgrambindingsequenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
