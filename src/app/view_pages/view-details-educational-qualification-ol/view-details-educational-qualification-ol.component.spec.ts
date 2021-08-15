import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsEducationalQualificationOLComponent } from './view-details-educational-qualification-ol.component';

describe('ViewDetailsEducationalQualificationOLComponent', () => {
  let component: ViewDetailsEducationalQualificationOLComponent;
  let fixture: ComponentFixture<ViewDetailsEducationalQualificationOLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailsEducationalQualificationOLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsEducationalQualificationOLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
