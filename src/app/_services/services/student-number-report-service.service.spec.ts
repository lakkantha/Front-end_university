import { TestBed } from '@angular/core/testing';

import { StudentNumberReportServiceService } from './student-number-report-service.service';

describe('StudentNumberReportServiceService', () => {
  let service: StudentNumberReportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentNumberReportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
