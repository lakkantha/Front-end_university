import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingCoordinatorComponent } from './scheduling-pc.component';

describe('SchedulingCoordinatorComponent', () => {
  let component: SchedulingCoordinatorComponent;
  let fixture: ComponentFixture<SchedulingCoordinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingCoordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
