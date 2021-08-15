import { TestBed } from '@angular/core/testing';

import { SearchapplicationService } from './searchapplication.service';

describe('SearchapplicationService', () => {
  let service: SearchapplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchapplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
