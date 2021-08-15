import { TestBed } from '@angular/core/testing';

import { ProfessionalCertificatesService } from './professional-certificates.service';

describe('ProfessionalCertificatesService', () => {
  let service: ProfessionalCertificatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalCertificatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
