import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountBadgeBodyComponent } from './count-badge-body.component';

describe('CountBadgeBodyComponent', () => {
  let component: CountBadgeBodyComponent;
  let fixture: ComponentFixture<CountBadgeBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountBadgeBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountBadgeBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
