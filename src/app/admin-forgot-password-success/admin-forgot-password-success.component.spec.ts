import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminForgotPasswordSuccessComponent } from './admin-forgot-password-success.component';

describe('AdminForgotPasswordSuccessComponent', () => {
  let component: AdminForgotPasswordSuccessComponent;
  let fixture: ComponentFixture<AdminForgotPasswordSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminForgotPasswordSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminForgotPasswordSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
