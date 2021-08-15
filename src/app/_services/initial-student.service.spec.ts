import { TestBed } from '@angular/core/testing';

import { InitialStudentService } from './initial-student.service';

describe('InitialStudentService', () => {
  let service: InitialStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
