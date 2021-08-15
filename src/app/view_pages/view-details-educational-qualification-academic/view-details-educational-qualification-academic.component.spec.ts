import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsEducationalQualificationAcademicComponent } from './view-details-educational-qualification-academic.component';

describe('ViewDetailsEducationalQualificationAcademicComponent', () => {
  let component: ViewDetailsEducationalQualificationAcademicComponent;
  let fixture: ComponentFixture<ViewDetailsEducationalQualificationAcademicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailsEducationalQualificationAcademicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsEducationalQualificationAcademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
