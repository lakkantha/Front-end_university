import { TestBed } from '@angular/core/testing';

import { DatapassinghomeService } from './datapassinghome.service';

describe('DatapassinghomeService', () => {
  let service: DatapassinghomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatapassinghomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
