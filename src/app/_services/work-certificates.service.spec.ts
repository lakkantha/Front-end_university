import { TestBed } from '@angular/core/testing';

import { WorkCertificatesService } from './work-certificates.service';

describe('WorkCertificatesService', () => {
  let service: WorkCertificatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkCertificatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
