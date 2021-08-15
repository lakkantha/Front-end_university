import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalQualificationOLComponent } from './educational-qualification-ol.component';

describe('EducationalQualificationOLComponent', () => {
  let component: EducationalQualificationOLComponent;
  let fixture: ComponentFixture<EducationalQualificationOLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalQualificationOLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalQualificationOLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
