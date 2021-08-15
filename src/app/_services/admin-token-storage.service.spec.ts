import { TestBed } from '@angular/core/testing';

import { AdminTokenStorageService } from './admin-token-storage.service';

describe('AdminTokenStorageService', () => {
  let service: AdminTokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTokenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
