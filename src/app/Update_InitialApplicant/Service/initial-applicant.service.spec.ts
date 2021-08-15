import { TestBed } from '@angular/core/testing';

import { InitialApplicantService } from './initial-applicant.service';

describe('InitialApplicantService', () => {
  let service: InitialApplicantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialApplicantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
