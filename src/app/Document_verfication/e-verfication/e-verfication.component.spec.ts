import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EVerficationComponent } from './e-verfication.component';

describe('EVerficationComponent', () => {
  let component: EVerficationComponent;
  let fixture: ComponentFixture<EVerficationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EVerficationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EVerficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
