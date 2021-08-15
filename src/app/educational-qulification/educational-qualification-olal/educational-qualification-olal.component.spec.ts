import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalQualificationOLALComponent } from './educational-qualification-olal.component';

describe('EducationalQualificationOLALComponent', () => {
  let component: EducationalQualificationOLALComponent;
  let fixture: ComponentFixture<EducationalQualificationOLALComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalQualificationOLALComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalQualificationOLALComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
