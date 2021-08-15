import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReRegistrationInterfaceComponent } from './re-registration-interface.component';

describe('ReRegistrationInterfaceComponent', () => {
  let component: ReRegistrationInterfaceComponent;
  let fixture: ComponentFixture<ReRegistrationInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReRegistrationInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReRegistrationInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
