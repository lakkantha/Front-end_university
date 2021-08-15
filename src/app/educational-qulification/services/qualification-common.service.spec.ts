import { TestBed } from '@angular/core/testing';

import { QualificationCommonService } from './qualification-common.service';

describe('QualificationCommonService', () => {
  let service: QualificationCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualificationCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
