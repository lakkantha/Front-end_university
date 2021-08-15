import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsProfessionalQualificationComponent } from './view-details-professional-qualification.component';

describe('ViewDetailsProfessionalQualificationComponent', () => {
  let component: ViewDetailsProfessionalQualificationComponent;
  let fixture: ComponentFixture<ViewDetailsProfessionalQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailsProfessionalQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsProfessionalQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
