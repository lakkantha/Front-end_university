import { TestBed } from '@angular/core/testing';

import { AdminForgotPasswordService } from './admin-forgot-password.service';

describe('AdminForgotPasswordService', () => {
  let service: AdminForgotPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminForgotPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
