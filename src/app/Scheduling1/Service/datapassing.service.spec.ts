import { TestBed } from '@angular/core/testing';

import { DatapassingService } from './datapassing.service';

describe('DatapassingService', () => {
  let service: DatapassingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatapassingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
