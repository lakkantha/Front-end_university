import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalQualificationAcademicComponent } from './educational-qualification-academic.component';

describe('EducationalQualificationAcademicComponent', () => {
  let component: EducationalQualificationAcademicComponent;
  let fixture: ComponentFixture<EducationalQualificationAcademicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalQualificationAcademicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalQualificationAcademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
