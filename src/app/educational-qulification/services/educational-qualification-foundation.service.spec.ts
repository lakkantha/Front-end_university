import { TestBed } from '@angular/core/testing';

import { EducationalQualificationFoundationService } from './educational-qualification-foundation.service';

describe('EducationalQualificationFoundationService', () => {
  let service: EducationalQualificationFoundationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationalQualificationFoundationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
