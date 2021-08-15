import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNotificationProgramCourseComponent } from './send-notification-program-course.component';

describe('SendNotificationProgramCourseComponent', () => {
  let component: SendNotificationProgramCourseComponent;
  let fixture: ComponentFixture<SendNotificationProgramCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendNotificationProgramCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendNotificationProgramCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
