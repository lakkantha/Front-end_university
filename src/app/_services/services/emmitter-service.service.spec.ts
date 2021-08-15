import { TestBed } from '@angular/core/testing';

import { EmmitterServiceService } from './emmitter-service.service';

describe('EmmitterServiceService', () => {
  let service: EmmitterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmmitterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
