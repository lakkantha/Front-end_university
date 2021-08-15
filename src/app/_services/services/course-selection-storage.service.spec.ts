import { TestBed } from '@angular/core/testing';

import { CourseSelectionStorageService } from './course-selection-storage.service';

describe('CourseSelectionStorageService', () => {
  let service: CourseSelectionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseSelectionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
