import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialApplicantComponent } from './initial-applicant.component';

describe('InitialApplicantComponent', () => {
  let component: InitialApplicantComponent;
  let fixture: ComponentFixture<InitialApplicantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialApplicantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
