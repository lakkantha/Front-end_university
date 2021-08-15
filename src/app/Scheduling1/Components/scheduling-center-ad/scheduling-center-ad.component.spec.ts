import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingCenterAdComponent } from './scheduling-center-ad.component';

describe('SchedulingCenterAdComponent', () => {
  let component: SchedulingCenterAdComponent;
  let fixture: ComponentFixture<SchedulingCenterAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingCenterAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingCenterAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
