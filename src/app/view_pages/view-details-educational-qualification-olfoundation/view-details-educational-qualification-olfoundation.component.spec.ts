import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsEducationalQualificationOLFoundationComponent } from './view-details-educational-qualification-olfoundation.component';

describe('ViewDetailsEducationalQualificationOLFoundationComponent', () => {
  let component: ViewDetailsEducationalQualificationOLFoundationComponent;
  let fixture: ComponentFixture<ViewDetailsEducationalQualificationOLFoundationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailsEducationalQualificationOLFoundationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsEducationalQualificationOLFoundationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
