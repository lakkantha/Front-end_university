import { TestBed } from '@angular/core/testing';

import { AddentranceexamcenterService } from './addentranceexamcenter.service';

describe('AddentranceexamcenterService', () => {
  let service: AddentranceexamcenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddentranceexamcenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
