import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinePostalcodeComponent } from './define-postalcode.component';

describe('DefinePostalcodeComponent', () => {
  let component: DefinePostalcodeComponent;
  let fixture: ComponentFixture<DefinePostalcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinePostalcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinePostalcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
