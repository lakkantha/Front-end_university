import { TestBed } from '@angular/core/testing';

import { ForgotPasswordByPhoneService } from './forgot-password-by-phone.service';

describe('ForgotPasswordByPhoneService', () => {
  let service: ForgotPasswordByPhoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotPasswordByPhoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
