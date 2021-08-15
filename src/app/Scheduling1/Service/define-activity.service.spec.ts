import { TestBed } from '@angular/core/testing';

import { DefineActivityService } from './define-activity.service';

describe('DefineActivityService', () => {
  let service: DefineActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefineActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
