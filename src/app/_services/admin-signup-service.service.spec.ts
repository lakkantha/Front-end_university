import { TestBed } from '@angular/core/testing';

import { AdminSignupServiceService } from './admin-signup-service.service';

describe('AdminSignupServiceService', () => {
  let service: AdminSignupServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSignupServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
