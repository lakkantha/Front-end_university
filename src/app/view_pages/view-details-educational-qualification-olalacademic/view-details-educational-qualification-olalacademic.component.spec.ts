import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsEducationalQualificationOLALAcademicComponent } from './view-details-educational-qualification-olalacademic.component';

describe('ViewDetailsEducationalQualificationOLALAcademicComponent', () => {
  let component: ViewDetailsEducationalQualificationOLALAcademicComponent;
  let fixture: ComponentFixture<ViewDetailsEducationalQualificationOLALAcademicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailsEducationalQualificationOLALAcademicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsEducationalQualificationOLALAcademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
