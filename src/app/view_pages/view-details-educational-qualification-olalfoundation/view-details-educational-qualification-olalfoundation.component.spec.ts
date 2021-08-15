import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsEducationalQualificationOLALFoundationComponent } from './view-details-educational-qualification-olalfoundation.component';

describe('ViewDetailsEducationalQualificationOLALFoundationComponent', () => {
  let component: ViewDetailsEducationalQualificationOLALFoundationComponent;
  let fixture: ComponentFixture<ViewDetailsEducationalQualificationOLALFoundationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailsEducationalQualificationOLALFoundationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsEducationalQualificationOLALFoundationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
