import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordByPhoneComponent } from './forgot-password-by-phone.component';

describe('ForgotPasswordByPhoneComponent', () => {
  let component: ForgotPasswordByPhoneComponent;
  let fixture: ComponentFixture<ForgotPasswordByPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordByPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordByPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
