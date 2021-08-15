import { TestBed } from '@angular/core/testing';

import { ProgramSelectionService } from './program-selection.service';

describe('ProgramSelectionService', () => {
  let service: ProgramSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
