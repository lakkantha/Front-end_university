import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalQualificationOLALAcademicComponent } from './educational-qualification-olalacademic.component';

describe('EducationalQualificationOLALAcademicComponent', () => {
  let component: EducationalQualificationOLALAcademicComponent;
  let fixture: ComponentFixture<EducationalQualificationOLALAcademicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalQualificationOLALAcademicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalQualificationOLALAcademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
