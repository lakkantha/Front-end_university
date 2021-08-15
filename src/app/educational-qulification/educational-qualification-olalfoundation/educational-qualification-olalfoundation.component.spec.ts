import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalQualificationOLALFoundationComponent } from './educational-qualification-olalfoundation.component';

describe('EducationalQualificationOLALFoundationComponent', () => {
  let component: EducationalQualificationOLALFoundationComponent;
  let fixture: ComponentFixture<EducationalQualificationOLALFoundationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalQualificationOLALFoundationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalQualificationOLALFoundationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
