import { TestBed } from '@angular/core/testing';

import { ReRegistrationServiceService } from './re-registration-service.service';

describe('ReRegistrationServiceService', () => {
  let service: ReRegistrationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReRegistrationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
