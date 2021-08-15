import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHomeBasedComponent } from './info-home-based.component';

describe('InfoHomeBasedComponent', () => {
  let component: InfoHomeBasedComponent;
  let fixture: ComponentFixture<InfoHomeBasedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoHomeBasedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoHomeBasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
