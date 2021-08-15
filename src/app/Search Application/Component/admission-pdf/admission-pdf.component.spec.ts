import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionPdfComponent } from './admission-pdf.component';

describe('AdmissionPdfComponent', () => {
  let component: AdmissionPdfComponent;
  let fixture: ComponentFixture<AdmissionPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
