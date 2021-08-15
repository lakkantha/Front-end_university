import { TestBed } from '@angular/core/testing';

import { FinalMarkApproveService } from './final-mark-approve.service';

describe('FinalMarkApproveService', () => {
  let service: FinalMarkApproveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalMarkApproveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
