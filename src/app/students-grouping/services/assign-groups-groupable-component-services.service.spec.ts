import { TestBed } from '@angular/core/testing';

import { AssignGroupsGroupableComponentServicesService } from './assign-groups-groupable-component-services.service';

describe('AssignGroupsGroupableComponentServicesService', () => {
  let service: AssignGroupsGroupableComponentServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignGroupsGroupableComponentServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
