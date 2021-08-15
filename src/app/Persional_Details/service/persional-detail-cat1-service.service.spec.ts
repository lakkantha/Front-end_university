import { TestBed } from '@angular/core/testing';

import { PersionalDetailCat1Service } from './persional-detail-cat1-service.service';

describe('PersionalDetailCat1ServiceService', () => {
  let service: PersionalDetailCat1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersionalDetailCat1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
