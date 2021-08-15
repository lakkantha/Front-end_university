import { TestBed } from '@angular/core/testing';

import { EducationalQualificationOLService } from './educational-qualification-ol.service';

describe('EducationalQualificationOLService', () => {
  let service: EducationalQualificationOLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationalQualificationOLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
