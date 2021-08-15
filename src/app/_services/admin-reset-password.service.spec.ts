import { TestBed } from '@angular/core/testing';

import { AdminResetPasswordService } from './admin-reset-password.service';

describe('AdminResetPasswordService', () => {
  let service: AdminResetPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminResetPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
