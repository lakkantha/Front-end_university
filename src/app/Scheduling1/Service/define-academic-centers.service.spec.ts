import { TestBed } from '@angular/core/testing';

import { DefineAcademicCentersService } from './define-academic-centers.service';

describe('DefineAcademicCentersService', () => {
  let service: DefineAcademicCentersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefineAcademicCentersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
