import { TestBed } from '@angular/core/testing';

import { SendNotificationProgramCourseService } from './send-notification-program-course.service';

describe('SendNotificationProgramCourseService', () => {
  let service: SendNotificationProgramCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendNotificationProgramCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
