import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsWorkExperienceComponent } from './view-details-work-experience.component';

describe('ViewDetailsWorkExperienceComponent', () => {
  let component: ViewDetailsWorkExperienceComponent;
  let fixture: ComponentFixture<ViewDetailsWorkExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailsWorkExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsWorkExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
