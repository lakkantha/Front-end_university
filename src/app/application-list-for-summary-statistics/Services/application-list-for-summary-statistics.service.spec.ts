import { TestBed } from '@angular/core/testing';

import { ApplicationListForSummaryStatisticsService } from './application-list-for-summary-statistics.service';

describe('ApplicationListForSummaryStatisticsService', () => {
  let service: ApplicationListForSummaryStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationListForSummaryStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
