import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwDetailsPersonaldetails3Component } from './veiw-details-personaldetails3.component';

describe('VeiwDetailsPersonaldetails3Component', () => {
  let component: VeiwDetailsPersonaldetails3Component;
  let fixture: ComponentFixture<VeiwDetailsPersonaldetails3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiwDetailsPersonaldetails3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiwDetailsPersonaldetails3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
