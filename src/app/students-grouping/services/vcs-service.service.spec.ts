import { TestBed } from '@angular/core/testing';

import { VcsServiceService } from './vcs-service.service';

describe('VcsServiceService', () => {
  let service: VcsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VcsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
