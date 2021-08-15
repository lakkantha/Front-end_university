import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsEducationalQualificationOLALComponent } from './view-details-educational-qualification-olal.component';

describe('ViewDetailsEducationalQualificationOLALComponent', () => {
  let component: ViewDetailsEducationalQualificationOLALComponent;
  let fixture: ComponentFixture<ViewDetailsEducationalQualificationOLALComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailsEducationalQualificationOLALComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsEducationalQualificationOLALComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
