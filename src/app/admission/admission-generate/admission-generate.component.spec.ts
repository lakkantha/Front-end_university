import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionGenerateComponent } from './admission-generate.component';

describe('AdmissionGenerateComponent', () => {
  let component: AdmissionGenerateComponent;
  let fixture: ComponentFixture<AdmissionGenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionGenerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
