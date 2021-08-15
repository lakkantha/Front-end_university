import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginalCertificateVerificationComponent } from './original-certificate-verification.component';

describe('OriginalCertificateVerificationComponent', () => {
  let component: OriginalCertificateVerificationComponent;
  let fixture: ComponentFixture<OriginalCertificateVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginalCertificateVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginalCertificateVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
