import { TestBed } from '@angular/core/testing';

import { ApplicationStatisticsCenterAdService } from './application-statistics-center-ad.service';

describe('ApplicationStatisticsCenterAdService', () => {
  let service: ApplicationStatisticsCenterAdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationStatisticsCenterAdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
