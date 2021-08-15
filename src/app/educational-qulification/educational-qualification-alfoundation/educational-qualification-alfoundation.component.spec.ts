import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalQualificationALFoundationComponent } from './educational-qualification-alfoundation.component';

describe('EducationalQualificationALFoundationComponent', () => {
  let component: EducationalQualificationALFoundationComponent;
  let fixture: ComponentFixture<EducationalQualificationALFoundationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalQualificationALFoundationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalQualificationALFoundationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
