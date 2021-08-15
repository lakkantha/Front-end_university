import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResetPasswordSuccessComponent } from './admin-reset-password-success.component';

describe('AdminResetPasswordSuccessComponent', () => {
  let component: AdminResetPasswordSuccessComponent;
  let fixture: ComponentFixture<AdminResetPasswordSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminResetPasswordSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminResetPasswordSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
