import { TestBed } from '@angular/core/testing';

import { ExamRootCenterBindingEntranceExamCenterService } from './exam-root-center-binding-entrance-exam-center.service';

describe('ExamRootCenterBindingEntranceExamCenterService', () => {
  let service: ExamRootCenterBindingEntranceExamCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamRootCenterBindingEntranceExamCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
