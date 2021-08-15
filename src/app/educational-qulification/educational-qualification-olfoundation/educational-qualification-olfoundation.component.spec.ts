import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalQualificationOLFoundationComponent } from './educational-qualification-olfoundation.component';

describe('EducationalQualificationOLFoundationComponent', () => {
  let component: EducationalQualificationOLFoundationComponent;
  let fixture: ComponentFixture<EducationalQualificationOLFoundationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalQualificationOLFoundationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalQualificationOLFoundationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
