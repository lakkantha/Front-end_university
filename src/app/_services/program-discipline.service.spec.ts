import { TestBed } from '@angular/core/testing';

import { ProgramDisciplineService } from './program-discipline.service';

describe('ProgramDisciplineService', () => {
  let service: ProgramDisciplineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramDisciplineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
