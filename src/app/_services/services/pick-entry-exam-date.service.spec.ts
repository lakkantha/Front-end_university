import { TestBed } from '@angular/core/testing';

import { PickEntryExamDateService } from './pick-entry-exam-date.service';

describe('PickEntryExamDateService', () => {
  let service: PickEntryExamDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PickEntryExamDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
