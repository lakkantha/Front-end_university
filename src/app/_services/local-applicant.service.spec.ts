import { TestBed } from '@angular/core/testing';

import { LocalApplicantService } from './local-applicant.service';

describe('LocalApplicantService', () => {
  let service: LocalApplicantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalApplicantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
