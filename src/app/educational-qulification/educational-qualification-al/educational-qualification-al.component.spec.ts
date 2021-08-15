import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalQualificationALComponent } from './educational-qualification-al.component';

describe('EducationalQualificationALComponent', () => {
  let component: EducationalQualificationALComponent;
  let fixture: ComponentFixture<EducationalQualificationALComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalQualificationALComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalQualificationALComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
