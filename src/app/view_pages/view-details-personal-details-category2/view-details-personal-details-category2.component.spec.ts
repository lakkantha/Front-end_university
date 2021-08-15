import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsPersonalDetailsCategory2Component } from './view-details-personal-details-category2.component';

describe('ViewDetailsPersonalDetailsCategory2Component', () => {
  let component: ViewDetailsPersonalDetailsCategory2Component;
  let fixture: ComponentFixture<ViewDetailsPersonalDetailsCategory2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailsPersonalDetailsCategory2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsPersonalDetailsCategory2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
