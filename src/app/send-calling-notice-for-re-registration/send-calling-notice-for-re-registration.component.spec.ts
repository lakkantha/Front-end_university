import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCallingNoticeForReRegistrationComponent } from './send-calling-notice-for-re-registration.component';

describe('SendCallingNoticeForReRegistrationComponent', () => {
  let component: SendCallingNoticeForReRegistrationComponent;
  let fixture: ComponentFixture<SendCallingNoticeForReRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendCallingNoticeForReRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendCallingNoticeForReRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
