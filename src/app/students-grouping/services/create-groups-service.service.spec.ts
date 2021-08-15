import { TestBed } from '@angular/core/testing';

import { CreateGroupsServiceService } from './create-groups-service.service';

describe('CreateGroupsServiceService', () => {
  let service: CreateGroupsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateGroupsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
