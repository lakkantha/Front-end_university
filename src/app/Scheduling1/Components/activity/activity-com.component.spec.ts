import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityComComponent } from './activity-com.component';

describe('ActivityComComponent', () => {
  let component: ActivityComComponent;
  let fixture: ComponentFixture<ActivityComComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityComComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
