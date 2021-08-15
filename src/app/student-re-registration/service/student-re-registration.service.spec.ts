import { TestBed } from '@angular/core/testing';

import { StudentReRegistrationService } from './student-re-registration.service';

describe('StudentReRegistrationService', () => {
  let service: StudentReRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentReRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
