import { TestBed } from '@angular/core/testing';

import { ApplicationSummeryStatisticsService } from './application-summery-statistics.service';

describe('ApplicationSummeryStatisticsService', () => {
  let service: ApplicationSummeryStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationSummeryStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
