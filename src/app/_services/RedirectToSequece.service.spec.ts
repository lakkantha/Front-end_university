/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RedirectToSequeceService } from './RedirectToSequece.service';

describe('Service: RedirectToSequece', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedirectToSequeceService]
    });
  });

  it('should ...', inject([RedirectToSequeceService], (service: RedirectToSequeceService) => {
    expect(service).toBeTruthy();
  }));
});
