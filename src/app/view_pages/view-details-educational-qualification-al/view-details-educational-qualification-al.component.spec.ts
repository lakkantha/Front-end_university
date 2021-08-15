import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsEducationalQualificationALComponent } from './view-details-educational-qualification-al.component';

describe('ViewDetailsEducationalQualificationALComponent', () => {
  let component: ViewDetailsEducationalQualificationALComponent;
  let fixture: ComponentFixture<ViewDetailsEducationalQualificationALComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailsEducationalQualificationALComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsEducationalQualificationALComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
