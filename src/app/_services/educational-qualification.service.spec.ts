import { TestBed } from '@angular/core/testing';

import { EducationalQualificationService } from './educational-qualification.service';

describe('EducationalQualificationService', () => {
  let service: EducationalQualificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationalQualificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
