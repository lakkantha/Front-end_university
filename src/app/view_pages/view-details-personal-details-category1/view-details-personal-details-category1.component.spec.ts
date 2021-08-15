import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsPersonalDetailsCategory1Component } from './view-details-personal-details-category1.component';

describe('ViewDetailsPersonalDetailsCategory1Component', () => {
  let component: ViewDetailsPersonalDetailsCategory1Component;
  let fixture: ComponentFixture<ViewDetailsPersonalDetailsCategory1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailsPersonalDetailsCategory1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsPersonalDetailsCategory1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
