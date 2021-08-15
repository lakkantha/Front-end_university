import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentReRegistrationComponent } from './student-re-registration.component';

describe('StudentReRegistrationComponent', () => {
  let component: StudentReRegistrationComponent;
  let fixture: ComponentFixture<StudentReRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentReRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentReRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
