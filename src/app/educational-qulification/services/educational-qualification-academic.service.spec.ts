import { TestBed } from '@angular/core/testing';

import { EducationalQualificationAcademicService } from './educational-qualification-academic.service';

describe('EducationalQualificationAcademicService', () => {
  let service: EducationalQualificationAcademicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationalQualificationAcademicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
