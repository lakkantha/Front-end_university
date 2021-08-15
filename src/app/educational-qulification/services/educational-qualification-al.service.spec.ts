import { TestBed } from '@angular/core/testing';

import { EducationalQualificationALService } from './educational-qualification-al.service';

describe('EducationalQualificationALService', () => {
  let service: EducationalQualificationALService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationalQualificationALService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
