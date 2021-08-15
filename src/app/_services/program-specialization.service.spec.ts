import { TestBed } from '@angular/core/testing';

import { ProgramSpecializationService } from './program-specialization.service';

describe('ProgramSpecializationService', () => {
  let service: ProgramSpecializationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramSpecializationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
