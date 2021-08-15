import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalQualificationOLALAcademicALAcademicNotMandatoryComponent } from './educational-qualification-olalacademic-alacademic-not-mandatory.component';

describe('EducationalQualificationOLALAcademicALAcademicNotMandatoryComponent', () => {
  let component: EducationalQualificationOLALAcademicALAcademicNotMandatoryComponent;
  let fixture: ComponentFixture<EducationalQualificationOLALAcademicALAcademicNotMandatoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationalQualificationOLALAcademicALAcademicNotMandatoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalQualificationOLALAcademicALAcademicNotMandatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
