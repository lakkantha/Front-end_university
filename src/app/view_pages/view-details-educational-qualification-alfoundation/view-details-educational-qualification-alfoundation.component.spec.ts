import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsEducationalQualificationALFoundationComponent } from './view-details-educational-qualification-alfoundation.component';

describe('ViewDetailsEducationalQualificationALFoundationComponent', () => {
  let component: ViewDetailsEducationalQualificationALFoundationComponent;
  let fixture: ComponentFixture<ViewDetailsEducationalQualificationALFoundationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailsEducationalQualificationALFoundationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsEducationalQualificationALFoundationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
