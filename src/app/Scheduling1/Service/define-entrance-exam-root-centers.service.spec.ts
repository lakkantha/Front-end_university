import { TestBed } from '@angular/core/testing';

import { DefineEntranceExamRootCentersService } from './define-entrance-exam-root-centers.service';

describe('DefineEntranceExamRootCentersService', () => {
  let service: DefineEntranceExamRootCentersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefineEntranceExamRootCentersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
