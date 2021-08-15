import { TestBed } from '@angular/core/testing';

import { RollbackStudentshipService } from './rollback-studentship.service';

describe('RollbackStudentshipService', () => {
  let service: RollbackStudentshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RollbackStudentshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
